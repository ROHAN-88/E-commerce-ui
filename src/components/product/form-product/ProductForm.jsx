import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import "./product-form.css";

const ProductForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //category function
  const category = [
    "grocery",
    "kitchen",
    "clothing",
    "electronics",
    "furniture",
    "cosmetics",
    "bakery",
    "liquor",
  ];
  //form mui
  const [categorys, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className="product-form-div">
      <Formik
        initialValues={{ name: "", company: "", price: "0", category: "hello" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Must be atleast 2 character")
            .max(55, "Must be 55 characters or less")
            .required("Required"),
          company: Yup.string()
            .min(2, "Must be at least 2 character")
            .max(55, "Must be 55 characters or less")
            .required("Required"),

          price: Yup.string().min(1).max(55).required("Price Required"),

          quantity: Yup.string().min(1).required("Quantity required"),
          //   color:Yup.
          category: Yup.string()
            .trim()
            .required("Category is required")
            .oneOf(category),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="product-form-parent">
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
            {console.log(formik.values)}
            {/* price  */}
            <div className="product-form-input">
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Amount</InputLabel>
                <OutlinedInput
                  name="price"
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
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  {...formik.getFieldProps("category")}
                  // labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  value={categorys}
                  //
                  style={{
                    background: "#f3fde8",
                  }}
                  onChange={handleChange}
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

            {/*  */}

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
