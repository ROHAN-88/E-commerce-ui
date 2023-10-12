import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Button, Checkbox, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../../Loader";
import { addProductQuery } from "../../../lib/product.api";
import {
  openErrorSnackbar,
  openSucessSnackbar,
} from "../../../store/customSlice";
import "./product-form.css";

const ProductForm = () => {
  const navigate = useNavigate();

  //!creating localurl for image
  const [loaclUrl, setlocalUrl] = useState(null);

  //!hosting image in a server like cloudinary
  const [productImages, setProductImages] = useState(null);

  const dispatch = useDispatch();

  const addProductMutaion = useMutation({
    mutationKey: ["Add-product-seller"],
    mutationFn: (values) => addProductQuery(values),
    onSuccess: () => {
      dispatch(openSucessSnackbar("Product added sucessfully"));
      navigate("/product");
    },
    onError: (error) => {
      dispatch(
        openErrorSnackbar(
          error?.respond?.data?.message || "Something went wrong"
        )
      );
    },
  });
  // console.log(addProductMutaion);

  if (addProductMutaion.isLoading) {
    <Loader />;
  }
  const category = [
    "grocery",
    "kitchen",
    "clothing",
    "electronics",
    "furniture",
    "cosmetics",
    "bakery",
    "liquor",
    "vehicle",
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          marginTop: "1rem",
          marginRight: "2rem",
        }}
      >
        <Button onClick={() => navigate("/product")} variant="contained">
          Back to product
        </Button>
      </div>
      <div className="product-form-div">
        <Formik
          initialValues={{
            name: "",
            company: "",
            price: 0,
            category: "",
            description: "",
            freeShipping: false,
            quantity: 0,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Must be atleast 2 character")
              .max(55, "Must be 55 characters or less")
              .required("Required"),
            description: Yup.string()
              .min(10, "It should be aleat 10")
              .max(1000, "It can't be over 1000 word"),
            company: Yup.string()
              .min(2, "Must be at least 2 character")
              .max(55, "Must be 55 characters or less")
              .required("Required"),
            //!Important to learn about price
            price: Yup.number().min(1).required("Price Required"),

            quantity: Yup.number().required("Quantity required"),
            //   color:Yup.
            category: Yup.string()
              .trim()
              .required("Category is required")
              .oneOf(category),

            freeShipping: Yup.boolean(),
          })}
          onSubmit={async (values) => {
            let imageUrl = "";
            if (productImages) {
              const cloudName = "diwtmwthg";
              // creates form data object
              const data = new FormData();
              data.append("file", productImages);
              data.append("upload_preset", "hermes-mart");
              data.append("cloud_name", cloudName);

              try {
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  data
                );

                imageUrl = res.data.secure_url;
              } catch (error) {
                dispatch(openErrorSnackbar("Image upload failed."));
              }
            }

            values.imageUrl = imageUrl;
            addProductMutaion.mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="product-form-parent"
            >
              <h2
                style={{
                  color: "#1B6B93",
                }}
              >
                Product Detail
              </h2>
              {/* image ===============  */}
              {loaclUrl && (
                <img
                  src={loaclUrl}
                  width={350}
                  height={250}
                  style={{ objectFit: "cover" }}
                />
              )}
              <Box sx={{ marginBottom: "1rem" }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button variant="outlined" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(event) => {
                        const productImage = event.target.files[0];
                        setlocalUrl(URL.createObjectURL(productImage));
                        setProductImages(productImage);
                      }}
                    />
                  </Button>
                </Stack>
              </Box>
              {/* name ============== */}
              <div className="product-form-input">
                <TextField
                  name="name"
                  label="Product Name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              {/* //company  */}
              <div className="product-form-input">
                <TextField
                  name="company"
                  label="Company"
                  {...formik.getFieldProps("company")}
                />

                {formik.touched.company && formik.errors.company ? (
                  <div>{formik.errors.company}</div>
                ) : null}
              </div>
              {/* price  */}
              <div className="product-form-input">
                <FormControl>
                  <InputLabel>Amount</InputLabel>
                  <OutlinedInput
                    name="price"
                    type="number"
                    {...formik.getFieldProps("price")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>

                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}
              </div>
              {/*//!color picker of the product */}
              {/* //! */}
              {/* //category */}
              <div className="product-form-input">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    name="category"
                    label="Category"
                    {...formik.getFieldProps("category")}
                    style={{
                      background: "#f3fde8",
                    }}
                  >
                    {category.map((item, index, self) => {
                      return (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {formik.touched.category && formik.errors.category ? (
                  <div>{formik.errors.category}</div>
                ) : null}
              </div>
              {/* Quantity */}
              <div className="product-form-input">
                <FormControl>
                  <InputLabel>Quantity</InputLabel>
                  <OutlinedInput
                    name="quantity"
                    type="number"
                    {...formik.getFieldProps("quantity")}
                    id="outlined-adornment-amount"
                    label="Quantu=ity"
                  />
                </FormControl>

                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}
              </div>
              {/* description  */}
              <div className="product-form-input">
                <TextareaAutosize
                  placeholder="Description for Product"
                  name="description"
                  // maxRows={}
                  minRows={8}
                  style={{ width: "100%" }}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              </div>
              {/*check box  */}
              <div>
                <h5>Free Shipping</h5>
                <Checkbox
                  name="freeShipping"
                  {...formik.getFieldProps("freeShipping")}
                />
              </div>
              <button type="submit" disabled={addProductMutaion.isLoading}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProductForm;
