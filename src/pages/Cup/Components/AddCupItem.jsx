import { Box, Dialog, DialogContent } from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import DialogHeader from "../../../components/DialogHeader";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/auth";
import { useSnackbar } from "../../../contexts/snackbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import addCupItemImg from "./../../../assets/icons/cup/add-item.png";

const AddCupItem = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const { showSnackbar } = useSnackbar();
  const { token } = useAuthContext();
  const queryClient = useQueryClient();

  return (
    <div>
      <CategoryBtnBox
        title="افزودن رده بندی کاپ"
        iconSrc={addCupItemImg}
        onClick={() => setOpen(true)}
        className="bg-orange-500"
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
          title={"افزودن رده بندی کاپ"}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box className="w-full">
            <form action="#">
              {/* <TextField
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
              </SubmitBtn> */}
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCupItem;

export const myObj = {
    customer_ID: 837,
    firstName: "سید متین ",
    lastName: "حسینی ",
    phoneNumber: "09129323541",
    nationalCode: "0200040431",
    games: [
      {
        id: 846,
        name: "fc24",
        message: null,
        games: [
          {
            game_ID: 26,
            timePresent: "1403/06/04",
            hourPresent: "13",
            isPresentOnTime: 0,
            isWinner: false,
          },
          {
            game_ID: 27,
            timePresent: "1403/06/05",
            hourPresent: "14",
            isPresentOnTime: 0,
            isWinner: false,
          },
        ],
        trackingCode: 0,
      },
      {
        id: 848,
        name: "chess",
        message: null,
        games: [
          {
            game_ID: 26,
            timePresent: "1403/06/04",
            hourPresent: "13",
            isPresentOnTime: 0,
            isWinner: false,
          },
          {
            game_ID: 27,
            timePresent: "1403/06/05",
            hourPresent: "14",
            isPresentOnTime: 0,
            isWinner: true,
          },
        ],
        trackingCode: 0,
      },
    ],
  };