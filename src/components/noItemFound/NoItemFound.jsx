import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoItemFound = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>{props.message}</h1>
    </div>
  );
};

export default NoItemFound;
