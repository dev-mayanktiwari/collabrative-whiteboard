import { z } from "zod";

export const VerifyEmailInput = z.object({
  token: z.string().nonempty("Token cannot be empty."),
  code: z.string().nonempty("Code cannot be empty."),
});

export type TVerifyEmailInput = z.infer<typeof VerifyEmailInput>;
