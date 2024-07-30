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
});

export const sendListSmsToAnyOneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "لطفا شماره موبایل را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل نامعتبر می باشد."),
});