import "./App.css";

import routes from "./routes";
import { useRoutes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import { Suspense } from "react";
import GlobalLoading from "./components/GlobalLoading";

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<GlobalLoading />}>{router}</Suspense>
    </>
  );
}

export default App;
