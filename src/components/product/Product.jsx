import React from "react";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
          marginRight: "2rem",
        }}
      >
        <button
          onClick={() => navigate("/product/add")}
          style={{ marginRight: "3rem" }}
        >
          Add Product
        </button>
      </div>
    </>
  );
};

export default Product;
