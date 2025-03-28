import { authState } from "@repo/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import RegisterPage from "~/components/register/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useRecoilValue(authState);
  // console.log("Calling from inside pages/Login.tsx", user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return <RegisterPage />;
};

export default Register;
