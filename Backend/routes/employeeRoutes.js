const express = require("express");
const router = express.Router();

const controller = require("../controllers/employeeController");
const validateEmployee = require("../middleware/validateEmployee");
const validateId = require("../middleware/validateId");

// GET all employees
router.get("/", controller.getAllEmployees);

// GET single employee
router.get("/:id", validateId, controller.getEmployeeById);

// CREATE employee
router.post("/", validateEmployee, controller.createEmployee);

// UPDATE employee
router.put("/:id", validateId, validateEmployee, controller.updateEmployee);

// DELETE employee
router.delete("/:id", validateId, controller.deleteEmployee);

module.exports = router;
