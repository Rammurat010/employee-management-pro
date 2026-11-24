const Employee = require("../models/employeeModel");

// GET ALL EMPLOYEES
const getAllEmployees = async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const search = String(req.query.search ?? "").trim();
    const department = String(req.query.department ?? "").trim();
    const status = String(req.query.status ?? "").trim();

    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be positive and limit must be between 1 and 100",
      });
    }

    if (
      search.length > 100 ||
      department.length > 100 ||
      !["", "Active", "Inactive"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid search or filter values",
      });
    }

    const result = await Employee.getAllEmployees({
      page,
      limit,
      search,
      department,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: result.employees,
      pagination: {
        totalRecords: result.total,
        currentPage: page,
        totalPages: Math.ceil(result.total / limit),
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE EMPLOYEE
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE EMPLOYEE
const createEmployee = async (req, res, next) => {
  try {
    const id = await Employee.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await Employee.updateEmployee(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res, next) => {
  try {
    const result = await Employee.deleteEmployee(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
