import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnack from "../../snackbar/CustomSnack";

const LogSingup = () => {
  return (
    <>
      <CustomSnack />
      <Outlet />
    </>
  );
};

export default LogSingup;
