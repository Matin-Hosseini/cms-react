import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));

const ProtectedRoute = lazy(() => import("./utils/ProtectedRoute"));
const IsProgressing = lazy(() => import("./pages/IsProgressing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sms = lazy(() => import("./pages/Sms"));

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/customers", element: <Home /> },
      { path: "/cup", element: <IsProgressing /> },
      { path: "/sms", element: <Sms /> },
      { path: "/users", element: <IsProgressing /> },
      { path: "/permissions", element: <IsProgressing /> },
      { path: "/permissions", element: <IsProgressing /> },
      { path: "/roles", element: <IsProgressing /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
];

export default routes;
