import { $axios } from "./axios";

export const addItemToCart = async (values) => {
  // console.log({ values });
  return await $axios.post("/cart/add", values);
};

export const getCartData = async () => {
  return await $axios.get("/cart/details");
};

export const removeItemFromCart = async (id) => {
  return await $axios.put(`/cart/remove/item/${id}`);
};

export const updateCartQuanity = async (id, values) => {
  return await $axios.put(`/cart/update/quantity/${id}`, values);
};

export const cartTotalItem = async () => {
  return await $axios.get("/cart/total/item");
};
