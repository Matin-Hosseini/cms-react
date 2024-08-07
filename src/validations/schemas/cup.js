import { z } from "zod";

export const addCupTitleSchema = z.object({
  title: z.string().min(1, "لطفا عنوان را وارد کنید."),
  description: z.string().min(1, "لطفا توضیحات را وارد کنید."),
});
