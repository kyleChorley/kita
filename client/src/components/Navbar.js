import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/stylesheets/navbar.css";
import { logo } from "../assets/javascript/images";

export default function navbar() {
  return (
    <div className="nav flex center">
      <img src={logo} alt="logo" />
      <ul className="flex nav-item">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/auth">Log In</NavLink>
        </li>
      </ul>
    </div>
  );
}
