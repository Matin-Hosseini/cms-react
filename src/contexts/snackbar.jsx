import { IconButton, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";

export const SnackbarContext = createContext(null);

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");

  const showSnackbar = (title) => {
    setOpen(true);
    setSnackbarTitle(title);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={snackbarTitle}
        action={
          <IconButton color="inherit" onClick={() => setOpen(false)}>
            <IoMdClose />
          </IconButton>
        }
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new error(
      "SnackbarContext values are only accessed inside SnackbarProvider!"
    );
  }

  return context;
};
