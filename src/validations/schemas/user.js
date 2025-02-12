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
  userName: z
    .string()
    .min(1, "نام کاربری الزامی است.")
    .max(15, "نام کاربری باید کمتر از 15 کاراکتر باشد."),
  password: z.string().min(1, "رمز عبور الزامی است."),
  role_ID: z.string().min(1, "لطفا نقش را انتخاب کنید."),
});

export const userProfileInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "نام الزامی می باشد.")
    .regex(/^[^\w\d]+$/, "نام نمی تواند شامل حروف انگلیسی باشد."),
  // .regex(/\d/, "نام نمی تواند شامل عدد باشد."),

  lastName: z
    .string()
    .min(1, "نام خانوادگی الزامی می باشد.")
    .regex(/^[^\w\d]+$/, "نام خانوادگی نمی تواند شامل حروف انگلیسی باشد."),
  // .regex(/\d/, "نام خانوادگی نمی تواند شامل عدد باشد."),

  internalNumber: z
    .string()
    .min(1, "شماره داخلی الزامی می باشد.")
    .regex(/^\d+$/, "شماره داخلی نمی تواند غیر عدد باشد."),

  unitWork: z
    .string()
    .min(1, "نام واحد الزامی می باشد.")
    .regex(/^[^\w\d]+$/, "نام واحد نمی تواند شامل حروف انگلیسی باشد."),

  gender: z.string().refine((value) => value === "0" || value === "1", {
    message: "لطفا جنسیت خود را انتخاب کنید.",
  }),
});
