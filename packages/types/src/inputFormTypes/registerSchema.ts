import { z } from "zod";

export const UserRegisterInput = z.object({
  name: z
    .string()
    .min(5, "Name must be atleast 5 characters long")
    .max(50, "Name must be atmax 50 characters long")
    .nonempty("Name name cannot be empty.")
    .trim(),
  email: z.string().email().toLowerCase().nonempty("Email name cannot be empty."),
  password: z
    .string()
    .min(8, "Password must be 8 characters long")
    .max(30, "Password must be 30 characters long")
    .nonempty("Password name cannot be empty.")
    .trim(),
  username: z
    .string()
    .min(5, "Username must be 5 characters long")
    .max(20, "Username must be 20 characters long")
    .nonempty("Username name cannot be empty.")
    .trim(),
});

export type TUserRegistrationInput = z.infer<typeof UserRegisterInput>;
