const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Name is required");
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.push("Valid email is required");
  }

  if (
    !password ||
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 72
  ) {
    errors.push("Password must be 8 to 72 characters");
  }

  if (errors.length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password.length
  ) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  req.body.email = email.trim().toLowerCase();

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
