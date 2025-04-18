const { CronJob } = require("cron");
const { connectToDatabase } = require("../db/config");
const apiLog = require("../models/apiLog");
const archivedApiLogs = require("../models/archivedApiLogs");
connectToDatabase();
// from current to -30 days before
let currentDate = new Date(),
  preDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

const archiveOldLogs = async () => {
  try {
    const logApiCursor = apiLog.find({ timestamp: { $lte: preDate } }).cursor();
    console.log(logApiCursor);

    let batch = [];
    for await (const log of logApiCursor) {
      batch.push(log.toObject());

      if (batch.length > 500) {
        await archivedApiLogs.insertMany(batch);
        await apiLog.deleteMany({
          _id: { $in: batch.map((batchLog) => batchLog._id) },
        });
        batch = [];
      }
    }

    //if any logs are remaining
    if (batch.length > 0) {
      await archivedApiLogs.insertMany(batch);
      await apiLog.deleteMany({
        _id: { $in: batch.map((batchLog) => batchLog._id) },
      });
    }

    console.log(
      "Log archiving completed successfully on Current-date",
      currentDate,
      "for Pre-date ",
      preDate
    );
  } catch (error) {
    console.error("Something went wrong in worker cron.", error);
  }
};

// Schedule the worker to run daily at 2 AM
const job = new CronJob(
  "0 2 * * * *", // cronTime
  archiveOldLogs, // onTick
  null, // onComplete
  true, // start
  "Asia/Kolkata" // timeZone
);
module.exports = job;
