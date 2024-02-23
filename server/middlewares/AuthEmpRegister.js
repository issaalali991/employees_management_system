import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 


export const AuthEmpRegister = (req, res,next) => {
  const {email,password} = req.body;
  pool.query('SELECT * FROM employees WHERE email = $1',[email],(error,results) => {
    if(error){
      throw error;
    }
    if(results.rows.length > 0){ 
      res.status(400).json({message:'User already exists'});
    }else{
      next();
    }
  });
}















// 

// export const AdminAuth = (req, res,next) => {
//   const token = req.headers['x-access-token'];
//   if(!token){
//     return res.status(403).json({message:'No token provided'});
//   }
//   jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
//     if(err){
//       return res.status(401).json({message:'Unauthorized'});
//     }
//     req.user = decoded;
//     next();
//   });
// }

