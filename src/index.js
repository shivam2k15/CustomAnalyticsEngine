const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const { connectToDatabase } = require("./db/config");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ping Pong");
});

connectToDatabase();
app.listen(port, () => {
  console.log("Server connected to the port: ", port);
});
