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
          path: "/ByCategory",
          element: <ByCategory />,
        },
        {
          path: "/ByName",
          element: <ByName />,
        },
        {
          path: "/ByIngredient",
          element: <ByIngredient />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
