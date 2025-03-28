import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@repo/ui/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@repo/ui";
import Register from "./pages/Register.tsx";
import VerifyEmail from "./pages/VerifyEmal.tsx";
import AuthWrapper from "./components/providers/AuthWrapper.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import ProtectedRoute from "./components/providers/Protection.tsx";
import Canvas from "./pages/Canvas.tsx";
import NotFoundPage from "./components/errors/NotFound.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackComponent from "./components/errors/ErrorBoundary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/canvas/:canvasId",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Canvas />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallbackComponent}
    onError={(error, info) => {
      console.error("Global Error Caught:", error, info);
    }}
  >
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AuthWrapper>
          <Toaster />
          <RouterProvider router={router} />
        </AuthWrapper>
      </RecoilRoot>
    </QueryClientProvider>
  </ErrorBoundary>
);
