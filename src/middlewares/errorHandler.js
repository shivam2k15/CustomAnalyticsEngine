const errorHandler = (err, req, res, next) => {
  if (err) {
    console.error(err);
    return res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
  next();
};

module.exports = { errorHandler };
