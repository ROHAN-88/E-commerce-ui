import GuestGuard from "../Gaurd/GuestGuard";
import Login from "../components/LogIn/Login";
import LogSingup from "../components/mainlayout/login-register.mainlayout/LogSingup";
import Signup from "../components/signup/Signup";
import React from "react";

const Guestrouter = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <LogSingup />
      </GuestGuard>
    ),
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default Guestrouter;
