import { zodResolver } from "@hookform/resolvers/zod";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SubmitBtn from "../../../components/SubmitBtn";
import { snedSmsWithCategory } from "../../../validations/schemas/panelSms";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSmsCategories,
  sendSmsWithCategory,
} from "../../../services/requests/sms";
import { useAuthContext } from "../../../contexts/auth";
import { useSnackbar } from "../../../contexts/snackbar";
import { TfiFaceSad } from "react-icons/tfi";

const SendSmsWithCategory = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(snedSmsWithCategory) });

  const { token } = useAuthContext();

  const { data: categoriesResult, isFetching } = useQuery({
    queryKey: ["sms-categories"],
    queryFn: async () => await getSmsCategories(token),
  });

  const { showSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: async (data) => await sendSmsWithCategory(data),
    onSuccess: () => {
      showSnackbar("پیام ارسال شد.");
      reset();
    },
    onError: (error) => {
      showSnackbar(error.response.data.title, "error");
    },
  });

  const submitHandler = async (data) => {
    const categoryText = categoriesResult?.result?.messages.find(
      (category) => category.message_ID === +data.text
    ).text;

    const mutationData = {
      ...data,
      token,
      typeOfRequest: +data.typeOfRequest,
      text: categoryText,
    };

    mutation.mutate(mutationData);
  };

  return (
    <form action="#" onSubmit={handleSubmit(submitHandler)} className="mt-5">
      <TextField
        fullWidth
        className="mb-3"
        id="phone"
        label="نام کامل مشتری"
        {...register("clientFullName")}
        error={!!errors.clientFullName}
        helperText={errors.clientFullName?.message}
      />

      <TextField
        fullWidth
        className="mb-3"
        id="phone"
        label="شماره موبایل"
        {...register("phoneNumber")}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />

      {!categoriesResult?.result?.messages.length && (
        <div className="text-red-400 flex items-center gap-3 justify-center p-4 border border-red-400 border-dashed">
          <TfiFaceSad />
          <h2>هیچ دسته بندی پیامی وجود ندارد.</h2>
        </div>
      )}

      {categoriesResult?.result?.messages.length > 0 && (
        <FormControl fullWidth error={!!errors.text}>
          <InputLabel id="sms-category-select">دسته بندی پیام</InputLabel>
          <Controller
            defaultValue={"-1"}
            name="text"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="sms-category-select"
                label="دسته بندی پیام"
              >
                <MenuItem value="-1">انتخاب کنید</MenuItem>
                {categoriesResult?.result?.messages.map((message) => (
                  <MenuItem
                    key={message.message_ID}
                    value={`${message.message_ID}`}
                  >
                    {message.title}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.text && (
            <FormHelperText>{errors.text.message}</FormHelperText>
          )}
        </FormControl>
      )}

      <Controller
        name="typeOfRequest"
        control={control}
        defaultValue="0"
        render={({ field }) => (
          <RadioGroup
            {...field}
            className="flex flex-row items-center gap-3 justify-items-start"
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="ارسال کارشناس مربوطه"
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="ارسال واحد مربوطه"
            />
          </RadioGroup>
        )}
      />

      <Controller
        name="showUrl"
        control={control}
        defaultValue={true}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} defaultChecked/>}
            label="ارسال لینک سایت"
          />
        )}
      />

      <SubmitBtn
        isSubmitting={mutation.isPending}
        disabled={
          isFetching ||
          !categoriesResult?.result?.messages.length ||
          mutation.isPending ||
          false
        }
      >
        ارسال
      </SubmitBtn>
    </form>
  );
};

export default SendSmsWithCategory;
