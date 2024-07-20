import nationalCodeValidation from "./../../utils/funcs/nationalCodeValidation";
import { phoneRegex } from "./../../utils/regexs";
import { z } from "zod";

export const newCustomerSchema = {
  firstName: z.string().min(1, "نام الزامی است."),
  lastName: z.string().min(1, "نام خانوادگی الزامی است. "),
  nationalCode: z
    .string()
    .min(1, "کد ملی الزامی است.")
    .refine(nationalCodeValidation, "نام کد ملی معتبر نیست."),
  phoneNumber: z
    .string()
    .min(1, "شماره موبایل الزامی است.")
    .regex(phoneRegex, "شماره موبایل نامعتبر است."),
};
