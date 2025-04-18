const allowedMethods = new Set(["get", "post", "put", "delete", "patch"]);

const messages = {
  validInputs: "All api details are required.",
  validMethod: "Provide valid method type.",
  validUserId: "Provide valid userId.",
  validTimestamp: "Provide valid timestamp formated as MM/DD/YYYY or YYYY/MM/DD.",
};

module.exports = { allowedMethods, messages };
