const findMostAccessedEndpoint = (logs) => {
  if (logs && logs.length > 0) {
    let { endpoint } = logs.reduce((most, current) =>
      current.totalRequests > most.totalRequests ? current : most
    );
    return endpoint;
  }
  return "";
};

const getQueryPipeline = (queries) => {
  const { startDate, endDate, endpoint, user } = queries;
  let queryObj = {};
  if (startDate) {
    queryObj = { timestamp: { $gte: new Date(startDate) } };
  } else if (endDate) {
    queryObj = { timestamp: { $lte: new Date(endDate) } };
  } else if (startDate && endDate) {
    queryObj = {
      timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
  }

  if (endpoint) {
    queryObj = { ...queryObj, endpoint };
  }
  if (user) {
    queryObj = { ...queryObj, userId: user };
  }
  return {
    $match: queryObj,
  };
};

module.exports = { findMostAccessedEndpoint, getQueryPipeline };
