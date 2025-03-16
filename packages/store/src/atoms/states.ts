import { atom } from "recoil";
import ResponseUser from "@repo/types";

type AuthState = {
  user: Record<string, typeof ResponseUser> | null;
  accessToken: string | null;
};

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    user: JSON.parse(localStorage.getItem("currentUser") || "null"),
    accessToken: localStorage.getItem("accessToken") || null,
  },
});
