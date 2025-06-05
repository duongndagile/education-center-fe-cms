import { Outlet, Link, useLocation } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import styles from "./index.module.scss";
import { clearTokens } from "@/stores/auth";
import { ROUTE_PATH } from "@/routes/routes.constant";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "Classes", path: "/classes" },
  { label: "Teachers", path: "/teachers" }, 
  { label: "Students", path: "/students" },
  // Thêm route khác nếu cần
];

export default function DashboardLayout() {
  const location = useLocation();

  const handleLogout = () => {
    clearTokens();
    window.location.href = ROUTE_PATH.LOGIN;
  };

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box className={styles.sidebar}>
        <h1>CMS Admin</h1>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.navItemActive : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button w={44} onClick={() => handleLogout()}>
          Logout
        </Button>
      </Box>
      <Box as="main" className={styles.main}>
        <Outlet />
      </Box>
    </Flex>
  );
}
