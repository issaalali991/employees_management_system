import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";

function AddEmployee() {
  const [sending, setSending] = useState(false);
  const [department, setDepartment] = useState([{}]);
  const [data, setData] = useState({
    full_name: "",
    age: "",
    email: "",
    password: "",
    department: "",
    dep_id: "",
  });
  const [skills, setSkills] = useState([{}]);

  const [addSkills, setAddSkills] = useState({
    skill_id: "",
    emp_id: "",
  });

  const navigate = useNavigate();
  const VITE_APP_API_BASE_URL=import.meta.env.VITE_APP_API_BASE_URL;
  // ----get all Skill----
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/employee/allskill");
  //       if (response.status === 200) {
  //         setSkills(response.data);
  //       }
  //     } catch (error) {
  //       toast.error("error1" + error.response.data.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // ----get all Department----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${VITE_APP_API_BASE_URL}/employee/allDepartment`
        );
        if (response.status === 200) {
          setDepartment(response.data);
        }
      } catch (error) {
        toast.error("error2" + error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/employee/registeremp`,
        data
      );
      if (response.status === 201) {
        setData({
          full_name: "",
          age: "",
          email: "",
          password: "",
          department: "",
          dep_id: "",
        });
        setSending(false);
        // navigate('/');
      }
    } catch (error) {
      setSending(false);
      toast.error(error.response.data.error);
    }
    // try {
    //   const response = await axios.post(
    //     "http://localhost:4000/employee/skills",
    //     addSkills
    //   );
    //   if (response.status === 200) {
    //     addSkills({
    //       skill_id: "",
    //       emp_id: "",
    //     });
    //     setSending(false);
    //     navigate("/admin");
    //   }
    // } catch (error) {
    //   setSending(false);
    //   toast.error("error1" + error.response.data.message);
    // }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // const handleInputChange = (e) => {
  //   setAddSkills({ ...addSkills, [e.target.name]: e.target.value });
  //   console.log(addSkills);
  // };

  if (sending) {
    return (
      <div className="">
        <SpinnerDotted
          size={50}
          thickness={100}
          speed={100}
          color="rgba(57, 107, 172, 1)"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md mt-20 rounded-xl shadow-xl shadow-gray-500">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="block mb-2">Full Name:</p>
            <input
              type="text"
              name="full_name"
              value={data.full_name}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Email:</p>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Password:</p>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Age:</p>
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Department:</p>
            <select
              name="department"
              value={data.department}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value="">Select Department</option>
              {department.map((dep) => (
                <option key={dep.dep_id} value={(data.dep_id = dep.dep_id)}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
            {/* Add Skills to Employee  as Checkbox*/}
            {/* <div className="mb-4">
              <p className="block mb-2">Skills:</p>
              {skills.map((skill) => (
  <div key={skill.skill_id}>
    <input
      type="checkbox"
      name="skill_id"
      value={skill.skill_id}
      onChange={(e) =>
        setAddSkills((prevSkills) => ({
          ...prevSkills,
          [skill.skill_id]: e.target.checked ? skill.skill_id : undefined,
          emp_id: 1,  
          
        }))
        
      }
      
    />
    {skill.skill_name}
  </div>
))}

            </div> */}

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 mt-4"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddEmployee;
