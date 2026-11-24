const express = require("express");
const cors = require("cors");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Management API Running",
  });
});

// Employee Routes
app.use("/api/employees", employeeRoutes);

// 404 Route
app.use((req, res, next) => {
  const error = new Error("API route not found");
  error.statusCode = 404;
  next(error);
});

// Centralized Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
