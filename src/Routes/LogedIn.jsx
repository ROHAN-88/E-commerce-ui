import Mainlayout from "../components/mainlayout/Mainlayout";

import About from "../components/about-page/About";
import Product from "../components/product/Product";
// import ProductForm from "../components/product/PROroductForm";
import ProductForm from "../components/product/form-product/ProductForm";
import ProductDetail from "../components/product/Productdetail/ProductDetail";
import Home from "../components/home/Home";
const logInRoutes = [
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "home",
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
      {
        path: "product/detail/:id",
        element: <ProductDetail />,
      },
    ],
  },
];

export default logInRoutes;
