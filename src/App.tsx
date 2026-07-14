import type { ComponentType } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/errors";
import { PageWrapper } from "./components/transition";
import { BarLoader } from "./components/loaders";
import { Layout, Home } from "./pages";

const ByCategory = lazy(() => import("./pages/ByCategory"));
const ByIngredient = lazy(() => import("./pages/ByIngredient"));
const ByName = lazy(() => import("./pages/ByName"));
const MealDetail = lazy(() => import("./pages/MealDetail"));

const withPage = (Node: ComponentType) => (
  <ErrorBoundary>
    <PageWrapper>
      <Suspense fallback={<BarLoader placeholder="Loading…" />}>
        <Node />
      </Suspense>
    </PageWrapper>
  </ErrorBoundary>
);

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
        { index: true, element: withPage(Home) },
        { path: "ByCategory", element: withPage(ByCategory) },
        { path: "ByIngredient", element: withPage(ByIngredient) },
        { path: "ByName", element: withPage(ByName) },
        { path: "MealDetail", element: withPage(MealDetail) },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
