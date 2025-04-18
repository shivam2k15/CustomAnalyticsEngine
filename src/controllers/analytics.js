const apiLog = require("../models/apiLog");
const {
  findMostAccessedEndpoint,
  getQueryPipeline,
} = require("../utils/analytics");
const ApiError = require("../utils/apiError");
const { messages } = require("../utils/constant");

const getUsageSummary = async (req, res, next) => {
  try {
    let requestQuery = getQueryPipeline(req.query);
    const logApi = await apiLog.aggregate([
      requestQuery,
      {
        $group: { _id: { endpoint: "$endpoint" }, totalRequests: { $sum: 1 } },
      },
      {
        $project: {
          _id: 0,
          endpoint: "$_id.endpoint",
          totalRequests: 1,
        },
      },
    ]);

    let summary = {
      totalRequestsPerEndpoints: logApi,
      mostAccessedEndpoint: findMostAccessedEndpoint(logApi),
    };
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

const getUsageDetailsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(new ApiError(messages.validuserId, 400));
    }
    const logs = await apiLog.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalRequests: { $sum: 1 },
          endpoints: { $addToSet: "$endpoint" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    res.send(logs);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsageSummary, getUsageDetailsForUser };
