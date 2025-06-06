import ProtectedRoute from "@/common/ProtectedRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardHome from "@/pages/Dashboard";
import { LoginPage } from "@/pages/LoginPage";
import { RoomPage } from "@/pages/RoomPage";

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTE_PATH } from "./routes.constant";
import { ClassPage } from "@/pages/ClassPage";

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
        path: ROUTE_PATH.ROOMS,
        element: <RoomPage />,
      },
      {
        path: ROUTE_PATH.CLASSES,
        element: <ClassPage />,
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
