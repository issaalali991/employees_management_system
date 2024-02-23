import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";
function AddSkillsToEmp() {
  const [sending, setSending] = useState(false);
  const [name, setName] = useState([]);
  const [allskills, setAllSkills] = useState([]);
  const empid = localStorage.getItem("userID");
  const [data, setData] = useState({
    emp_id: empid,
    skill_id: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/employee/allskill"
        );
        setAllSkills(response.data);
      } catch (error) {
        toast.error("error2" + error.response.data.message);
      }
    }
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/employee/skills",
        data
      );
      if (response.status === 200) {
        setData({
          emp_id: empid,
          skill_id: "",
        });
        setSending(false);
        navigate("/employee");
      }
    } catch (error) {
      setSending(false);
      toast.error("error1" + error.response.data.message);
    }
  };
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  if (sending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerDotted size="100" color="#3b82f6" />
      </div>
    );
  }
  return (
    <div className="container mx-auto max-w-md mt-20 rounded-xl shadow-xl shadow-gray-500">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Add Skills to Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="block mb-2">Skill Name:</p>
            <select
              name="skill_id"
              value={data.skill_id}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            >
              <option value="">Select Skill</option>
              {allskills &&
                allskills.map((item) => (
                  <option key={item.skill_id} value={item.skill_id}>
                    {item.skill_name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4"
          >
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSkillsToEmp;
