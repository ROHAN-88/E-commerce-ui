import {
  Box,
  Checkbox,
  Stack,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Loader from "../../../Loader";
import * as Yup from "yup";
import {
  editProductQuery,
  productDetailQuires,
} from "../../../lib/product.api";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSucessSnackbar,
} from "../../../store/customSlice";
import axios from "axios";
// import "./product-form.css";

const Editproduct = () => {
  // const [imageLoading, setImageLoading] = useState(false);
  //!image placeholder
  const placeHolderImage =
    "https://res.cloudinary.com/diwtmwthg/image/upload/v1696927991/jfdb2hlrw0f8iwa2uidy.jpg";

  //!creating localurl for image
  const [loaclUrl, setlocalUrl] = useState(null);

  //!hosting image in a server like cloudinary
  const [productImages, setProductImages] = useState(null);
  //!calling dispatch
  const dispatch = useDispatch();

  //!params
  const params = useParams();
  const productId = params.id;

  //!navigation
  const navigate = useNavigate();

  //!api hit with query
  const {
    isError,
    isLoading: productDetailLoading,
    data,
  } = useQuery({
    queryKey: "product-detail",
    queryFn: () => productDetailQuires(productId),
  });

  const productData = data?.data;

  //!mutation
  const editProduct = useMutation({
    mutationKey: "edit-product",
    mutationFn: (values) => editProductQuery(productId, values),
    onSuccess: () => {
      dispatch(openSucessSnackbar("Edited Sucessfully"));
      navigate(`/product/detail/${productId}`);
    },
    onError: (error) => {
      // console.log(error);
      dispatch(openErrorSnackbar("something went wrong"));
    },
  });

  if (editProduct.isLoading || productDetailLoading) {
    return <Loader />;
  }

  //!category
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
          enableReinitialize
          initialValues={{
            imageUrl: productData?.imageUrl,
            name: productData?.name || " ",
            company: productData?.company || " ",
            price: productData?.price || 0,
            category: productData?.category || "",
            freeShipping: productData?.freeShipping || false,
            description: productData?.description || " ",
            quantity: productData?.quantity || 0,
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
            description: Yup.string()
              .min(10, "It should be aleat 10")
              .max(1000, "It can't be over 1000 word")
              .required("Description is required"),
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
                // setImageLoading(true);
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  data
                );

                imageUrl = res.data.secure_url;
                // setImageLoading(false);
              } catch (error) {
                // setImageLoading(false);
                dispatch(openErrorSnackbar("Image upload failed."));
              }
            }

            if (imageUrl) {
              values.imageUrl = imageUrl;
            }
            editProduct.mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="product-form-parent"
            >
              <h2
                style={{
                  color: " #040D12",
                }}
              >
                Product Detail
              </h2>

              <img
                src={loaclUrl || productData?.imageUrl || placeHolderImage}
                width={"100%"}
                style={{ objectFit: "cover" }}
              />

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
                <FormControl>
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
                <FormControl>
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
              {/* description  */}
              <div className="product-form-input">
                <TextareaAutosize
                  placeholder="Description for Product"
                  name="description"
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

export default Editproduct;
