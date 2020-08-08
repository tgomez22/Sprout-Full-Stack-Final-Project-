require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const { Client } = require("pg");

var SERVPORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CONNECTION = process.env.CONNECTION_STRING;

const gClient = new OAuth2Client(CLIENT_ID);
const app = express();
const client = new Client({
  connectionString: CONNECTION,
});

app.use(express.static(path.join(__dirname, "../build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.post("/verify", function (req, res) {
  return verify(req.body.id_token)
    .then((userid) => {
      res.write(userid);
      res.end();
    })
    .catch(console.error);
});

app.post("/login", (req, res) => {
  client
    .query("SELECT * FROM users WHERE token_id = $1", [req.body.id_token])
    .then((res) => {
      if (res.rowCount === 0) {
        client
          .query("INSERT INTO users(token_id) VALUES ($1)", [req.body.id_token])
          .catch((err) => {
            console.error(err.stack);
          });
      }
    })
    .catch((err) => console.error(err.stack));
});

app.post("/fav", (req, res) => {
  client
    .query("SELECT * FROM plants WHERE name = $1", [req.body.scientificName])
    .then((res) => {
      if (res.rowCount === 0) {
        client
          .query("INSERT INTO plants(id, name) VALUES ($1, $2)", [
            req.body.id,
            req.body.scientificName,
          ])
          .catch((err) => console.err(err.stack));
      }
      client
        .query("SELECT id FROM plants WHERE plants.name = $1", [
          req.body.scientificName,
        ])
        .then((res) => {
          client
            .query("SELECT * FROM favList WHERE pid=$1 AND uid = $2", [
              res.rows[0].id,
              req.body.token_id,
            ])
            .then((results) => {
              if (results.rowCount === 0) {
                client
                  .query("INSERT INTO favList(uid, pid) VALUES ($1, $2)", [
                    req.body.token_id,
                    res.rows[0].id,
                  ])
                  .catch((err) => console.error(err.stack));
              }
            })
            .catch((err) => console.error(err.stack));
        })
        .catch((err) => console.error(err.stack));
    })
    .catch((err) => console.error(err.stack));
});

app.post("/unfav", (req, res) => {
  client
    .query("DELETE FROM favList WHERE uid = $1 AND pid = $2", [
      req.body.token_id,
      req.body.id,
    ])
    .catch((err) => console.error(err.stack));
});

app.post("/checkIfFaved", (req, res) => {
  client
    .query("SELECT * FROM favList WHERE uid = $1 AND pid = $2", [
      req.body.token_id,
      req.body.id,
    ])
    .then((results) => {
      res.write(JSON.stringify(results.rows));
      res.end();
    })
    .catch((err) => {
      console.log(err.stack);
    });
});

app.post("/getLoggedFavs", function (req, res) {
  client
    .query(
      "SELECT p.name FROM plants p, favList f WHERE f.uid = $1 AND f.pid = p.id",
      [req.body.id_token]
    )
    .then((results) => {
      if (results.rowCount !== 0) {
        res.write(
          JSON.stringify(
            results.rows.map((row) => {
              return row.name;
            })
          )
        );
      } else {
        res.write(JSON.stringify("null"));
      }
      res.end();
    })
    .catch((err) => console.log(err));
});

app.listen(SERVPORT, function (error) {
  if (error) throw error;
  console.log("Server is now running on port " + SERVPORT);
});

async function verify(token) {
  const ticket = await gClient.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return userid;
}
