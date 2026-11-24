const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  req.params.id = id;
  next();
};

module.exports = validateId;
