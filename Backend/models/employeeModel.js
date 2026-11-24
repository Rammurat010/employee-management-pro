const db = require("../config/db");

// GET ALL EMPLOYEES WITH SEARCH, FILTER AND PAGINATION
const getAllEmployees = async (filters) => {
  const { page, limit, search, department, status } = filters;

  const offset = (page - 1) * limit;

  let where = [];
  let values = [];

  if (search) {
    where.push("(name LIKE ? OR email LIKE ?)");
    values.push(`%${search}%`, `%${search}%`);
  }

  if (department) {
    where.push("department = ?");
    values.push(department);
  }

  if (status) {
    where.push("status = ?");
    values.push(status);
  }

  const condition = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const [employees] = await db.execute(
    `SELECT * FROM employees
         ${condition}
         ORDER BY id DESC
         LIMIT ? OFFSET ?`,
    [...values, limit, offset],
  );

  const [count] = await db.execute(
    `SELECT COUNT(*) AS total
         FROM employees ${condition}`,
    values,
  );

  return {
    employees,
    total: count[0].total,
  };
};

// GET SINGLE EMPLOYEE
const getEmployeeById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM employees WHERE id = ?", [id]);

  return rows[0];
};

// CREATE EMPLOYEE
const createEmployee = async (data) => {
  const {
    name,
    email,
    phone,
    department,
    designation,
    salary,
    joining_date,
    status,
  } = data;

  const [result] = await db.execute(
    `INSERT INTO employees
        (name, email, phone, department, designation,
         salary, joining_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      phone || null,
      department,
      designation,
      salary,
      joining_date,
      status || "Active",
    ],
  );

  return result.insertId;
};

// UPDATE EMPLOYEE
const updateEmployee = async (id, data) => {
  const {
    name,
    email,
    phone,
    department,
    designation,
    salary,
    joining_date,
    status,
  } = data;

  const [result] = await db.execute(
    `UPDATE employees SET
         name = ?, email = ?, phone = ?,
         department = ?, designation = ?,
         salary = ?, joining_date = ?, status = ?
         WHERE id = ?`,
    [
      name,
      email,
      phone || null,
      department,
      designation,
      salary,
      joining_date,
      status,
      id,
    ],
  );

  return result.affectedRows;
};

// DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  const [result] = await db.execute("DELETE FROM employees WHERE id = ?", [id]);

  return result.affectedRows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
