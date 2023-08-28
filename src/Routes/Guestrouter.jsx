import Login from "../components/LogIn/Login";
import Signup from "../components/signup/Signup";
import React from "react";

const Guestrouter = [
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
