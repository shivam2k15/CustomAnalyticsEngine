const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each user/IP to 100 requests/min
  message: "Too many requests, please slow down.",
  keyGenerator: (req) => req.headers["x-user-id"] || req.ip,
});

module.exports = { rateLimiter };
