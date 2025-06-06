import axios from "./axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";

export type ClassFormValues = {
  name: string;
  room: string;
  schedule?: string;
//   teacher?: string;
};

export interface Class {
  _id: string;
  name: string;
  room: string;
  schedule?: string;
//   teacher?: string;
}

export const classApi = {
  create: async (data: ClassFormValues) => {
    const response = await axios.post(`${API_URL}/class`, data);
    return response.data;
  },

  getAll: async (): Promise<Class[]> => {
    const response = await axios.get(`${API_URL}/class`);
    return response.data;
  },

  update: async (id: string,data: ClassFormValues) => {
    const response = await axios.patch(`${API_URL}/class/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/class/${id}`);
    return response.data;
  },
};
