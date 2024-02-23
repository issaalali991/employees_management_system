import React, { useState } from 'react';
import EmpTasks from './EmpTasks';
import AddSkillsToEmp from './AddSkillsToEmp';


function EmployeePage() {
  const [contentToShow, setContentToShow] = useState(false);
  const [addSkills, setAddSkills] = useState(false);

  const handleButtonClick = (e) => {
    if (e === "showtasks") {
      setContentToShow(true);
      setAddSkills
    }
    if (e === "addskills") {
      setAddSkills(true);
      setContentToShow(false);
    }
  };

  return (
    <div className="container flex h-screen bg-gray-200 justify-center text-center">

      {/* Left side */}
      <div className="border border-gray-300 p-4 m-4 bg-gray-100 rounded-md text-center w-96">
        <h1 className="text-xl font-bold mb-4 text-blue-600
        ">Employee Page</h1>

        <div className="flex flex-col items-center justify-center">
          <button
            className="btn-blue my-2 hover:bg-blue-700 text-blue-500"
            onClick={() => handleButtonClick('showtasks')}
          >
            Show Tasks
          </button>
          <button
            className="btn-blue my-2 hover:bg-blue-700 text-blue-500"
            onClick={() => handleButtonClick('addskills')}
          >
            Add Skills
          </button>
        </div>

      </div>

      {/* Right side */}
      <div className="m-4 bg-gray-100 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
        {contentToShow && <EmpTasks />}
        {addSkills && <AddSkillsToEmp />}
      </div>
    </div>
  );
}

export default EmployeePage;
