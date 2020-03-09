import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/stylesheets/navbar.css";
import { logout } from "./auth/AuthAxios";
import { logo } from "../assets/javascript/images";
import Favorites from "./Favorites";

const Navbar = props => {
  const { user } = props;
  // const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    logout();
    props.updateUser(null);
  };

  console.log(user);

  return (
    <div className="nav flex center">
      <img src={logo} alt="logo" />
      {user ? (
        <>
          <ul className="flex nav-item">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink
                to="/favorite"
                render={props => <Favorites {...props} user={user} />}
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout} to="/">
                Logout
              </NavLink>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="flex nav-item">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/auth">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Navbar;
