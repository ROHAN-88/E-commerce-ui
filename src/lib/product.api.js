import { $axios } from "./axios";

export const getBuyerProduct = async (pagination) => {
  return await $axios.post("/product/buyer/all", pagination);
};

export const getSellerProduct = async (pagination) => {
  return await $axios.post("/product/seller/all", pagination);
};

export const deleteSellerProduct = async (id) => {
  return await $axios.delete(`/product/delete/${id}`);
};

export const productDetailQuires = async (id) => {
  return await $axios.get(`/product/detail/${id}`);
};
