import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";
import React from 'react';

function AddTask() {
  const [sending, setSending] = useState(false);
  const [name, setName] = useState([]);
  const [data, setData] = useState({
    task_name: "",
    description: "",
    Execution_duration: "",
    status: "pending",
    emp_id: "",
  });
  const navigate = useNavigate();
  const VITE_APP_API_BASE_URL =
    "https://employees-management-system.onrender.com";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${VITE_APP_API_BASE_URL}/employee/nameemps`
        );
        setName(response.data);
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
        `${VITE_APP_API_BASE_URL}/employee/task`,
        data
      );
      if (response.status === 200) {
        setData({
          task_name: "",
          description: "",
          Execution_duration: "",
          status: "pending",
          emp_id: "",
        });
        setSending(false);
        navigate("/admin");
      }
    } catch (error) {
      setSending(false);
      toast.error("error1" + error.response.data.message);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
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
        <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="block mb-2">Task Name:</p>
            <input
              type="text"
              name="task_name"
              value={data.task_name}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Description:</p>
            <input
              type="text-area"
              name="description"
              value={data.description}
              onChange={handleChange}
              className="border rounded w-full p-2 h-40"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Execution Duration:</p>
            <input
              type="text"
              name="Execution_duration"
              value={data.Execution_duration}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Status:</p>
            <select
              name="status"
              value={data.status}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="block mb-2">Employee Name:</p>
            <select
              name="emp_id"
              value={data.emp_id}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value="">Select Employee</option>
              {name &&
                name.map((item) => (
                  <option key={item.emp_id} value={item.emp_id}>
                    {item.full_name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
