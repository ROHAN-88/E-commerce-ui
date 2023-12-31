import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { getCartData, removeItemFromCart } from "../lib/apis/cart.api";

import { useDispatch } from "react-redux";

import Loader from "../../Loader";
import {
  getCartData,
  removeItemFromCart,
  updateCartQuanity,
} from "../../lib/cart.api";
import { openErrorSnackbar, openSucessSnackbar } from "../../store/customSlice";
import { getRandomId } from "../../utils/random.id";
import NoItemFound from "../noItemFound/NoItemFound";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //!cart query
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartData(),
    onError: (error) => {
      dispatch(
        openErrorSnackbar(
          error?.response?.data?.message || "Something is wrong"
        )
      );
    },
  });

  const cartData = data?.data;

  //!mutaion
  const { mutate: deletemutaion, isLoading: removeCartLoading } = useMutation({
    mutationKey: ["removeCart"],
    mutationFn: (id) => removeItemFromCart(id),
    onSuccess: (res) => {
      dispatch(openSucessSnackbar(res?.data?.message || "Item removed"));
      // reloads cart query
      queryClient.invalidateQueries("cart");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar("Item cannot be removed."));
    },
  });

  //!mutation
  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationKey: ["update-cart"],
    mutationFn: (values) =>
      updateCartQuanity(values.productId, { action: values.action }),
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });

  //!is loading
  if (isLoading || removeCartLoading) {
    return <Loader />;
  }
  return (
    <>
      {cartData?.length === 0 ? (
        <>
          <NoItemFound message="NO item in Cart" />
          <Button variant="contained" onClick={() => navigate("/product")}>
            Start Shopping
          </Button>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            margin: "2rem",
          }}
        >
          <Grid
            container
            sx={{
              maxHeight: "70vh",

              overflowY: "scroll",
              borderRadius: "10px",
              boxShadow:
                " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Image</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Name</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Brand</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Price per unit</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Quantity</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Total</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Action</Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData?.map((item) => (
                    <TableRow
                      key={getRandomId()}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell align="center">
                        <img
                          style={{
                            height: "100px",
                            width: "100px",
                            objectFit: "cover",
                          }}
                          src={item?.imageUrl}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6">{item?.name}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6"> {item?.company}</Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography variant="h6"> {item?.unitPrice}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack direction="row">
                          <Button
                            onClick={() => {
                              updateMutate({
                                productId: item?.productId,
                                action: "decrease",
                              });
                            }}
                            disabled={item?.orderQuantity === 1}
                          >
                            <AiOutlineMinus size={20} />
                          </Button>

                          <Typography variant="h6">
                            {item?.orderQuantity}
                          </Typography>
                          <Button
                            onClick={() => {
                              updateMutate({
                                productId: item?.productId,
                                action: "increase",
                              });
                            }}
                          >
                            <AiOutlinePlus size={20} />
                          </Button>
                        </Stack>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography variant="h6">{item?.totalPrice}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          sx={{ color: "red" }}
                          onClick={() => {
                            deletemutaion(item?.productId);
                          }}
                        >
                          <AiOutlineDelete size={30} />
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "column" }} xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/products");
              }}
            >
              Back to shopping
            </Button>
            <Grid
              container
              sx={{
                marginTop: "6rem",
                borderRadius: "10px",
                boxShadow: "rgba(120, 29, 69, 0.3) 0px 0px 0px 3px",
                minWidth: "20rem",
                padding: "1rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                gap: "0.5rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "grey", mb: "1rem" }}
              >
                Order Summary
              </Typography>
              <Grid
                item
                sx={{
                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                <Typography>Subtotal</Typography>
                <Typography>4500</Typography>
              </Grid>
              <Divider />
              <Grid
                item
                sx={{
                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                <Typography>Discount</Typography>
                <Typography>5%</Typography>
              </Grid>
              <Divider />
              <Grid
                item
                sx={{
                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                <Typography>Grand total</Typography>
                <Typography>4050</Typography>
              </Grid>
              <Divider />
            </Grid>
            <Button variant="contained" sx={{ mt: "3rem" }} color="success">
              Proceed to checkout
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

const StyledTableCell = styled(TableCell)`
  padding: 1rem;
`;
export default Cart;
