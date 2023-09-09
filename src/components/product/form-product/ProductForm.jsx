import { Checkbox, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import React from "react";
import { $axios } from "../../../lib/axios";
import * as Yup from "yup";
import "./product-form.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { addProductQuery } from "../../../lib/product.api";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSucessSnackbar,
} from "../../../store/customSlice";

const ProductForm = () => {
  const navigate = useNavigate();

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
  console.log(addProductMutaion);

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
        <button onClick={() => navigate("/product")}>Back to product</button>
      </div>
      <div className="product-form-div">
        <Formik
          initialValues={{
            name: "",
            company: "",
            price: 0,
            category: "",
            freeShipping: false,
            quantity: 0,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Must be atleast 2 character")
              .max(55, "Must be 55 characters or less")
              .required("Required"),
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
            addProductMutaion.mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="product-form-parent"
            >
              <div className="nav">
                <div>
                  <h2
                    style={{
                      color: "#FFE5E5",
                      fontWeight: "500",
                    }}
                  >
                    Welcome to <br></br> Hermes
                  </h2>
                </div>

                <div>
                  <h2> LOGO</h2>
                </div>
              </div>
              <h2
                style={{
                  color: " #040D12",
                }}
              >
                Product Detail
              </h2>
              {/* name  */}
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
              {/* {console.log(formik.values)} */}
              {/* price  */}
              <div className="product-form-input">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel>Amount</InputLabel>
                  <OutlinedInput
                    name="price"
                    type="number"
                    {...formik.getFieldProps("price")}
                    id="outlined-adornment-amount"
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
              {/*//!color  */}

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
                    // ! not use full
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    // value={categorys}
                    //
                    style={{
                      background: "#f3fde8",
                    }}
                    // onChange={handleChange}
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
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel>Amount</InputLabel>
                  <OutlinedInput
                    name="quantity"
                    type="number"
                    {...formik.getFieldProps("quantity")}
                    id="outlined-adornment-amount"
                    label="Amount"
                  />
                </FormControl>

                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}
              </div>
              {/*check box  */}
              <div>
                <h5>Free Shipping</h5>
                <Checkbox
                  // checked={checked}
                  // onChange={handleChange}
                  name="freeShipping"
                  {...formik.getFieldProps("freeShipping")}
                  // inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {/* {console.log(formik.values)} */}

              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProductForm;
