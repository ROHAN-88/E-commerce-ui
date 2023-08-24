import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <>
      <nav>
        <h1>Logo</h1>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>

          <li>
            <Link to="/signup">signup</Link>
          </li>
          {/* <li>   </li> */}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
