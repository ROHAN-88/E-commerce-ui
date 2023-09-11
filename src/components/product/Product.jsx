import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Sellerproduct from "./SellerProduct/Sellerproduct";
import BuyerProduct from "./Buyer-product/BuyerProduct";
import { Box, Grid, TextField } from "@mui/material";
const Product = () => {
  const userRole = localStorage.getItem("role");

  const [searchText, setSearchText] = useState("");
  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
          marginRight: "4rem",
        }}
      >
        <TextField
          placeholder="Search"
          onChange={(event) => setSearchText(event.target.value)}
          sx={{ width: "300px" }}

          // TODO:place icon here
        />
      </Grid>

      {userRole === "seller" ? (
        <Sellerproduct searchText={searchText} />
      ) : (
        <BuyerProduct searchText={searchText} />
      )}
    </Box>
  );
};

export default Product;
