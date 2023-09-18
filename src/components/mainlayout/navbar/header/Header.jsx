import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../header/scss/main.css";
import { useQuery } from "react-query";
import { cartTotalItem } from "../../../../lib/cart.api";

const Header = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  //!query cart item  count
  const { data } = useQuery({
    queryKey: ["cart-count"],
    queryFn: () => cartTotalItem(),
  });
  const CartItemCount = data?.data?.itemCount;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav>
        {/* {//Div1 - Logo  } */}
        <div className="logo">
          {/* <img src="#" alt="" /> */}
          <h2>Nepal-Mart</h2>
        </div>
        {/* //DIV2 - Link */}
        <div className="nav-link">
          <ul>
            <li>
              <Link to="/home" className="link-a">
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
        {/* //! */}
        <div></div>
        {/* //DIV3 - Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "1rem",
          }}
        >
          {userRole === "seller" ? (
            " "
          ) : (
            <div
              style={{
                fontSize: "28px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={CartItemCount} color="primary">
                <FaShoppingCart />
              </Badge>
            </div>
          )}

          <div>
            <Stack direction="row" spacing={2}>
              <Avatar>R</Avatar>
            </Stack>
          </div>

          {/* button logout  */}
          <div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div>
                <Typography sx={{ p: 2 }}>Do you want to Log out .</Typography>

                <div
                  style={{
                    display: "flex",
                    // justifyContent: "flex-end",
                    gap: "1rem",
                  }}
                >
                  <button onClick={handleLogout}> yes</button>

                  <button onClick={() => handleClose()}>No</button>
                </div>
              </div>
            </Popover>

            <button onClick={handleClick}>
              <CiLogout size={20} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
