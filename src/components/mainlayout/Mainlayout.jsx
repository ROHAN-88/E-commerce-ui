import React from "react";
import Header from "./navbar/header/Header";
import Footer from "./navbar/footer/Footer";
import { Outlet } from "react-router-dom";
import CustomSnack from "../snackbar/CustomSnack";
// import "";
const Mainlayout = () => {
  return (
    <>
      <Header />
      <CustomSnack />
      <Outlet />
      <Footer />
    </>
  );
};

export default Mainlayout;
