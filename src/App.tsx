import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/errors";
import { Layout, Home, ByCategory, ByIngredient, MealDetail } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      ),
      children: [
        {
          index: true,
          element: (
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          ),
        },
        {
          path: "/ByCategory",
          element: (
            <ErrorBoundary>
              <ByCategory />
            </ErrorBoundary>
          ),
        },
        {
          path: "/ByIngredient",
          element: (
            <ErrorBoundary>
              <ByIngredient />
            </ErrorBoundary>
          ),
        },
        {
          path: "/MealDetail",
          element: (
            <ErrorBoundary>
              <MealDetail />
            </ErrorBoundary>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
