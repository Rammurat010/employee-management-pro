const validateEmployee = (req, res, next) => {
  const {
    name,
    email,
    phone,
    department,
    designation,
    salary,
    joining_date,
    status,
  } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Valid name is required");
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.push("Valid email is required");
  }

  if (
    phone != null &&
    (typeof phone !== "string" || !/^[0-9+\- ]{7,15}$/.test(phone))
  ) {
    errors.push("Invalid phone number");
  }

  if (!department || typeof department !== "string" || !department.trim()) {
    errors.push("Department is required");
  }

  if (!designation || typeof designation !== "string" || !designation.trim()) {
    errors.push("Designation is required");
  }

  if (
    salary == null ||
    salary === "" ||
    !Number.isFinite(Number(salary)) ||
    Number(salary) < 0
  ) {
    errors.push("Valid non-negative salary is required");
  }

  if (
    !joining_date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(joining_date) ||
    !Number.isFinite(Date.parse(joining_date + "T00:00:00Z")) ||
    new Date(joining_date + "T00:00:00Z").toISOString().slice(0, 10) !==
      joining_date
  ) {
    errors.push("Valid joining_date (YYYY-MM-DD) is required");
  }

  if (status && !["Active", "Inactive"].includes(status)) {
    errors.push("Status must be Active or Inactive");
  }

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = validateEmployee;
