
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { Cookies, useCookies } from "react-cookie";
import StartPage from "./components/StartPage";
import React from 'react';


import { Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminHomPage from "./components/Admin/AdminHomPage";
import EmployeePage from "./components/Employee/EmployeePage";

function App() {
  const[cookies, setCookie, removeCookie] = useCookies(['access_token']);
  return (
    <>
    <Navbar login={cookies.access_token ? true : false}
    />
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-500 ">
        
        {
          localStorage.getItem('user')? (' Welcome, ' + localStorage.getItem('user') + '!') :'Hello world!'
        }
       
      </h1>
       
      <br />
    
      {
        // cookies.access_token ? 
        // <button 
        //   className="bg-red-500 text-white rounded-md px-2 py-1 mt-3
        //   hover:bg-red-600 transition ml-12"
        //   onClick={() => {removeCookie('access_token')
        //   window.localStorage.removeItem('userID')
        //   window.localStorage.removeItem('user')
        //   window.location.reload()
        // }}
        // >
        //   Logout
        // </button>
        // : 
        (      
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminHomPage/>} />
            <Route path="/employee" element={<EmployeePage/>} />
          </Routes>         
         
        )
      }
     
    </>
  );
}

export default App;
