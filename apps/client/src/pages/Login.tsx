import { authState } from "@repo/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginPage from "~/components/login/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useRecoilValue(authState);
  // console.log("Calling from inside pages/Login.tsx", user);
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return <LoginPage />;
};

export default Login;
