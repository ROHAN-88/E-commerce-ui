import Mainlayout from "../components/mainlayout/Mainlayout";

import About from "../components/about-page/About";
import { Home } from "../components/home/Home";
import Product from "../components/product/Product";
// import ProductForm from "../components/product/PROroductForm";
import ProductForm from "../components/product/form-product/ProductForm";
const logInRoutes = [
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "hello",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/add",
        element: <ProductForm />,
      },
    ],
  },
];

export default logInRoutes;
