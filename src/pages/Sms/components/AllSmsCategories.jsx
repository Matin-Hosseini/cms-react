import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CategoryBtnBox from "../../../components/CategoryBtnBox";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import allSmsCategoriesIcon from "./../../../assets/icons/sms/all-categories.png";
import CategoriesTable from "./CategoriesTable";
import DialogHeader from "../../../components/DialogHeader";
import Api from "../../../axios/api";
import Cookies from "js-cookie";
import DataTable from "../../../components/DataTable";
import { GoTrash } from "react-icons/go";
import { useSnackbar } from "../../../contexts/snackbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSmsCategories,
  removeSmsCategory,
} from "../../../services/requests/sms";
import ThreeDotsLoading from "../../../components/ThreeDotLoading";
import WithHasPermission from "../../../HOCs/WithHasPermission";
import { CiEdit } from "react-icons/ci";
import AddSMSCategory from "./AddSmsCategory";
import SmsCategoryForm from "./SmsCategoryForm";

const AllSmsCategories = () => {
  const [open, setOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [targetSmsCategory, setTargetSmsCategory] = useState(null);

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const { showSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const { data } = useQuery({
    queryKey: ["sms-categories"],
    queryFn: async () => await getSmsCategories(token),
  });

  const removeSmsCategoryMutation = useMutation({
    mutationFn: async (data) => await removeSmsCategory(data),
    onSuccess: (data) => {
      console.log("data", data);
      showSnackbar(data.message);
      queryClient.invalidateQueries(["sms-categories"]);
      setRemoveDialog(false);
    },
    onError: (error) => {
      console.log("error", error);
      showSnackbar("خطایی رخ داده است.");
      setRemoveDialog(false);
    },
  });

  const columns = [
    { field: "title", headerName: "عنوان", width: 250, editable: false },
    { field: "text", headerName: "متن پیام", width: 500, editable: false },
    {
      field: "description",
      headerName: "توضیحات",
      width: 200,
      editable: false,
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 200,
      renderCell: (params) => {
        const handleDelete = async () => {};

        return (
          <>
            <WithHasPermission permissions={["EditTextMessage"]}>
              <Button
                onClick={() => {
                  setEditDialog(true);
                  setTargetSmsCategory(params.row);
                }}
                color="warning"
                variant="text"
                startIcon={<CiEdit />}
              >
                ویرایش
              </Button>
            </WithHasPermission>
            <WithHasPermission permissions={["RemoveTextMessage"]}>
              <IconButton
                color="error"
                onClick={() => {
                  setRemoveDialog(true);
                  setTargetSmsCategory(params.row);
                }}
              >
                <GoTrash />
              </IconButton>
            </WithHasPermission>
          </>
        );
      },
    },
  ];

  const removeSmsCatgoryHandler = async () => {
    removeSmsCategoryMutation.mutate({
      token,
      panelSms_ID: targetSmsCategory.message_ID,
    });
  };

  return (
    <div>
      <CategoryBtnBox
        title="دسته بندی های پیامک"
        iconSrc={allSmsCategoriesIcon}
        onClick={() => setOpen(true)}
        className="bg-violet-400"
      />
      <Dialog
        fullScreen={isBelowMd}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth={"xl"}
        sx={{
          "& .MuiDialog-container .MuiPaper-root": { height: "100%" },
        }}
      >
        <DialogHeader
          title={"دسته بندی های پیامک"}
          onClose={() => setOpen(false)}
          belowMediaQuery={isBelowMd}
        />
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <DataTable
              columns={columns}
              rows={data?.result?.messages || []}
              custom_ID={"message_ID"}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={removeDialog} onClose={() => setRemoveDialog(false)}>
        <DialogTitle id="alert-dialog-title">حذف دسته بندی پیام</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا از حذف دسته بندی مورد نظر اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setRemoveDialog(false)}>
            خیر
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={removeSmsCatgoryHandler}
            sx={{ height: "37px" }}
          >
            {removeSmsCategoryMutation.isPending ? (
              <ThreeDotsLoading color={"#fff"} />
            ) : (
              "بله"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth={"sm"}
      >
        <DialogHeader
          title={"ویرایش دسته بندی پیام"}
          onClose={() => setEditDialog(false)}
          belowMediaQuery={isBelowMd}
        />

        <DialogContent>
          <SmsCategoryForm defaultSmsCategory={targetSmsCategory} />
          <Button
            sx={{ mt: "0.75rem" }}
            fullWidth
            color="primary"
            onClick={() => setEditDialog(false)}
          >
            انصراف
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllSmsCategories;
