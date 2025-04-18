const router = require("express").Router();
const { logApiRequest } = require("../controllers/apiLog");

router.post("/logs", logApiRequest);

module.exports = router;
