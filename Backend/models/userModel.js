const db = require("../config/db");

// FIND USER BY EMAIL
const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
};

// CREATE USER
const createUser = async (data) => {
  const { name, email, password } = data;

  const [result] = await db.execute(
    `INSERT INTO users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
    [name, email, password, "employee"],
  );

  return result.insertId;
};

// FIND USER BY ID
const findUserById = async (id) => {
  const [rows] = await db.execute(
    `SELECT id, name, email, role, created_at
         FROM users WHERE id = ?`,
    [id],
  );

  return rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
