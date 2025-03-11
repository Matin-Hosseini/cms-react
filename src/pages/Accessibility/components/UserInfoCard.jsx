import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "../../../contexts/snackbar";

const UserInfoCard = ({ permissions, role_Name, userName, image }) => {
  const [open, setOpen] = useState(false);
  const [permission, setPermission] = useState(null);
  const { showSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (permission) => {
    setPermission(permission);
    console.log(permission);
    setOpen(true);
  };

  const removePermission = () => {
    showSnackbar("این بخش در حال تکمیل شدن می باشد.");
  };

  return (
    <>
      <div className=" border flex flex-col items-center mt-6 mx-auto p-6">
        <Avatar src={image} alt={userName} sx={{ width: 80, height: 80 }}>
          {userName.charAt(0)}
        </Avatar>
        <h2 className="mb-5 mt-2">{userName}</h2>
        <div className="bg-violet-100 text-violet-500 inline-block py-1 px-2 rounded-md text-sm mb-2">
          {role_Name}
        </div>
        <div>
          <h3 className="mb-4 text-center">دسترسی ها:</h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {permissions.map((permission) => (
              <Chip
                key={permission.id}
                label={permission.name}
                onDelete={() => handleOpen(permission)}
                sx={{
                  background: "#e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "& span": { mt: "4px", display: "block" },
                }}
              />
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box width={"100%"}>
            <p>
              آیا از حذف دسترسی {permission?.name} از کاربر {userName} اطمینان
              دارید؟
            </p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="success">
            انصراف
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ px: 3 }}
            onClick={removePermission}
          >
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserInfoCard;
