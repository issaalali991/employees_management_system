import pool from "../db/db.js";

export const AuthskillsEmp = (req, res, next) => {

  const { emp_id, skill_id } = req.body;
  pool.query('SELECT * FROM skills WHERE emp_id = $1 AND skill_id = $2', [emp_id, skill_id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0) {
      res.status(400).json({ message: 'Employee skill already exists' });
    } else {
      next();
    }
  });
}