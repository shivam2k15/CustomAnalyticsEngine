const apiLog = require("../models/apiLog");
const ApiError = require("../utils/apiError");
const { validateApiLogPayload } = require("../utils/apiLogValidator");

const logApiRequest = async (req, res, next) => {
  try {
    let validatedPayload = validateApiLogPayload(req.body);

    const logApi = await apiLog.create(validatedPayload);

    res.status(201).json(logApi);
  } catch (error) {
    return next(
      new ApiError(error.message || "Something went wrong", error.status || 500)
    );
  }
};

module.exports = { logApiRequest };
