import { login, type LoginDto, type LoginResponse } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";


export const useAuthLogin = () => {
  return useMutation<LoginResponse, Error, LoginDto>({
    mutationFn: login
  });
};
