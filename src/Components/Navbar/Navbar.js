import React from "react";
import "./Navbar.css";

import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("isLogin"))

  const handleLogOut = () => {
    localStorage.setItem("isLogin", false)
    navigate('/signin')
  }


  return (
    <>
      <nav className="main_nav">
        <div className="logo">
          <h2>
            <Link to="/dashboard">Kanban Board</Link>
          </h2>
        </div>

        <div
          className="menu_link">
          <ul>
            <li>
              <NavLink to={isLogin ? "/dashboard" : "/signin"}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={isLogin ? "/taskmanager" : "/signin"}>Task Manager</NavLink>
            </li>
            {!isLogin && (
              <>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
               <li>
               <NavLink to="/">Sign Up</NavLink>
             </li>
             </>
            )}
            {isLogin && (
              <li>
                <button className="btn" onClick={handleLogOut}>Sign Out</button>
              </li>
            )}

          </ul>
          <div ></div>

        </div>

      </nav>
    </>
  );
};

export default Navbar;
