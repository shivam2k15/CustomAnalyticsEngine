const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();
const port = process.env.PORT || 3000;
const { connectToDatabase } = require("./db/config");
connectToDatabase();

// we can run this in seperatly on pm2 in production as we want
require("./workers/archiveWorker");

app.listen(port, () => {
  console.log("Server connected to the port: ", port);
});
