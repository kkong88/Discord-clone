import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav className="navbar">
      <NavLink to="/" exact={true} className="navbar-brand">
      <img src="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686255378/png-clipart-computer-icons-discord-logo-smiley-emoticon-smiley-miscellaneous-blue_vwm9lw.png" alt="home" />
      </NavLink>
      <div className="navbar-actions">
        {!user && (
          <div>
            <NavLink to="/login" exact={true} className="navbar-link">
              Login
            </NavLink>
            <NavLink to="/signup" exact={true} className="navbar-link">
              Sign Up
            </NavLink>
          </div>
        )}
        {user && <LogoutButton />}
      </div>
    </nav>
  );
};

export default NavBar;
