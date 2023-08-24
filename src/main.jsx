import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Guestrouter from "./Routes/Guestrouter";
import "./index.css";

const applicationRoutes = [...Guestrouter];
const router = createBrowserRouter(applicationRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
