const mongoose = require("mongoose");
const { allowedMethods } = require("../utils/constant");

const archivedApiLogSchema = new mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: [...allowedMethods],
    },
    userId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamp: true }
);

const archivedApiLog = mongoose.model("archivedApiLog", archivedApiLogSchema);
module.exports = archivedApiLog;
