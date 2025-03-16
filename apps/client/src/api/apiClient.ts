import { TUserRegistrationInput } from "@repo/types";
import api from "./api";

export default {
  register: async (data: TUserRegistrationInput) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
};
