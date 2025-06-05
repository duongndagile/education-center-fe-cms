import { getAccessToken } from "@/stores/auth";
import { Navigate, Outlet } from "react-router-dom";

// Đây là nơi bạn kiểm tra user có login chưa
const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
