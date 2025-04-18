const router = require("express").Router();
const {
  getUsageSummary,
  getUsageDetailsForUser,
} = require("../controllers/analytics");

router.get("/summary", getUsageSummary);

router.get("/user/:userId", getUsageDetailsForUser);

module.exports = router;
