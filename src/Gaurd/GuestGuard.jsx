import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return props.children;
};

export default GuestGuard;
