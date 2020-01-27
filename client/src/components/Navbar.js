import React from "react";
import { Router, Link } from "react-router-dom";
import "../assets/stylesheets/navbar.css";
import { logo } from "../assets/javascript/images";

export default function navbar() {
  return (
    <div className="nav flex center">
      <img src={logo} alt="logo" />
      <ul className="flex nav-item">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auth">Log In</Link>
        </li>
      </ul>
    </div>
  );
}
