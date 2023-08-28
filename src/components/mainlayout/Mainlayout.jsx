import React from "react";
import Header from "./navbar/header/Header";
import Footer from "./navbar/footer/Footer";
import { Outlet } from "react-router-dom";
// import "";
const Mainlayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Mainlayout;
