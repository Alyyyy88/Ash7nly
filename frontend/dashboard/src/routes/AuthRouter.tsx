import { Outlet, Navigate } from "react-router";
import { useAuthStore } from "@/stores/auth";

const AuthRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRouter;
