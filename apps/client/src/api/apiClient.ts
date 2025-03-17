import { TUserRegistrationInput } from "@repo/types";
import api from "./api";

export default {
  register: async (data: TUserRegistrationInput) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  verifyEmail: async (token: string, code: string) => {
    const response = await api.put(
      `/auth/verify-email?token=${token}&code=${code}`
    );
    return response.data;
  },

  self: async () => {
    const response = await api.get("/auth/self");
    return response.data;
  },

  logout: async () => {
    const response = await api.put("/auth/logout");
    return response.data;
  },
};
