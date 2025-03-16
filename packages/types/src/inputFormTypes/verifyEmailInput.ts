import { z } from "zod";

export const VerifyEmailInput = z.object({
  token: z.string(),
  code: z.string(),
});

export type TVerifyEmailInput = z.infer<typeof VerifyEmailInput>;
