import React,{ useState, useEffect } from 'react';
import axios from 'axios';

function ShowEmp() {
  const [data, setData] = useState([]);
  const VITE_APP_API_BASE_URL=import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${VITE_APP_API_BASE_URL}/employee/allempployee`)
      .then(res => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Department</th>
            {/* <th className="py-2 px-4">Skills</th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="py-2 px-4">{(index === 0 || item.full_name !== data[index - 1].full_name) ? item.full_name : ''}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.dep_name}</td>
                {/* <td className="py-2 px-4">{item.skill_name}</td> */}
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

export default ShowEmp;
