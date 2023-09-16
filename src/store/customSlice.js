import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "",
    message: "",
  },
  reducers: {
    openErrorSnackbar: (state, action) => {
      (state.open = true),
        (state.severity = "warning"),
        (state.message = action.payload);
    },
    openSucessSnackbar: (state, action) => {
      (state.open = true),
        (state.severity = "success"),
        success((state.message = action.payload));
    },
    closeSnackbar: (state, action) => {
      state.open = false;
    },
  },
});

export const { openErrorSnackbar, openSucessSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
