import axios from 'axios';
import React,{ useState, useEffect } from 'react';


function EmpTasks() {
  const [data, setData] = useState([]);
  const emp_id = localStorage.getItem('userID');
  const [statustoggle, setStatustoggle] = useState(false);
  const handleSetStatus = (task_id, status) => () => {
    status = status === 'pending' ? 'completed' : 'pending';
    console.log(status, task_id, 'status')  
    axios.post('http://localhost:4000/employee/setstatus', { task_id, status  })

      .then(res => {
        console.log(res.data);
        setStatustoggle(!statustoggle);
      });
  }



  useEffect(() => {
    axios.post('http://localhost:4000/employee/emptask', { emp_id })
      .then(res => {
        setData(res.data);
      });
  }, [statustoggle]);

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4">Task</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Deadline</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Set Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="py-2 px-4">{(index === 0 || item.task_name !== data[index - 1].task_name) ? item.task_name : ''}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">{item.execution_duration}</td>
                <td className="py-2 px-4">
                  {item.status != 'pending' ? (
                    <span className="text-green-500">{item.status}</span>
                  ) : (
                    <span className="text-red-500">{item.status}</span>
                  )}
                 </td>
                <td className="py-2 px-4">
                  <button
                    className="btn-blue"
                    onClick={handleSetStatus(item.taskid, item.status)}
                  >
                    {item.status === 'pending' ? (<span className='text-white bg-green-500 px-2 py-1 rounded-md hover:bg-green-700 hover:text-white cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105'
                    >Mark as Completed </span>) : (<span className='text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-700 hover:text-white cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105'
                    > Mark as Pending</span> )}
                  </button>
                </td>
              </tr>
              {index < data.length - 1 && (
                <tr>
                  <td colSpan="4" className="border-b border-gray-200"></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmpTasks;
