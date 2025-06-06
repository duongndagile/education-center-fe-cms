import { Button, Input, Box, Heading, Text } from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { setAccessToken } from "@/stores/auth";
import { useAuthLogin } from "@/hooks/useLogin";
import type { LoginDto } from "@/api/auth";
import { ROUTE_PATH } from "@/routes/routes.constant";
import { toaster } from "@/components/UI/toaster";
// import { toaster } from "@/components/UI/toaster";

const schema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  console.log("LoginPage rendered");
  // Redirect nếu đã đăng nhập
  // useEffect(() => {
  //   const token = getAccessToken();
  //   if (token) {
  //     navigate(ROUTE_PATH.DASHBOARD, { replace: true });
  //   }
  // }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({ resolver: yupResolver(schema) });

  const handleShowToast = (message: string, status: "success" | "error") => {
    toaster.create({
      title: status === "success" ? "Thành công" : "Lỗi",
      description: message,
      duration: 3000,
    });
  };

  const { mutate, error, isPending } = useAuthLogin();
  const onSubmit = (data: LoginDto) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("Login successful", res);
        setAccessToken(res.access_token);
        navigate(ROUTE_PATH.DASHBOARD);
        console.log("Redirecting to dashboard", ROUTE_PATH.DASHBOARD);
        handleShowToast('Đăng nhập thành công', 'success');
      },
      onError: (err) => {
        console.error("Login failed", err);
        handleShowToast(err.message, 'error');
      },
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={20}>
      <Heading mb={6}>Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} mb={4}>
          <FormLabel>Email</FormLabel>
          <Input {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {error && (
          <Text color="red.500" fontSize="sm" mb={4}>
            {error.message}
          </Text>
        )}

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          loading={!!isPending}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};
