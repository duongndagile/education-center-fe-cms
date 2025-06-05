import ProtectedRoute from "@/common/ProtectedRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardHome from "@/pages/Dashboard";
import { LoginPage } from "@/pages/LoginPage";
import { RoomPage } from "@/pages/RoomPage";

import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [{
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "rooms",
        element: <RoomPage />,
      },
      {
        path: "classes",
        // element: <RoomListPage />,
      },
      {
        path: "teachers",
        // element: <RoomListPage />,
      },
      {
        path: "students",
        // element: <RoomListPage />,
      },
      // Thêm các route con khác tại đây nếu cần
    ],
  },]
  },
  
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
