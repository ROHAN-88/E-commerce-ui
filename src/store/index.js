import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./customSlice";
export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});
