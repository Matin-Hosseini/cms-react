import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import trophyImg from "./../../../../assets/images/cup/trophy.png";
import { BiTrashAlt } from "react-icons/bi";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCup } from "../../../../services/requests/cup";
import { useAuthContext } from "../../../../contexts/auth";
import { useSnackbar } from "../../../../contexts/snackbar";
import ThreeDotsLoading from "../../../../components/ThreeDotLoading";
import { CiMenuKebab } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

const CupBox = ({ title, description, id }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const cupMenu = Boolean(anchorEl);
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
          <MenuItem className="w-48">
            <div className="flex items-center gap-2">
              <BiCategoryAlt />
              رده بندی
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
    </>
  );
};

export default CupBox;
