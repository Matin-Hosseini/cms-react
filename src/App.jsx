import { Suspense, useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import routes from "./routes";
import { useLocation, useRoutes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/login";
import favicon from "./assets/images/logo/favicon.webp";
import GlobalLoading from "./components/GlobalLoading";

function App() {
  const [isSidbarOpen, setIsSidebarOpen] = useState(false);

  const router = useRoutes(routes);

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
    </>
  );
}

export default App;
