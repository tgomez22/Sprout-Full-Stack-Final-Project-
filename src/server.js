const express = require("express");
const path = require("path");
const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (res, req) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, function (error) {
  if (error) throw error;
});
