import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Guestrouter from "./Routes/Guestrouter";
import logInRoutes from "./Routes/LogedIn";
import store from "./store/index";
import { Provider } from "react-redux";
import "./index.css";
const queryClient = new QueryClient();

const applicationRoutes = [...Guestrouter, ...logInRoutes];
const router = createBrowserRouter(applicationRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
