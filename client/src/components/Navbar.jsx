import { useCookies } from 'react-cookie';
import {NavLink} from 'react-router-dom';
import React from 'react';

function Navbar(login) {
  const[cookies, setCookie, removeCookie] = useCookies(['access_token']);
  return (
    <nav className='flex justify-between items-center h-16 bg-white text-black relative shadow-md font-mono text-2xl

    ' role='navigation'
    >
      <h1 className='pl-8'>Employee Management</h1>
      
      <ul className='flex items-center '
      >
        <li className='p-4'
        >
         {localStorage.getItem('user')=='Issa' ? <NavLink to="/admin">Home</NavLink> : 
          <NavLink to="/employee">Home</NavLink>}
        </li >
        {/* <li className='p-4'>
          <NavLink to="/register">Register</NavLink>
        </li> */}
        <li className='p-4'>
          {
            login.login ? <NavLink to="/login">
<button 
            className="bg-red-500 text-white rounded-md px-2 py-1 mt-3
            hover:bg-red-600 transition ml-12"
            onClick={() => {removeCookie('access_token')
            window.localStorage.removeItem('userID')
            window.localStorage.removeItem('user')
            window.location.href = "/";
          }}
          >
            Logout
          </button>

            </NavLink> :
            <NavLink to="/login">Login</NavLink>
          }

          
        </li>
        
      </ul>

      
    </nav>
  )
}

export default Navbar
