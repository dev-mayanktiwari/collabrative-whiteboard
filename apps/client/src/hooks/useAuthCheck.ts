import { authState } from "@repo/store";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import api from "~/api/api";
import { useAuth } from "./useAuth";

export function useAuthCheck() {
  const [auth, setAuth] = useRecoilState(authState);
  const { logOut } = useAuth();
  useEffect(() => {
    const checkUser = async () => {
      if (!auth.accessToken) {
        try {
          const { data } = await api.get("/auth/self");
          localStorage.setItem("currentUser", JSON.stringify(data.data.user));
          setAuth({
            accessToken: localStorage.getItem("accessToken"),
            user: data.data.user,
          });
        } catch {
          logOut();
        }
      }
    };
    checkUser();
  }, [auth.accessToken, setAuth]);
}
