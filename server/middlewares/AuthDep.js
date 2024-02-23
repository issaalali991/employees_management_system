import pool from '../db/db.js';

 


export const AuthDep = (req, res,next) => {
  const {dep_name}=req.body;
  pool.query('SELECT * FROM department WHERE dep_name = $1',[dep_name],(error,results) => {
    if(error){
      throw error;
    }
    if(results.rows.length > 0){ 
      res.status(400).json({message:'Department already exists'});
    }else{
      next();
    }
  });
}

