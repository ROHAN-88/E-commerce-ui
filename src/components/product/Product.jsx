import React from "react";
// import { useNavigate } from "react-router-dom";
import Sellerproduct from "./SellerProduct/Sellerproduct";
import BuyerProduct from "./Buyer-product/BuyerProduct";
const Product = () => {
  const userRole = localStorage.getItem("role");
  return <>{userRole === "seller" ? <Sellerproduct /> : <BuyerProduct />}</>;
};

export default Product;
