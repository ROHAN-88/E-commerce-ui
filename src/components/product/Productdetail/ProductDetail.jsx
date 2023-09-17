import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import "./productDetail.css";
import { Button, Chip, Stack, Typography } from "@mui/material";
import { AiOutlineMinus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { productDetailQuires } from "../../../lib/product.api";
import Loader from "../../../Loader";
import { addItemToCart } from "../../../lib/cart.api";
import { useDispatch } from "react-redux";
import { openSucessSnackbar } from "../../../store/customSlice";

const ProductDetail = () => {
  //!dispatch
  const dispatch = useDispatch();
  //!local storage get role
  const role = localStorage.getItem("role");

  //!navigator
  const navigate = useNavigate();

  //!usestate
  const [counter, setCounter] = useState(1);

  //!params
  const params = useParams();
  const productId = params.id;

  //!api hit with query
  const { isError, isLoading, data } = useQuery({
    queryKey: "product-detail",
    queryFn: () => productDetailQuires(productId),
  });

  //!mutation
  const queryClient = useQueryClient();
  const addItemToCartMutation = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: () => addItemToCart({ productId, quantity: counter }),
    onSuccess: () => {
      dispatch(openSucessSnackbar("Item Addedto Cart"));

      queryClient.invalidateQueries("cart-count");
      navigate("/product");
    },
  });

  if (isLoading || addItemToCartMutation.isLoading) {
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
          <Grid sx={{ marginTop: "10rem" }}>
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
              <li>
                <Stack direction={"row"} sx={{ display: "flex", gap: "1rem" }}>
                  Quantity : {productData?.quantity}
                  {productData?.quantity >= 0 ? (
                    <Chip label="In-Stock" color="success" />
                  ) : (
                    <Chip label="Out -OF-Stock" color="error" />
                  )}
                </Stack>
              </li>
              <li>Category :{productData?.category}</li>

              {role === "buyer" && (
                <>
                  <Grid item sx={{ display: "flex", gap: "1rem" }}>
                    <Typography sx={{ fontSize: "1.5rem" }}>
                      Number of items
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        const newCount = counter + 1;
                        if (newCount >= productData?.quantity) {
                          setCounter(productData?.quantity);
                        } else {
                          setCounter(newCount);
                        }
                      }}
                    >
                      <GrAdd size={30} />
                    </Button>
                    <Typography variant="h3">{counter}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        const newCount = counter - 1;

                        if (newCount <= 0) {
                          setCounter(1);
                        } else {
                          setCounter(newCount);
                        }
                      }}
                    >
                      <AiOutlineMinus size={30} />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => {
                        addItemToCartMutation.mutate();
                      }}
                    >
                      Add to cart
                    </Button>
                  </Grid>
                </>
              )}

              {role === "seller" && (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/product/edit/${productId}`)}
                >
                  Edit Product
                </Button>
              )}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetail;
