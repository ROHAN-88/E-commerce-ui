import { $axios } from "../axios";

export const loginApi = async (values) => {
  return await $axios.post("/user/login", values);
};

export const signupApi = async (values) => {
  return await $axios.post("/user/register", values);
};
