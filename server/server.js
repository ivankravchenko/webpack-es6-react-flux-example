const express = require("express");
const http = require("http");
const app = express();
app.use(express.static(__dirname + "/../public"));

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log("Server is listening on port " + PORT)
});
