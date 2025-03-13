import { z } from "zod";

export const ResetSetNewPasswordInput = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be 8 characters long")
    .max(30, "Password must be 30 characters long")
    .trim(),
});

export type TResetSetNewPasswordInput = z.infer<
  typeof ResetSetNewPasswordInput
>;
