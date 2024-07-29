import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Home, ByCategory, ByIngredient, ByName } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/ByCategory/:category",
          element: <ByCategory />,
        },
        {
          path: "/ByName/:name",
          element: <ByName />,
        },
        {
          path: "/ByIngredient/:ingredient",
          element: <ByIngredient />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
