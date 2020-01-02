import React from "react";
import "../assets/stylesheets/navbar.css";
import { logo } from "../assets/javascript/images";

export default function navbar() {
  return (
    <div className="nav flex center">
      <img src={logo} alt="logo" />
      <ul className="flex nav-item">
        <li>Home</li>
        <li>Log In</li>
      </ul>
    </div>
  );
}
