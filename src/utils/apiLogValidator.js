const isValidUUID = require("uuid").validate;
const { allowedMethods, messages } = require("./constant");

const validateApiLogPayload = (payload) => {
  const { endpoint, method, userId, timestamp } = payload;

  if (!endpoint || !method || !userId || !timestamp) {
    throw { message: messages.validInputs, status: 400 };
  }

  if (!allowedMethods.has(method.toLowerCase())) {
    throw { message: messages.validMethod, status: 400 };
  }

  if (!isValidUUID(userId)) {
    throw { message: messages.validUserId, status: 400 };
  }

  if (isNaN(new Date(timestamp).getTime())) {
    throw { message: messages.validTimestamp, status: 400 };
  }

  return { endpoint, method, userId, timestamp };
};

module.exports = { validateApiLogPayload };
