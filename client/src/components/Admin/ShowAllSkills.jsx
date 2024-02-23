import React,{ useState, useEffect } from 'react';
import axios from 'axios';
function ShowAllSkills() {
  const [data, setData] = useState([]);
  const VITE_APP_API_BASE_URL=import.meta.env.VITE_APP_API_BASE_URL;
  useEffect(() => {
    axios.get(`${VITE_APP_API_BASE_URL}/employeeskill`)
      .then(res => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Skills</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4">Skill Name</th>
            <th className="py-2 px-4">Employee Name</th>
            <th className="py-2 px-4">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.sort((a, b) => a.skill_name.localeCompare(b.skill_name)).map((item, index) => (

         
            <React.Fragment key={index}>
              <tr>
                <td className="py-2 px-4">{(index === 0 || item.skill_name !== data[index - 1].skill_name) ? item.skill_name : ''}</td>
                <td className="py-2 px-4">{item.full_name}</td>
                <td className="py-2 px-4">{
                  (index === 0 || item.skill_name !== data[index - 1].skill_name) ? item.description : (
                    item.skill_name === data[index - 1].skill_name ? '' : item.description)
                }</td>
                 
              </tr>
              {index < data.length - 1 && (
                <tr>
                  <td colSpan="3" className="border-b border-gray-200"></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      
      </table>
    </div>
  );

}

export default ShowAllSkills
