import { Alert, IconButton, Snackbar } from "@mui/material";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IoMdClose } from "react-icons/io";

export const SnackbarContext = createContext(null);

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(
    () => ({ showSnackbar, hideSnackbar }),
    [showSnackbar, hideSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={hideSnackbar}
        // anchorOrigin={}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
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
