import axios from './axios';
import { API_PATH } from './constant';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export const login = async (data: LoginDto): Promise<LoginResponse> => {
  const response = await axios.post(API_PATH.AUTH_LOGIN, data);
  return response.data;
};