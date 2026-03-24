import { createHashRouter } from "react-router";
import FrontendLayout from "../layout/FrontendLayout";
import Home from "../views/frontend/Home";
import Products from "../views/frontend/Products";
import SingleProduct from "../views/frontend/SingleProduct";
import Cart from "../views/frontend/Cart";
import Checkout from "../views/frontend/Checkout";
import CheckoutSuccess from "../views/frontend/CheckoutSuccess";
import NotFound from "../views/frontend/NotFound";
import Favorite from "../views/frontend/Favorite";

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'favorite',
        element: <Favorite />, 
      },
      {
        path: "product",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout-success/:orderId",
        element: <CheckoutSuccess />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
