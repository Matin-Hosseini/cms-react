import { Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useLocation, Outlet } from "react-router-dom";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="grid grid-cols-[300px_1fr]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="main-wrapper col-span-2 lg:col-start-2">
        <Header onSidebar={() => setIsSidebarOpen(true)} />
        <main className="main min-h-[calc(100dvh-104px)]">
          <div className="content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
