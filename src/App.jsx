import { Suspense, useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import routes from "./routes";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/login";
import favicon from "./assets/images/logo/favicon.webp";
import GlobalLoading from "./components/GlobalLoading";
import "./../data";
import { useAuthContext } from "./contexts/auth";
import Test from "./components/Test";
import { LuShieldCheck } from "react-icons/lu";

function App() {
  const [isSidbarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthContext();

  const router = useRoutes(routes);

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "پنل ایران اورجینال";
    navigate("/sms");
  }, []);

  useEffect(() => {
    if (isSidbarOpen) setIsSidebarOpen(false);
  }, [location]);

  return (
    <>
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
            <main className="main min-h-[calc(100dvh-104px)]">
              <div className="content">
                <Suspense fallback={<GlobalLoading />}>{router}</Suspense>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
