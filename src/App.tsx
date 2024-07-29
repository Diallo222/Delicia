import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Home, ByCategory, ByIngredient, ByName, MealDetail } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true, 
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
        {
          path: "/MealDetail",
          element: <MealDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
