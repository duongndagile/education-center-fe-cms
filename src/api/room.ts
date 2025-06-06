import axios from "./axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export type RoomFormValues = {
  name: string;
  capacity: number;
  description: string;
  addressAt: string;
};

export interface Room {
  _id: string;
  name: string;
  capacity: number;
  description: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export const roomApi = {
  create: async (data: RoomFormValues) => {
    const response = await axios.post(`${API_URL}/room`, {
      ...data,
      address: data.addressAt,
    });
    return response.data;
  },

  getAll: async (): Promise<Room[]> => {
    const response = await axios.get(`${API_URL}/room`);
    return response.data;
  },

  update: async (id: string,data: RoomFormValues) => {
    const response = await axios.patch(`${API_URL}/room/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/room/${id}`);
    return response.data;
  },
};
