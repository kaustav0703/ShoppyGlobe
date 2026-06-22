import React, { Suspense } from "react";
// ✅ FIXED: Ensuring the context engine matches your components perfectly
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = React.lazy(() => import("../pages/Home"));
const ProductList = React.lazy(() => import("../pages/ProductList"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Checkout = React.lazy(() => import("../pages/Checkout"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "product-list",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "product-detail/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Checkout />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
