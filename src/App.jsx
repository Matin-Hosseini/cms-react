import { Suspense, useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AddNewCustomer from "./components/AddNewCustomer";
import Table from "./components/Table";

import routes from "./routes";
import { redirect, useLocation, useRoutes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { faIR } from "@mui/material/locale";
import axios from "axios";
import Cookies from "js-cookie";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/login";
import { useAuthContext } from "./contexts/auth";
import favicon from "./assets/images/logo/favicon.webp";
import GlobalLoading from "./components/GlobalLoading";
console.log(favicon);

function App() {
  const [isSidbarOpen, setIsSidebarOpen] = useState(false);

  const router = useRoutes(routes);

  const theme = createTheme(
    {
      direction: "rtl",
      palette: {
        // mode: outerTheme.palette.mode,
      },
      typography: {
        fontFamily: `shabnam`,
      },
    },
    faIR
  );

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "پنل شطرنج";

    let link = document.createElement("link");
    link.rel = "icon";
    const head = document.querySelector("head");
    console.log(head);
    head.insertAdjacentHTML(
      "beforeend",
      `
        <link rel="icon" type="webp" href="http://localhost:5174${favicon}">
      `
    );

    //  link.href = favicon;
  }, []);

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <ScrollToTop />
          {pathname === "/login" ? (
            <Login />
          ) : (
            <div className="grid grid-cols-[300px_1fr]">
              <Sidebar
                isOpen={isSidbarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />

              <div className="main-wrapper col-span-2 lg:col-start-2">
                <Header onSidebar={() => setIsSidebarOpen(true)} />
                <main className="main">
                  <div className="content">
                    <Suspense fallback={<GlobalLoading />}>{router}</Suspense>
                  </div>
                </main>
              </div>
            </div>
          )}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
