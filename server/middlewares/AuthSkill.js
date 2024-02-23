import pool from '../db/db.js';

export const AuthSkill = (req, res,next) => {
  const {skill_name}=req.body;
  pool.query('SELECT * FROM skill WHERE skill_name = $1',[skill_name],(error,results) => {
    if(error){
      throw error;
    }
    if(results.rows.length > 0){ 
      res.status(400).json({message:'Skill already exists'});
    }else{
      next();
    }
  });
}