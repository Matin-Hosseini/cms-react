import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import SnackbarProvider from "./contexts/snackbar.jsx";
import MuiProvider from "./contexts/mui.jsx";
import UserProvider from "./contexts/user.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <MuiProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </MuiProvider>
        </UserProvider>
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </BrowserRouter>
);
