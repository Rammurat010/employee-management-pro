const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode ? err.message : "Internal Server Error",
  });
};

module.exports = errorMiddleware;
