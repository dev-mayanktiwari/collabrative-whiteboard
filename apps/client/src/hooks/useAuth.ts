import { authState } from "@repo/store";
import { TUserLoginInput } from "@repo/types";
import { useRecoilState } from "recoil";
import api from "~/api/api";

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
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    setAuth({ accessToken: null, user: null });
  };
  return { auth, login, logOut };
};
