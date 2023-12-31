import Mainlayout from "../components/mainlayout/Mainlayout";

import About from "../components/about-page/About";
import Product from "../components/product/Product";
// import ProductForm from "../components/product/PROroductForm";
import ProductForm from "../components/product/form-product/ProductForm";
import ProductDetail from "../components/product/Productdetail/ProductDetail";
import Home from "../components/home/Home";
import Editproduct from "../components/product/EditProduct/Editproduct";
import Cart from "../components/cart/Cart";
import AuthGuard from "../Gaurd/AuthGuard";
const logInRoutes = [
  {
    path: "/",

    element: (
      <AuthGuard>
        <Mainlayout />
      </AuthGuard>
    ),
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
      {
        path: "product/edit/:id",
        element: <Editproduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default logInRoutes;
