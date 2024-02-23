import React, { useState, useEffect } from "react";
import ShowEmp from "./ShowEmp";
import axios from "axios";
import AddEmployee from "./AddEmployee";
import AddDepartment from "./AddDepartment";
import AddTask from "./AddTask";
import ShowAllTasks from "./ShowAllTasks";
import ShowDep from "./ShowDep";
import Skills from "./Skills";
import ShowAllSkills from "./ShowAllSkills";

function AdminHomPage() {
  const [contentToShow, setContentToShow] = useState(false);
  const [addEmp, setAddEmp] = useState(false);
  const [addDep, setAddDep] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showDep, setShowDep] = useState(false);
  const [addSkills, setAddSkills] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const handleButtonClick = (e) => {
    setContentToShow(false);
    setAddEmp(false);
    setAddDep(false);
    setAddTask(false);
    setShowTasks(false);
    setShowDep(false);
    setAddSkills(false);
    setShowSkills(false);



    if (e === "showEmp") setContentToShow(true);
    if (e === "addEmp") setAddEmp(true);
    if (e === "addDep") setAddDep(true);
    if (e === "addTask") setAddTask(true);
    if (e === "showTasks") setShowTasks(true);
    if (e === "showDep") setShowDep(true);
    if (e === "addSkills") setAddSkills(true);
    if (e === "showSkills") setShowSkills(true);
  };

  return (
    <div className="container flex h-screen bg-gray-200 justify-center text-center">

      {/* Left side */}
      <div className="border border-gray-300 p-4 m-4 bg-gray-100 rounded-md text-center w-96">
        <h1 className="text-xl font-bold mb-4 text-blue-500 
        ">Admin Home Page</h1>

        <div className="flex flex-col items-center justify-center">
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500
            "
            onClick={() => handleButtonClick("showEmp")}
          >
            Show Employees
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500"
            onClick={() => handleButtonClick("addEmp")}
          >
            Add Employee
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500"
            onClick={() => handleButtonClick("showDep")}
          >
            Show Departments
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500"
            onClick={() => handleButtonClick("addDep")}
          >
            Add Department
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500"
            onClick={() => handleButtonClick("showTasks")}
          >
            Show Tasks
          </button>
          <button 
            className="btn-left my-2 hover:bg-blue-200 text-blue-500"
            onClick={() => handleButtonClick("addSkills")}          
          >
            Add Skills
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500"
            onClick={() => handleButtonClick("addTask")}
          >
            Add Task
          </button>
          <button 
            className="btn-left my-2 hover:bg-blue-200 text-blue-500"
            onClick={() => handleButtonClick("showSkills")}
          >
            Show Skills
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="m-4 bg-gray-100 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
        {contentToShow && <ShowEmp />}
        {addEmp && <AddEmployee />}
        {addDep && <AddDepartment />}
        {showDep && <ShowDep />}
        {addTask && <AddTask />}
        {showTasks && <ShowAllTasks />}
        {addSkills && <Skills />}
        {showSkills && <ShowAllSkills />}
      </div>
    </div>
  );
}

export default AdminHomPage;
