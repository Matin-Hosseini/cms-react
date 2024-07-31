import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, "نام کاربری الزامی است."),
  password: z.string().min(1, "رمز عبور الزامی است."),
  remember_me: z.boolean(),
});

export const getUserInformationSchema = z.object({
  userName: z.string().min(1, "نام کاربری الزامی است."),
});

export const addUserSchema = z.object({
  userName: z.string().min(1, "نام کاربری الزامی است."),
  password: z.string().min(1, "رمز عبور الزامی است."),
  role_ID: z.string().min(1, "لطفا نقش را انتخاب کنید."),
});
