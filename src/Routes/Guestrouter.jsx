import Login from "../components/LogIn/Login";
import Signup from "../components/signup/Signup";
import React from "react";

const Guestrouter = [
  {
    path: "/",
    element: <h1> HOME</h1>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default Guestrouter;
