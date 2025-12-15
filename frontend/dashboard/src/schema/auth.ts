import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password must be Provided"),
});

export const RegisterSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string().min(1, "Role is required"),
  userName: z.string().min(1, "Username is required"),
});

export type LoginRequestSchema = z.infer<typeof LoginSchema>;
export type RegisterRequestSchema = z.infer<typeof RegisterSchema>;
