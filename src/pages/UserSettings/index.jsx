import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { userProfileInfoSchema } from "../../validations/schemas/user";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SubmitBtn from "../../components/SubmitBtn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editUserProfile, getUserProfile } from "../../services/requests/users";
import { useAuthContext } from "../../contexts/auth";
import UserInfoFormSkeleton from "../../components/Skeletons/UserInfoForm";
import { useSnackbar } from "../../contexts/snackbar";

export default function UserSettings() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    resolver: zodResolver(userProfileInfoSchema),
  });

  const { showSnackbar } = useSnackbar();

  const { token } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["profile-info"],
    queryFn: async () => await getUserProfile(token),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await editUserProfile(data),
    onSuccess: (data) => {
      showSnackbar(data.message);
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });

  const submitHandler = async (data) => {
    mutation.mutate({ ...data, gender: +data.gender, token });
  };

  return (
    <>
      {isLoading ? (
        <div className="max-w-[600px] mx-auto">
          <UserInfoFormSkeleton />
        </div>
      ) : (
        <form
          action=""
          className="max-w-[600px] mx-auto"
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextField
            fullWidth
            defaultValue={data.result.firstName}
            className="mb-3"
            id="phone"
            label="نام"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            fullWidth
            defaultValue={data.result.lastName}
            className="mb-3"
            id="phone"
            label="نام خانوادگی"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            fullWidth
            defaultValue={data.result.internalNumber}
            className="mb-3"
            id="phone"
            label="شماره داخلی"
            {...register("internalNumber")}
            error={!!errors.internalNumber}
            helperText={errors.internalNumber?.message}
          />
          <FormControl fullWidth className="mb-3" error={!!errors.gender}>
            <InputLabel id="gender">جنسیت</InputLabel>
            <Controller
              name="gender"
              defaultValue={data.result.gender.toString()}
              control={control}
              render={({ field }) => (
                <Select labelId="message-category" label="جنسیت" {...field}>
                  <MenuItem value={"-1"}>انتخاب کنید</MenuItem>
                  <MenuItem value={"0"}>زن</MenuItem>
                  <MenuItem value={"1"}>مرد</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>
              {!!errors.gender && errors.gender.message}
            </FormHelperText>
          </FormControl>
          <SubmitBtn
            type="submit"
            isSubmitting={mutation.isPending}
            disabled={mutation.isPending}
          >
            ویرایش اطلاعات
          </SubmitBtn>
        </form>
      )}
    </>
  );
}
