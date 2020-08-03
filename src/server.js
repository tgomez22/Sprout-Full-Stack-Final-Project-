const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const SECRET_ID = process.env.REACT_APP_GOOGLE_SECRET_ID;
const client = new OAuth2Client(CLIENT_ID);
const app = express();
var PORT = process.env.PORT || 3000;

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
      console.log(userid);
      res.write(userid);
      res.end();
    })
    .catch(console.error);
});

app.post("/getLoggedFavs", function (req, res) {
  console.log("Hello!! Res: " + res);
  console.log("Goodbye! Favs: " + favs);
  res.write(JSON.stringify(favs));
  res.end();
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server is now running on port " + PORT);
});

async function verify(token) {
  console.log(token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return userid;
}
