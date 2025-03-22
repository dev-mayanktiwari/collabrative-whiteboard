import { z } from "zod";

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().trim().nonempty("Old password name cannot be empty."),
  newPassword: z
    .string()
    .min(8, "Password must be 8 characters long")
    .max(30, "Password must be 30 characters long")
    .nonempty("New password name cannot be empty.")
    .trim(),
});

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
