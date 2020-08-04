const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const { Pool } = require("pg");

var PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const SECRET_ID = process.env.REACT_APP_GOOGLE_SECRET_ID;

const client = new OAuth2Client(CLIENT_ID);
const app = express();
const pool = new Pool();

const favs = [
  "Clinopodium vulgare",
  "Clinopodium acinos",
  "Ocimum gratissimum",
  "Ocimum americanum",
  "Ocimum basilicum",
  "Ocimum campechianum",
  "Ocimum tenuiflorum",
  "Clinopodium alpinum",
];

app.use(express.static(path.join(__dirname, "../build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (res, req) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.post("/verify", function (req, res) {
  return verify(req.body.id_token)
    .then((userid) => {
      // console.log(userid);
      res.write(userid);
      res.end();
    })
    .catch(console.error);
});

app.post("/login", (req, res, next) => {
  pool.query(
    "SELECT * FROM users WHERE token_id = $1",
    [req.params.token_id],
    (err, res) => {
      if (err) {
        pool.query(
          "INSERT INTO users VALUES ($1)",
          [req.params.token_id],
          (err, res) => {
            if (err) {
              return next(err);
            }
          }
        );
      }
    }
  );
});

app.post("/fav", (req, res, next) => {
  pool.query(
    "SELECT * FROM plants WHERE name = $1",
    [req.params.scientificName],
    (err, res) => {
      if (err) {
        pool.query(
          "INSERT INTO plants VALUES ($1)",
          [req.params.scientificName],
          (err, res) => {
            if (err) {
              console.log(err.stack);
            }
          }
        );
      }
      pool.query(
        "INSERT INTO favList VALUES ((SELECT id FROM users WHERE users.token_id = $1), (SELECT id FROM plants WHERE plants.name = $2)",
        [req.params.token_id, req.params.scientificName],
        (err, res) => {
          if (err) {
            console.log(err.stack);
          }
        }
      );
    }
  );
});

app.post("/unfav", (req, res, next) => {
  pool.query(
    "DELETE FROM favList f WHERE f.uid = (SELECT id FROM users WHERE user.token_id = $1) AND f.pid = (SELECT id FROM plants WHERE plant.name = $2)",
    [req.params.token_id, req.params.scientificName],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      }
    }
  );
});

app.post("/getLoggedFavs", function (req, res, next) {
  // console.log("Hello!! Res: " + res);
  // console.log("Goodbye! Favs: " + favs);
  const loggedFavs = [];
  pool.query(
    "SELECT p.name FROM users u, plants p, favList f WHERE u.token_id = $1 AND u.id = f.uid AND f.pid = p.id",
    [req.params.token_id],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      }
    }
  );

  console.log(result.rows);

  res.write(JSON.stringify(loggedFavs));
  res.end();
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server is now running on port " + PORT);
});

async function verify(token) {
  // console.log(token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return userid;
}
