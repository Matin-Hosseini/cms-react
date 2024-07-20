import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteDialog = ({ show, onDialogClose, row, onDelete }) => {
  return (
    <Dialog
      sx={{ backgroundColor: "#rgba(0,0,0,0.3)" }}
      open={show}
      onClose={onDialogClose}
    >
      <DialogTitle>حذف کاربر</DialogTitle>
      <DialogContent>
        <DialogContentText>
          آیا از حذف {row.name} اطمینان دارید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" variant="outlined" onClick={onDialogClose}>
          لغو
        </Button>
        <Button color="error" variant="contained" onClick={onDelete}>
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
