import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// -----------get all Department----------------
export const getDepartment = async (req, res) => {
  pool.query('SELECT * FROM department', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting department' });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
// --------------getall Employee----------------
//  INNER JOIN skills ON employees.emp_id = skills.emp_id INNER JOIN skill ON skills.skill_id = skill.skill_id
export const getEmployee  = async (req, res) => {
  pool.query('SELECT full_name , email, dep_name FROM employees INNER JOIN department ON employees.dep_id = department.dep_id', (error, results) => {
 
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting employees' });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
// --------------get all Skill----------------
export const getSkill = async (req, res) => {
  pool.query('SELECT * FROM skill', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting skill' });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
// --------------get all Task----------------
export const getTask = async (req, res) => {
  pool.query('SELECT taskid , task_name, description, execution_duration, status ,full_name FROM tasks INNER JOIN employees ON tasks.emp_id = employees.emp_id', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting task' });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
// --------------get all Employee Skill----------------
export const getEmployeeSkill = async (req, res) => {
  // const { emp_id } = req.body;

  pool.query('SELECT skill_name,full_name ,description FROM skills INNER JOIN employees ON skills.emp_id = employees.emp_id INNER JOIN skill ON skills.skill_id = skill.skill_id ', (error, results) => {
 
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting employee skill' });
    } else {
      res.status(200).json(results.rows);
    }
  });
}
// --------------get all Employee Task----------------
export const getEmployeeTask = async (req, res) => {
  const { emp_id } = req.body;

  pool.query('SELECT * FROM tasks WHERE emp_id = $1', [emp_id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting employee task' });
    } else {
      res.status(200).json(results.rows);
    }
  });
}
// -----------get full_name and emp_id----------------
export const getNameAndId = async (req, res) => {


  pool.query('SELECT emp_id, full_name FROM employees ', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting name and id' });
    } else {
      res.status(200).json(results.rows);
    }
  });
}
   






