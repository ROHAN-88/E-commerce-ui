import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import "./productDetail.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { productDetailQuires } from "../../../lib/product.api";
import Loader from "../../../Loader";

const ProductDetail = () => {
  //!local storage get role
  const role = localStorage.getItem("role");
  //!navigator
  const navigate = useNavigate();

  //!params
  const params = useParams();
  const productId = params.id;

  //!api hit with query
  const { isError, isLoading, data } = useQuery({
    queryKey: "product-detail",
    queryFn: () => productDetailQuires(productId),
  });

  if (isLoading) {
    return <Loader />;
  }
  // console.log(data);
  const productData = data?.data;
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem 4rem 0rem 0rem",
        }}
      >
        <Button variant="contained" onClick={() => navigate("/product")}>
          Back to product
        </Button>
      </div>
      <Box className="product-card-detail-parent-div">
        <Grid container>
          <Grid xs={6} sx={{ marginTop: "10rem" }}>
            <img src="/img/Screenshot (177).png" alt="" />
          </Grid>
          <Grid>
            <ul className="product-detail-ul">
              <li>Name: {productData?.name}</li>
              <li>Company: {productData?.company} </li>
              <li>
                Desciption: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Dolorem distinctio ipsam voluptate amet, iste recusandae,
                doloribus repudiandae nisi eligendi quos accusantium, corrupti
                natus esse. Et fugit cum eius iusto magnam.
              </li>
              <li>
                FreeShipping :
                {productData?.freeShipping === true ? "Yes" : "No"}
              </li>
              <li>Price :Rs.{productData?.price} </li>
              <li>Quantity : {productData?.quantity} </li>
              <li>Category :{productData?.category}</li>

              {role === "buyer" && (
                <Button variant="contained">Add to Cart </Button>
              )}

              {role === "seller" && (
                <Button variant="contained">Edit Product </Button>
              )}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetail;
