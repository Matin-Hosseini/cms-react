import { z } from "zod";
import { phoneRegex } from "../../utils/regexs";

export const addSMSCategorySchema = z.object({
  title: z
    .string()
    .min(1, "لطفا عنوان را وارد کنید.")
    .max(15, "عنوان نمی تواند بیشتر از 15 کاراکتر باشد."),
  text: z
    .string()
    .min(1, "لطفا متن پیام را وارد کنید.")
    .max(2000, "متن پیام نمی تواند بیشتر از 1000 کاراکتر باشد."),
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
  text: z
    .string()
    .min(1, "متن پیام را وارد کنید.")
    .max(500, "متن پیام بیشتر از 500 کاراکتر نمی تواند باشد."),
  // typeOfRequest: z.string(),
  // showUrl: z.boolean(),
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

export const snedSmsWithCategory = z.object({
  text: z
    .string()
    .min(1, "لطفا یک دسته بندی را انتخاب کنید.")
    .refine((val) => val !== "-1", {
      message: "لطفا یک دسته بندی را انتخاب کنید.",
    }),
  phoneNumber: z
    .string()
    .min(1, "لطفا شماره موبایل را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل نامعتبر می باشد."),
  clientFullName: z.string(),
  typeOfRequest: z.string(),
  showUrl: z.boolean(),
});
