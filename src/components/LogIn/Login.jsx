import React from "react";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

// import { $axios } from "../../lib/axios";
import axios from "axios";

import "./LogIn.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
          onSubmit={async (values) => {
            console.log(values);
            try {
              const respond = await axios.post(
                "http://localhost:8000/user/login",
                values
              );

              setLoading(false);

              // extract accesstoken
              const accesstoken = respond.data.access_token;

              console.log(respond);

              // save access token to local storage
              localStorage.setItem("accesstoken", accesstoken);

              // push to home page
              navigate("/");
              console.log(respond.data.accesstoken);
            } catch (e) {
              console.log(e.message);
            }
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
              <Link to="/signup">Sign-up </Link>
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
