import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";
import React from 'react';

function Skills() {
  const [sending, setSending] = useState(false);
  const [name, setName] = useState([]);
  const [data, setData] = useState({
    skill_name: "",
    description: "",
  });
  const navigate = useNavigate();
  const VITE_APP_API_BASE_URL =
    "https://employees-management-system.onrender.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        `${VITE_APP_API_BASE_URL}/employee/skill`,
        data
      );
      if (response.status === 200) {
        setData({
          skill_name: "",
          description: "",
        });
        setSending(false);
        navigate("/admin");
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
        <h2 className="text-2xl font-semibold mb-4">Add Skill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="block mb-2">Skill Name:</p>
            <input
              type="text"
              name="skill_name"
              value={data.skill_name}
              onChange={handleInputChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Description:</p>
            <input
              type="text-area"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              className="border rounded w-full p-2 h-40"
            />
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

export default Skills;
