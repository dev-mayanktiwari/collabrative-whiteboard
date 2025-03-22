import { z } from "zod";

export const UserLoginInput = z.object({
  identifier: z.string().trim().nonempty("Identifier name cannot be empty."),
  password: z.string().trim().nonempty("Password name cannot be empty."),
});

export type TUserLoginInput = z.infer<typeof UserLoginInput>;
