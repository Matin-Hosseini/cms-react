import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SubmitBtn from "../../components/SubmitBtn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertLoan } from "../../services/requests/calculator";
import { useAuthContext } from "../../contexts/auth";
import { useSnackbar } from "../../contexts/snackbar";

const localString = (string) => {
  string = string.replace(/[,]/g, "");

  string = Number(e.target.value).toLocaleString().toString();
  return string;
};

export default function Calculator() {
  const schema = z.object({
    name: z.string().min(1, "نام الزامی است."),
    creditScore: z.number().gte(0).lte(3),
    paymentNumber: z.string().min(1, "تعداد اقساط الزامی است."),
    increasedPrice: z.string().min(1, " قیمت افزایش یافته الزامی است."),
    loanMargin: z.string().min(1, "   سود وام الزامی است."),
    downPayment: z.string().min(1, " پیش پرداخت الزامی است."),
  });

  const { showSnackbar } = useSnackbar();
  const { token } = useAuthContext();

  const mutation = useMutation({
    mutationFn: async (data) => await insertLoan(data),
  });

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const submitHandler = async (data) => {
    mutation.mutate(
      {
        ...data,
        paymentNumber: data.paymentNumber,
        increasedPrice: data.increasedPrice,
        loanMargin: data.loanMargin,
        downPayment: data.downPayment,
        token,
      },
      {
        onSuccess: (data) => {
          showSnackbar("افزوده شد");
          console.log(data);

          reset();
        },
        onError: (error) => {
          console.log(error);
          showSnackbar("خطایی رخ داده است.", "error");
        },
      }
    );
  };

  return (
    <div className="max-w-[500px] mx-auto">
      <form action="" onSubmit={handleSubmit(submitHandler)}>
        <TextField
          fullWidth
          className="mb-5"
          id="name"
          label="نام"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <FormControl fullWidth className="mb-5">
          <InputLabel>گرید اعتباری</InputLabel>
          <Controller
            name="creditScore"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Select {...field} label="creditScore">
                <MenuItem value={0}>A</MenuItem>
                <MenuItem value={1}>B</MenuItem>
                <MenuItem value={2}>AB</MenuItem>
                <MenuItem value={3}>C</MenuItem>
              </Select>
            )}
          />
          <FormHelperText error={true}>
            {errors.creditScore?.message}
          </FormHelperText>
        </FormControl>
        <TextField
          fullWidth
          className="mb-5"
          id="phone"
          label="تعداد اقساط"
          {...register("paymentNumber")}
          // onChange={(e) => {
          //   e.target.value = e.target.value.replace(/[,]/g, "");
          //   console.log(Number(e.target.value).toLocaleString().toString());
          //   e.target.value = Number(e.target.value).toLocaleString().toString();

          //   if (e.target.value === "0") {
          //     e.target.value = "";
          //   }
          // }}
          error={!!errors.paymentNumber}
          helperText={errors.paymentNumber?.message}
        />
        <TextField
          fullWidth
          className="mb-5"
          id="phone"
          label="قیمت افزایش یافته"
          {...register("increasedPrice")}
          error={!!errors.increasedPrice}
          helperText={errors.increasedPrice?.message}
        />
        <TextField
          fullWidth
          className="mb-5"
          id="phone"
          label="سود وام"
          {...register("loanMargin")}
          error={!!errors.loanMargin}
          helperText={errors.loanMargin?.message}
        />
        <TextField
          fullWidth
          className="mb-5"
          id="phone"
          label="پیش پرداخت "
          {...register("downPayment")}
          error={!!errors.downPayment}
          helperText={errors.downPayment?.message}
        />
        <SubmitBtn>ثبت</SubmitBtn>
      </form>
    </div>
  );
}
