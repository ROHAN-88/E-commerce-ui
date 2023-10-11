import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signupApi } from "../../lib/login-signup/login_signup.api";
import { openErrorSnackbar, openSucessSnackbar } from "../../store/customSlice";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isLoading, isError } = useMutation({
    mutationKey: ["sigup-key"],
    mutationFn: (values) => signupApi(values),
    onSuccess: () => {
      dispatch(openSucessSnackbar("user register"));
      navigate("/login");
    },
    onError: (error) => {
      // console.log(error);
      dispatch(openErrorSnackbar(error?.response?.data + "hello"));
    },
  });

  return (
    <div className=" form-parent-signup">
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          role: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address.")
            .required("Email is required.")
            .min(5, "Must be at least 5 characters.")
            .max(55, "Must be at most 55 characters.")
            .trim(),
          firstName: Yup.string()
            .max(55, "Must be at most 55 characters.")
            .required("First name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
          lastName: Yup.string()
            .max(55, "Must be at most 55 characters.")
            .required("Last name is required.")
            .min(2, "Must be at least 2 characters.")
            .trim(),
          password: Yup.string()
            .max(25, "Must be at most 25 characters.")
            .required("Password is required.")
            //   .matches(
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/,
            //     "Password must be at least 8 character with  at least 1 capital letter, 1 small letter, 1 number and 1 special character."
            //   )
            .trim(),

          gender: Yup.string()
            .required("Please choose at least one gender.")
            .trim()
            .oneOf(
              ["male", "female", "preferNotToSay"],
              "Gender must be male,female or prefer not to say."
            ),

          role: Yup.string()
            .required("Please choose at least one role.")
            .trim()
            .oneOf(["buyer", "seller"]),

          dob: Yup.date("Must be valid date.").required(
            "Date of birth is required."
          ),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          <form className="input-parent" onSubmit={handleSubmit}>
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
            <Typography
              variant="h3"
              sx={{ textAlign: "center", color: "grey" }}
            >
              Sign up
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <TextField
                name="firstName"
                label="First name"
                {...getFieldProps("firstName")}
              />
              {touched.firstName && errors.firstName ? (
                <div className="error-message">{errors.firstName}</div>
              ) : null}
              <TextField
                name="lastName"
                label="Last name"
                {...getFieldProps("lastName")}
              />
              {touched.lastName && errors.lastName ? (
                <div className="error-message">{errors.lastName}</div>
              ) : null}
            </div>

            <div className="gap">
              <TextField
                name="email"
                label="Email"
                {...getFieldProps("email")}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ) : null}
            </div>

            <div className="gap">
              <TextField
                name="password"
                label="Password"
                type="password"
                {...getFieldProps("password")}
              />
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </div>

            <div className="gap">
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  label="Gender"
                  {...getFieldProps("gender")}
                  style={{
                    background: "#f3fde8",
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
                </Select>
                {touched.gender && errors.gender ? (
                  <div className="error-message">{errors.gender}</div>
                ) : null}
              </FormControl>
            </div>

            <div className="gap">
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  label="Role"
                  {...getFieldProps("role")}
                  style={{
                    background: "#f3fde8",
                  }}
                >
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                </Select>
                {touched.role && errors.role ? (
                  <div className="error-message">{errors.role}</div>
                ) : null}
              </FormControl>
            </div>

            <div className="gap">
              <TextField name="dob" label="DOB" {...getFieldProps("dob")} />
              {touched.dob && errors.dob ? (
                <div className="error-message">{errors.dob}</div>
              ) : null}
            </div>

            <div>
              <Link to="/login">Already have an account?</Link>
            </div>

            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "1rem", width: "100%" }}
              disabled={isLoading}
            >
              Register
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
