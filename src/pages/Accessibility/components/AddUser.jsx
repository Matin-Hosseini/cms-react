import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import addUserIcon from "./../../../assets/images/icons/add-user.png";
import DialogHeader from "../../../components/DialogHeader";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { Controller, useForm } from "react-hook-form";
import SubmitBtn from "../../../components/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "../../../contexts/snackbar";
import Cookies from "js-cookie";
import { addUserSchema } from "../../../validations/schemas/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../../services/requests/users";
import { getAllRoles } from "../../../services/requests/role";

const AddUser = ({ roles }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addUserSchema) });

  const roleQuery = useQuery({
    queryKey: ["roles"],
    queryFn: async () => await getAllRoles(token),
  });

  const mutation = useMutation({
    mutationFn: async (data) => await addUser(data),
    onSuccess: (data) => {
      reset();
      showSnackbar("کاربر جدید افزوده شد.");

      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      showSnackbar("خطا در ارسال اطلاعات.", "error");
    },
  });

  const submitHandler = async ({ userName, password, role_ID }) => {
    mutation.mutate({
      token,
      userName,
      password,
      role_ID: +role_ID,
    });
  };

  return (
    <>
      <CategoryBtnBox
        title="افزودن کاربر جدید"
        iconSrc={addUserIcon}
        onClick={() => setOpen(true)}
        className="bg-neutral-400"
      />
      <Dialog
        fullScreen={isBelowMd}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={"md"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={"افزودن کاربر جدید"}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box className="w-full">
            <form
              action="#"
              className=""
              onSubmit={handleSubmit(submitHandler)}
            >
              <FormControl className="mb-3" error={!!errors.role_ID} fullWidth>
                <InputLabel id="role-select">نقش</InputLabel>
                <Controller
                  name="role_ID"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <Select labelId="role-select" label="Role" {...field}>
                      {roleQuery.data?.result.roles.map((role) => (
                        <MenuItem key={role.id} value={role.id.toString()}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {!!errors.role_ID && errors.role_ID.message}
                </FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                className="mb-3"
                id="userName"
                label="نام کاربری"
                {...register("userName")}
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
              <TextField
                fullWidth
                className="mb-3"
                id="password"
                label="رمز عبور"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <SubmitBtn isSubmitting={mutation.isPending}>
                افزودن کاربر
              </SubmitBtn>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUser;
