const mongoose = require("mongoose");
const { allowedMethods } = require("../utils/constant");

const apiLogSchema = new mongoose.Schema(
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

// TTL index: remove logs after 30 days (30 * 24 * 60 * 60 = 2592000 seconds)
apiLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

const apiLog = mongoose.model("apiLog", apiLogSchema);
module.exports = apiLog;
