import React,{ useState, useEffect } from 'react';
import axios from 'axios';

function ShowAllTasks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/employee/alltasks')
      .then(res => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4">Task name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Deadline</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Employee</th>
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
                <td className="py-2 px-4">{item.full_name}</td>
              </tr>
              {index < data.length - 1 && (
                <tr>
                  <td colSpan="5" className="border-b border-gray-200"></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowAllTasks;
