import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./customSlice";
import productReducer from "./productSlice";
export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    product: productReducer,
  },
});
