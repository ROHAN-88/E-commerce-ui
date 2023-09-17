import React from "react";

import Footer from "./navbar/footer/Footer";
import { Outlet } from "react-router-dom";
import CustomSnack from "../snackbar/CustomSnack";
import CustomNavbar from "../Mui/CustomNavbar";
import Header from "./navbar/header/Header";

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
