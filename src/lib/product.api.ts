import { $axios } from "./axios";

export const getBuyerProduct = async (pagination) => {
  return await $axios.post("/product/buyer/all", pagination);
};

export const getSellerProduct = async (pagination) => {
  return await $axios.post("/product/seller/all", pagination);
};
