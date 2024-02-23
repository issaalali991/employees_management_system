

export const AuthTask = async (req, res, next) => {
  const { emp_id, task_name, description, start_date, Execution_duration, status } = req.body;
  if (emp_id && task_name && description  && Execution_duration ) {
    next();
  } else {
    res.status(401).json({ message: 'Please fill all fields' });
  }
}
