import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  LoginRoutes,
  MainRoutes,
]);

export default router;
