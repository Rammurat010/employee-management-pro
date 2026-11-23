const db = require("../config/db");

// GET ALL EMPLOYEES
const getAllEmployees = async () => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM employees ORDER BY id DESC");
  return rows;
};

// GET SINGLE EMPLOYEE
const getEmployeeById = async (id) => {
  const [rows] = await db
    .promise()
    .execute("SELECT * FROM employees WHERE id = ?", [id]);
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

  const [result] = await db.promise().execute(
    `INSERT INTO employees
        (name, email, phone, department, designation,
        salary, joining_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      phone || null,
      department || null,
      designation || null,
      salary ?? null,
      joining_date || null,
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

  const [result] = await db.promise().execute(
    `UPDATE employees SET
        name = ?, email = ?, phone = ?,
        department = ?, designation = ?,
        salary = ?, joining_date = ?, status = ?
        WHERE id = ?`,
    [
      name,
      email,
      phone || null,
      department || null,
      designation || null,
      salary ?? null,
      joining_date || null,
      status || "Active",
      id,
    ],
  );

  return result.affectedRows;
};

// DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  const [result] = await db
    .promise()
    .execute("DELETE FROM employees WHERE id = ?", [id]);

  return result.affectedRows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
