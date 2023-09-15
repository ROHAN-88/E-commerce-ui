import React from "react";
import Header from "./navbar/header/Header";
import Footer from "./navbar/footer/Footer";
import { Outlet } from "react-router-dom";
import CustomSnack from "../snackbar/CustomSnack";

const Mainlayout = () => {
  return (
    <div>
      <Header />
      <CustomSnack />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Mainlayout;
