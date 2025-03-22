import { z } from "zod";

export const ForgotUserInput = z.object({
  email: z.string().email().trim().nonempty("Email name cannot be empty."),
});

export type TForgotUserInput = z.infer<typeof ForgotUserInput>;
