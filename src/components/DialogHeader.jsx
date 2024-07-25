import { Box, DialogTitle, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";

const DialogHeader = ({ title, onClose, belowMediaQuery }) => {
  return (
    <Box className="flex items-center justify-between">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <IconButton onClick={onClose} className="ml-4">
        {belowMediaQuery ? <TbArrowBackUp /> : <IoClose />}
      </IconButton>
    </Box>
  );
};

export default DialogHeader;
