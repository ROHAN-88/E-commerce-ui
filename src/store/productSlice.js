import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    searchText: "",
    minPrice: 0,
    maxPrice: 0,
    category: [],
    isDeleted: false,
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setFilter: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.category = action.payload.category;
    },
    resetFilter: (state, action) => {
      state.minPrice = 0;
      state.maxPrice = 0;
      state.category = [];
    },
    setIsProductDeleted: (state, action) => {
      state.isDeleted = !state.isDeleted;
    },
  },
});

export const { setSearchText, setFilter, resetFilter, setIsProductDeleted } =
  productSlice.actions;

export default productSlice.reducer;
