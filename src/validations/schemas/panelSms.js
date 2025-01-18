import { z } from "zod";
import { phoneRegex } from "../../utils/regexs";

export const addSMSCategorySchema = z.object({
  title: z.string().min(1, "لطفا عنوان را وارد کنید."),
  text: z.string().min(1, "لطفا متن پیام را وارد کنید."),
  description: z.string().min(1, "لطفا توضیحات را وارد کنید."),
});

export const sendSMSSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "لطفا شماره موبایل را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل معتبر نمی باشد."),
});

export const sendSmsToAnyoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "لطفا شماره موبایل را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل نامعتبر می باشد."),
  text: z.string(),
});

export const sendListSmsToAnyOneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "لطفا شماره موبایل را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل نامعتبر می باشد."),
  text: z.string().min(1, "دسته بندی پیام الزامی می باشد."),
});

export const sendCallCenterSmsSchema = z.object({
  firstName: z
    .string()
    .min(1, "نام الزامی می باشد.")
    .regex(/^[^\w\d]+$/, "نام نمی تواند شامل حروف انگلیسی باشد."),
  lastName: z
    .string()
    .min(1, "نام خانوادگی الزامی می باشد.")
    .regex(/^[^\w\d]+$/, "نام خانوادگی نمی تواند شامل حروف انگلیسی باشد."),
  phoneNumber: z
    .string()
    .min(1, "لطفا شماره موبایل را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل نامعتبر می باشد."),
});