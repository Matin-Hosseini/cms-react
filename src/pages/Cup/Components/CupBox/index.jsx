import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import trophyImg from "./../../../../assets/images/cup/trophy.png";
import { BiTrashAlt } from "react-icons/bi";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCupItem,
  getCupItems,
  removeCup,
} from "../../../../services/requests/cup";
import { useAuthContext } from "../../../../contexts/auth";
import { useSnackbar } from "../../../../contexts/snackbar";
import ThreeDotsLoading from "../../../../components/ThreeDotLoading";
import { CiMenuKebab } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import DialogHeader from "../../../../components/DialogHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SubmitBtn from "../../../../components/SubmitBtn";

const CupBox = ({ title, description, id }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addCupItemDialog, setAddCupItemDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const cupMenu = Boolean(anchorEl);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { token } = useAuthContext();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const deleteCupMutation = useMutation({
    mutationFn: async (data) => removeCup(data),
    onSuccess: () => {
      showSnackbar(`کاپ ${title} حذف شد.`);

      queryClient.invalidateQueries(["cups"]);
    },
    onError: () => {
      showSnackbar("خطا در برقراری ارتباط", "error");
    },
  });

  const deleteCup = () => {
    deleteCupMutation.mutate({ token, cap_ID: id });
  };

  const addNewCupItemHandler = () => {
    setAddCupItemDialog(true);
  };

  const schema = z.object({
    titleItem: z
      .string()
      .min(1, "لطفا عنوان رده بندی را وارد کنید.")
      .min(3, "عنوان رده بندی باید حداقل 3 کاراکتر باشد.")
      .max(20, "عنوان رده بندی باید حداکثر 20 کاراکتر باشد."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const addCupItemMutation = useMutation({
    mutationFn: async (data) => addCupItem(data),
    onSuccess: () => {
      setAddCupItemDialog(false);
      setAnchorEl(null);
      reset();
      showSnackbar(`رده بندی افزوده شد.`);
    },
    onError: () => {
      showSnackbar(`خطا در ارسال اطلاعات`, "error");
    },
  });
  const cupDetailsMutation = useMutation({
    mutationFn: async (data) => await getCupItems(data),
    onError: (error) => {
      console.log(error);
    },
  });

  const submitCupItem = ({ titleItem }) => {
    addCupItemMutation.mutate({ token, titleItem, typeOfRegister_ID: id });
  };

  const handleCupDetails = () => {
    setDetailsDialog(true);

    cupDetailsMutation.mutate({ token, typeOfRegister_ID: id });
  };

  return (
    <>
      <div className="border rounded-lg flex flex-col gap-3 items-center justify-between p-4 relative">
        <div className="absolute z-30 top-2 right-0">
          <IconButton onClick={handleClick}>
            <CiMenuKebab />
          </IconButton>
        </div>
        <Menu
          id="cup-menu"
          anchorEl={anchorEl}
          open={cupMenu}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem className="w-48" onClick={() => setDeleteDialog(true)}>
            <div className="flex items-center gap-2 text-red-400">
              <BiTrashAlt />
              حذف کاپ
            </div>
          </MenuItem>
          <MenuItem className="w-48" onClick={addNewCupItemHandler}>
            <div className="flex items-center gap-2">
              <BiCategoryAlt />
              افزودن رده بندی
            </div>
          </MenuItem>
        </Menu>
        <img src={trophyImg} alt={title} className="max-w-40" />
        <h2 className="text-xl">{title}</h2>
        <p className="text-sm line-clamp-1 text-gray-600">{description}</p>
        <Button
          startIcon={<TbListDetails />}
          variant="contained"
          className="bg-blue-500 text-sm"
          fullWidth
          onClick={handleCupDetails}
        >
          جزئیات
        </Button>
      </div>

      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <p className="mb-3">آیا از حذف کاپ {title} اطمینان دارید؟</p>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDeleteDialog(false)}>
            انصراف
          </Button>
          <Button
            variant="contained"
            className="bg-red-500 w-[80px] h-[36.5px]"
            onClick={deleteCup}
            disabled={deleteCupMutation.isPending}
          >
            {deleteCupMutation.isPending ? (
              <ThreeDotsLoading color="white" />
            ) : (
              "بله"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addCupItemDialog}
        onClose={() => setAddCupItemDialog(false)}
        fullWidth
        maxWidth={"sm"}
        fullScreen={isBelowMd}
      >
        <DialogHeader
          belowMediaQuery={isBelowMd}
          onClose={() => setAddCupItemDialog(false)}
          title={`افزودن رده بندی کاپ ${title}`}
        />
        <DialogContent>
          <form action="#" onSubmit={handleSubmit(submitCupItem)}>
            <TextField
              fullWidth
              className="mb-3"
              id="item-title"
              label="عنوان رده بندی"
              {...register("titleItem")}
              error={!!errors.titleItem}
              helperText={errors.titleItem?.message}
            />
            <SubmitBtn isSubmitting={addCupItemMutation.isPending}>
              افزودن ره بندی
            </SubmitBtn>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={detailsDialog}
        onClose={() => setDetailsDialog(false)}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <p className="mb-5">جزئیات کاپ {title}</p>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>رده بندی ها</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!cupDetailsMutation.data?.result ? (
                  <TableRow>
                    <TableCell>هنوز رده بندی قرار نگرفته است.</TableCell>
                  </TableRow>
                ) : (
                  cupDetailsMutation.data?.result.capItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CupBox;
