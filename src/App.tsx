import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Home, Charactere } from "./pages";

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
          path: "/charactere/:id",
          element: <Charactere />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
