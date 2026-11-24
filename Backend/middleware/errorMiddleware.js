const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  // Duplicate email
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  // Database errors and other server errors
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode ? err.message : "Internal Server Error",
  });
};

module.exports = errorMiddleware;
