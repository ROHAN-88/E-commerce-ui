import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Guestrouter from "./Routes/Guestrouter";
import logInRoutes from "./Routes/LogedIn";
import "./index.css";
const queryClient = new QueryClient();

const applicationRoutes = [...Guestrouter, ...logInRoutes];
const router = createBrowserRouter(applicationRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
