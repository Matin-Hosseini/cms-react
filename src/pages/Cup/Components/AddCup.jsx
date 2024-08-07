import { Box, Dialog, DialogContent, TextField } from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import DialogHeader from "../../../components/DialogHeader";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../../../components/SubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCup } from "../../../services/requests/cup";
import { useSnackbar } from "../../../contexts/snackbar";
import { useAuthContext } from "../../../contexts/auth";
import { addCupTitleSchema } from "../../../validations/schemas/cup";
import addCupIcon from "./../../../assets/icons/cup/trophy.png";

const AddCup = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));
  const { showSnackbar } = useSnackbar();
  const { token } = useAuthContext();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(addCupTitleSchema),
  });

  const addCupMutation = useMutation({
    mutationFn: async (data) => addCup(data),
    onSuccess: (data, variables) => {
      setOpen(false);
      reset();

      showSnackbar(`مسابقه ${variables.title} افزوده شد.`);

      queryClient.invalidateQueries(["cups"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addCupHandler = (data) => {
    addCupMutation.mutate({ token, ...data });
  };

  return (
    <div>
      <CategoryBtnBox
        title="افزودن مسابقه"
        iconSrc={addCupIcon}
        onClick={() => setOpen(true)}
        className="bg-green-500"
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
          title={"افزودن مسابقه"}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box className="w-full">
            <form action="#" onSubmit={handleSubmit(addCupHandler)}>
              <TextField
                fullWidth
                className="mb-3"
                id="title"
                label="عنوان"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                fullWidth
                className="mb-3"
                id="description"
                label="توضیحات"
                multiline
                rows={4}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <SubmitBtn
                disabled={addCupMutation.isPending}
                isSubmitting={addCupMutation.isPending}
                className="bg-teal-600"
              >
                افزودن بازی
              </SubmitBtn>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCup;
