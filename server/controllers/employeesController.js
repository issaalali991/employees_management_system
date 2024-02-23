import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// ------------create Department----------------
export const departmentRegister = async (req, res) => {
  const { dep_name, description } = req.body;

  pool.query('INSERT INTO department (dep_name, description) VALUES ($1, $2)', [dep_name, description], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating department' });
    } else {
      res.status(201).json({ message: 'Department created successfully' });
    }
  });
};
//  -----------create Employee----------------
export const employeeRegister = async (req, res) => {
  const { full_name, age, email, password, dep_id, roll } = req.body;
  console.log(dep_id)
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10); 

    pool.query(
      'INSERT INTO employees (full_name, age, email, password, dep_id, roll) VALUES ($1, $2, $3, $4, $5, $6)',
      [full_name, age, email, hashedPassword, dep_id, roll || 'employee'],
    
      
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating user' });
        } else {
          res.status(201).json({ message: 'User created successfully' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error hashing password' });
  }
};


// -------------- create skill----------------
export const skillRegister = async (req, res) => {
  const { skill_name, description } = req.body;

  pool.query('INSERT INTO skill (skill_name, description) VALUES ($1, $2)', [skill_name, description], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating skill' });
    } else {
      res.status(200).json({ message: 'Skill created successfully' });
    }
  });
};


// ------------create skills for employee----------------


export const employeeSkillRegister = async (req, res) => {
  const { emp_id, skill_id } = req.body;

  pool.query('INSERT INTO skills (emp_id, skill_id) VALUES ($1, $2)', [emp_id, skill_id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating employee skill' });
    } else {
      res.status(200).json({ message: 'Employee skill created successfully' });
    }
  });
}

// ------------create Task----------------
export const taskRegister = async (req, res) => {
  const { emp_id,task_name, description,start_date,Execution_duration,  status } = req.body;

  pool.query('INSERT INTO tasks (emp_id,task_name, description,start_date,Execution_duration,  status) VALUES ($1, $2, $3, $4, $5, $6)', [emp_id,task_name, description,start_date  || new Date(),
    Execution_duration ,  status], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
    else {
      res.status(200).json({ message: 'Task created successfully' });
    }
  }
  );
};


//  ------------------- Login ------------
export const employeeLogin = (req, res) => {
    const {email,password} = req.body;
    pool.query('SELECT * FROM employees WHERE email = $1',[email],(error,results) => {
      if(error){
        throw error;
      }
      if(results.rows.length > 0){ 
        const user = results.rows[0];
        if(bcrypt.compareSync(password,user.password)){
          const token = jwt.sign({emp_id:user.emp_id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'});
          res.status(200).json({token,emp_id:user.emp_id,full_name:user.full_name});
        }else{
          res.status(401).json({message:'Invalid login credentials from Employee Login 1'});
        }
      }else{
        res.status(401).json({message:'Invalid login credentials from Employee Login 2'});
      }
    });
  }

  // ------------set task status----------------
export const taskStatus = async (req, res) => {
  const { task_id, status } = req.body;

  pool.query('UPDATE tasks SET status = $1 WHERE taskid = $2', [status, task_id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task status' });
    } else {
      res.status(200).json({ message: 'Task status updated successfully' });
    }
  });
};


	