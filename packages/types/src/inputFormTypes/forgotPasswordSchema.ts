import { z } from "zod";

export const ForgotUserInput = z.object({
  email: z.string().email(),
});

export type TForgotUserInput = z.infer<typeof ForgotUserInput>;
