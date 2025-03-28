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
    element: (
      <div className="font-extrabold text-4xl text-red-600">404 Not Found</div>
    ),
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <AuthWrapper>
        <Toaster />
        <RouterProvider router={router} />
      </AuthWrapper>
    </RecoilRoot>
  </QueryClientProvider>
);
