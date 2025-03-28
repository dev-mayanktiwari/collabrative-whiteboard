import { authState } from "@repo/store";
import { TUserLoginInput } from "@repo/types";
import { useRecoilState } from "recoil";
import api from "~/api/api";
import apiClient from "~/api/apiClient";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = async (loginData: TUserLoginInput) => {
    const { data } = await api.post("/auth/login", loginData);
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("currentUser", JSON.stringify(data.data.user));
    setAuth({
      accessToken: data.data.accessToken,
      user: data.data.user,
    });
  };

  const logOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    setAuth({ accessToken: null, user: null });
    await apiClient.logout();
    window.location.href = "/login";
  };

  const checkAuth = async () => {
    try {
      const data = await apiClient.self();
      // console.log("Calling from inside hooks/useAuth.ts", data);
      setAuth({
        accessToken: localStorage.getItem("accessToken"),
        user: data.data.user,
      });
    } catch {
      // console.log("Calling from inside hooks/useAuth.ts for logout", error);
      logOut();
    }
  };

  return { auth, login, logOut, checkAuth };
};
