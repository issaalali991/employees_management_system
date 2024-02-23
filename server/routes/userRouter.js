import { Router } from "express";
import { departmentRegister, employeeLogin, employeeRegister, employeeSkillRegister, skillRegister, taskRegister, taskStatus } from "../controllers/employeesController.js";
import { AuthDep } from "../middlewares/AuthDep.js";
import { AuthEmpRegister } from "../middlewares/AuthEmpRegister.js";
import { AuthSkill } from "../middlewares/AuthSkill.js";
import { AuthTask } from "../middlewares/AuthTask.js";
import { AuthEmpLogin } from "../middlewares/AuthLogin.js";
import { AuthskillsEmp } from "../middlewares/AuthSkillsEmp.js";
import { getDepartment, getEmployee, getEmployeeSkill, getEmployeeTask, getNameAndId, getSkill, getTask } from "../controllers/getControlles.js";

const userRouter = Router();

userRouter.route('/registerdep').post(AuthDep,departmentRegister);
userRouter.route('/registeremp').post(AuthEmpRegister,employeeRegister);
userRouter.route('/skill').post(AuthSkill,skillRegister);
// add skills to employee
userRouter.route('/skills').post(AuthskillsEmp,employeeSkillRegister);
// create task
userRouter.route('/task').post(AuthTask,taskRegister);
// login
userRouter.route('/login').post(AuthEmpLogin,employeeLogin)
// set status
userRouter.route('/setstatus').post(taskStatus);


// getEmployeeSkill
userRouter.route('/employeeskill').get(getEmployeeSkill);
userRouter.route('/allempployee').get(getEmployee);
userRouter.route('/emptask').post(getEmployeeTask);
userRouter.route('/allskill').get(getSkill);
userRouter.route('/alltasks').get(getTask);
userRouter.route('/nameemps').get(getNameAndId);
userRouter.route('/allDepartment').get(getDepartment);


export default userRouter;







 
// userRouter.route('/')
//   .get(getUsers);
// userRouter.route('/register').post(AuthUserRegister,userRegister);
// userRouter.route('/login').post(AuthUserLogin,userLogin);

