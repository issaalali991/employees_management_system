import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../context/AuthProvider';
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { setIsLoggedIn, checkUser } = useAuth();
  const [setIsLoggedIn, checkUser] = useState(false);
  const [_, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const VITE_APP_API_BASE_URL =
    "https://employees-management-system.onrender.com";
  console.log(VITE_APP_API_BASE_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${VITE_APP_API_BASE_URL}/employee/login`, {
        email: email,
        password: password,
      });
      setCookie("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.emp_id);
      window.localStorage.setItem("user", res.data.full_name);
      res.data.emp_id === 1
        ? (window.location.href = "/admin")
        : (window.location.href = "/employee");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        alert(error.response.data.message);
      } else if (error.request) {
        console.error("No response received from the server.");
        alert("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert("Error setting up the request.");
      }
    }
  };

  return (
    <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="block mb-2">Email:</p>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Password:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import { useState } from "react";
// import { useCookies } from "react-cookie"
// import Form from "./Form";
// import {getUser} from "../usersLogic";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");
//   const navigate = useNavigate();

//   const [_,setCookie] = useCookies(['access_token']);
//   const onSubmit = async (e) => {
//     e.preventDefault();
// getUser( user,pass,setCookie);
//     // navigate("/admin");

//   };

//   return (
//     <>
//       <Form
//         title="Login"
//         user={user}
//         pass={pass}
//         setUsername={setUser}
//         setPassword={setPass}
//         onSubmit={onSubmit}
//       />
//     </>
//   );
// }

// export default Login;
