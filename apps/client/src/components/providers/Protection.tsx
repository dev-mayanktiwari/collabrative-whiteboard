import { authState } from "@repo/store";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

const ProtectedRoute = () => {
  const { user } = useRecoilValue(authState);
  // console.log("Calling from inside components/providers/Protection.tsx", user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
