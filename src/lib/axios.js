import axios from "axios";

export const $axios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

//!setting certain nr=eed info in local storage through axios
$axios.interceptors.request.use(function (config) {
  // extract accesstoken from local storage
  const accesstoken = localStorage.getItem("accesstoken");

  // if token, set it to every request
  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }

  return config;
});
