import pool from "../db/db.js";
import bcrypt from 'bcrypt';

export const AuthEmpLogin = (req, res,next) => {
    const {email,password} = req.body;
    pool.query('SELECT * FROM employees WHERE email = $1',[email],(error,results) => {
      if(error){
        
        throw error;
      }
      if(results.rows.length > 0){ 
        console.log(results.rows.length);
        
        const user = results.rows[0];
        if(bcrypt.compareSync(password,user.password)){
          // const token = jwt.sign({user_id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'});
        
          next();
         
        }else{
          res.status(401).json({message:'Invalid login credentials from 1 '});
        }
      }else{
        console.log(results.rows);
        res.status(401).json({message:'Invalid login credentials from 2'});
      }
    });
  }