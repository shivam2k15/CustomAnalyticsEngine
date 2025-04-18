const express = require("express");
const app = express();
const { rateLimiter } = require("./middlewares/rateLimiter");
const apiLogRouter = require("./routes/apiLog");
const analyticsRouter = require("./routes/analytics");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(express.json());
// rate limiter on each path api
app.use("/", rateLimiter);
app.use("/", apiLogRouter);
app.use("/analytics", analyticsRouter);
app.use("/", errorHandler);

module.exports=app;