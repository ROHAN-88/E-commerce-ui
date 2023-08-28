import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../header/scss/main.css";
const Header = () => {
  return (
    <>
      <nav>
        {/* {//Div1 - Logo  } */}
        <div className="logo">
          {/* <img src="#" alt="" /> */}
          <h2>LOGO</h2>
        </div>
        {/* //DIV2 - Link */}
        <div className="nav-link">
          <ul>
            <li>
              <Link to="/" className="link-a">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/about" className="link-a">
                About
              </Link>
            </li>
            <li>
              <Link to="/product" className="link-a">
                Product
              </Link>
            </li>
          </ul>
        </div>
        {/* //DIV3 - Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "28px",
            }}
          >
            <Badge badgeContent={5} color="primary">
              <FaShoppingCart />
            </Badge>
          </div>
          <div>
            <Stack direction="row" spacing={2}>
              <Avatar>R</Avatar>
            </Stack>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
