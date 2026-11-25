const express = require("express");
const router = express.Router();

const controller = require("../controllers/employeeController");

const { authenticate, authorize } = require("../middleware/authMiddleware");

const validateEmployee = require("../middleware/validateEmployee");
const validateId = require("../middleware/validateId");

// All employee APIs require login
router.use(authenticate);

// GET all employees
router.get("/", controller.getAllEmployees);

// GET single employee
router.get("/:id", validateId, controller.getEmployeeById);

// CREATE employee
router.post("/", validateEmployee, controller.createEmployee);

// UPDATE employee
router.put("/:id", validateId, validateEmployee, controller.updateEmployee);

// DELETE employee - ADMIN ONLY
router.delete(
  "/:id",
  authorize("admin"),
  validateId,
  controller.deleteEmployee,
);

module.exports = router;
