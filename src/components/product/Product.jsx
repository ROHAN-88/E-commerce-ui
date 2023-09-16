import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Sellerproduct from "./SellerProduct/Sellerproduct";
import BuyerProduct from "./Buyer-product/BuyerProduct";
import { Box, Grid, TextField } from "@mui/material";
import ProductFilter from "./filter/ProductFilter";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../store/productSlice";
const Product = () => {
  const userRole = localStorage.getItem("role");

  // const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
          marginRight: "4rem",
          gap: "2rem",
        }}
      >
        {/* //product filter called */}
        <ProductFilter />
        <TextField
          placeholder="Search"
          onChange={(event) => dispatch(setSearchText(event.target.value))}
          sx={{ width: "300px" }}

          // TODO:place icon here
        />
      </Grid>

      {userRole === "seller" ? <Sellerproduct /> : <BuyerProduct />}
    </Box>
  );
};

export default Product;
