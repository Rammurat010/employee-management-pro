const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/authController");

const { authenticate } = require("../middleware/authMiddleware");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/validateAuth");

// Public APIs
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Protected API
router.get("/me", authenticate, getMe);

module.exports = router;
