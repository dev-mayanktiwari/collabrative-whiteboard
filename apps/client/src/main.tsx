import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@repo/ui/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@repo/ui";
import LoginPage from "./components/login/LoginForm.tsx";
import Register from "./pages/Register.tsx";
import VerifyEmail from "./pages/VerifyEmal.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
      <Toaster />
      <RouterProvider router={router} />
    </RecoilRoot>
  </QueryClientProvider>
);
