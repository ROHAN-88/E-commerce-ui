import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../../store/customSlice";
import Alert from "@mui/material/Alert";

const CustomSnack = () => {
  const SnackbarData = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  console.log(SnackbarData);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar());
  };
  return (
    <Snackbar
      open={SnackbarData.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={SnackbarData.severity}
        sx={{ width: "100%" }}
      >
        {SnackbarData.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnack;
