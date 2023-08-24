import { ErrorMessage, Field, Form, Formik } from "formik";
import * as React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Signup.css";
const Signup = () => {
  const [gender, setgender] = React.useState("");
  const handleChange = (event) => {
    setgender(event.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>

      <div className="log-body2">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            role: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Requirred").min(8).max(55),
            gender: Yup.string().required(),
            // role: Yup.string().required(),
            // date: Yup.date().required().trim(),
          })}
          onSubmit={(values) => {
            console.log(values);
            console.log("Hello");
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
            <label>Sign Up</label>
            <div className="two-div">
              {/* <label>First Name</label> */}
              <Field name="firstName" type="text" placeholder="First Name" />
              <ErrorMessage name="firstName" />

              {/* <label>Last Name</label> */}
              <Field name="lastName" type="text" placeholder="Last Name" />
              <ErrorMessage name="lastName" />
            </div>
            {/* <label>Email Address</label> */}
            {/* <Field name="email" type="email" placeholder="example@gmail.com" /> */}
            <TextField
              name="email"
              label="Email"
              type="email"
              placeholder="Expamle@gmail.com"
            />
            {/* //!password */}
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            {/* //!gender */}
            <FormControl
              sx={{ m: 1, minWidth: 120, background: "#f9f9f9" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Gender</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                name="gender"
                value={gender}
                label="Gender"
                onChange={handleChange}
              >
                {/* <MenuItem value=""></MenuItem> */}
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={" Prefer not to say"}>
                  Prefer not to say
                </MenuItem>
              </Select>
            </FormControl>
            {/* //!role */}
            <Field
              name="role"
              as="select"
              className="my-select"
              style={{
                padding: "0.8rem",
                background: "#f3fde8",
                color: "black",

                border: "none",
                borderRadius: "7px",
              }}
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </Field>

            {/* <FormControl
              sx={{ m: 1, minWidth: 120, background: "#f9f9f9" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Role</InputLabel>
              <Select
                labelId="demo-select-small-label"
                name="role"
                value={role}
                label="Role"
                onChange={handleChange}
              >
                {/* <MenuItem value=""></MenuItem> */}
            {/* <MenuItem value={"buyer"}>Buyer</MenuItem>
                <MenuItem value={"seller"}>Seller</MenuItem>
              </Select>
            </FormControl> */}
            {/* //!here date  */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Date Of Birth" />
              </DemoContainer>
            </LocalizationProvider>
            <div>
              <Link to="/Login">Log-In </Link>
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Signup;
