import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/errors";
import { PageWrapper } from "./components/transition";
import { Layout, Home, ByCategory, ByIngredient, MealDetail } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <PageWrapper>
            <Layout />
          </PageWrapper>
        </ErrorBoundary>
      ),
      children: [
        {
          path: "/",
          element: (
            <ErrorBoundary>
              <PageWrapper>
                <Home />
              </PageWrapper>
            </ErrorBoundary>
          ),
        },
        {
          path: "/ByCategory",
          element: (
            <ErrorBoundary>
              <PageWrapper>
                <ByCategory />
              </PageWrapper>
            </ErrorBoundary>
          ),
        },
        {
          path: "/ByIngredient",
          element: (
            <ErrorBoundary>
              <PageWrapper>
                <ByIngredient />
              </PageWrapper>
            </ErrorBoundary>
          ),
        },
        {
          path: "/MealDetail",
          element: (
            <ErrorBoundary>
              <PageWrapper>
                <MealDetail />
              </PageWrapper>
            </ErrorBoundary>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
