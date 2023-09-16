import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../Loader";

import { useMutation } from "react-query";
import { loginApi } from "../../lib/login-signup/login_signup.api";
import "./LogIn.css";
import { useDispatch } from "react-redux";
import { openErrorSnackbar, openSucessSnackbar } from "../../store/customSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationKey: ["login-key"],
    mutationFn: (values) => loginApi(values),
    onSuccess: (respond) => {
      // extract accesstoken

      const accesstoken = respond?.data?.accesstoken;
      // console.log(accesstoken);
      // save access token to local storage.it is a key value pair
      localStorage.setItem("accesstoken", accesstoken);

      //user full name
      const username =
        respond?.data?.user?.firstName + " " + respond?.data?.user?.lastName;

      localStorage.setItem("username", username);

      localStorage.setItem("role", respond?.data?.user?.role);

      localStorage.setItem("isLoggedIn", true);

      //navigation
      navigate("/home");

      dispatch(openSucessSnackbar("Welcome"));
    },
    onError: (error) => {
      console.log(error?.response?.data);
      console.log("error");
      dispatch(openErrorSnackbar("something went wrong"));
    },
  });

  if (loginMutation.isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="log-body">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Requirred").min(8).max(55),
          })}
          onSubmit={(values) => {
            loginMutation.mutate(values);
          }}
        >
          <Form className="form-parent">
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

            <h2>Log-IN</h2>

            {/* <label>Email Address</label> */}
            <Field name="email" type="email" placeholder="example@gmail.com" />
            <ErrorMessage name="email" />

            {/* <label>Password</label> */}
            <Field
              name="password"
              type="password"
              placeholder="Enter Password"
            />

            <ErrorMessage name="password" id="error" />

            <div>
              <Link to="/signup">Don't have a account? </Link>
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
