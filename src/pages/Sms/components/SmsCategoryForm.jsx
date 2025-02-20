import { TextField } from "@mui/material";
import SubmitBtn from "../../../components/SubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../../../contexts/snackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSMSCategorySchema } from "../../../validations/schemas/panelSms";
import { useAuthContext } from "../../../contexts/auth";
import { useForm } from "react-hook-form";
import {
  addSmsCategory,
  editSmsCategory,
} from "../../../services/requests/sms";

const SmsCategoryForm = ({ defaultSmsCategory }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { token } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addSMSCategorySchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (defaultSmsCategory) {
        return await editSmsCategory(data);
      }
      return await addSmsCategory(data);
    },
    onSuccess: (data, variables) => {
      showSnackbar(
        `دسته بندی ${variables.title} ${
          defaultSmsCategory ? "ویرایش" : "افزوده"
        } شد.`
      );
      queryClient.invalidateQueries(["sms-categories"]);
      !defaultSmsCategory && reset();
    },
    onError: (error) => {
      showSnackbar(
        error?.response?.data?.title || "خطا در ارسال اطلاعات.",
        "error"
      );
    },
  });

  const submitHandler = async (data) => {
    const mutationData = defaultSmsCategory
      ? {
          token,
          ...data,
          categoryId: defaultSmsCategory.message_ID,
        }
      : {
          token,
          ...data,
          typeOfSms: 0,
        };

    mutation.mutate(mutationData);
  };

  return (
    <form action="#" onSubmit={handleSubmit(submitHandler)} className="mt-5">
      <TextField
        fullWidth
        defaultValue={defaultSmsCategory?.title || ""}
        className="mb-3"
        id="title"
        label="عنوان"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        fullWidth
        defaultValue={defaultSmsCategory?.text || ""}
        className="mb-3"
        multiline
        rows={10}
        id="text"
        label="متن پیام"
        {...register("text")}
        error={!!errors.text}
        helperText={errors.text?.message}
      />

      <TextField
        fullWidth
        defaultValue={defaultSmsCategory?.description || ""}
        className="mb-3"
        id="description"
        label="توضیحات"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <SubmitBtn isSubmitting={mutation.isPending}>ثبت</SubmitBtn>
    </form>
  );
};

export default SmsCategoryForm;
