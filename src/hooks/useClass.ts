import { useMutation } from "@tanstack/react-query";
import { classApi, type ClassFormValues } from "@/api/class";

export const useCreateClass = () => {
  return useMutation({
    mutationFn: (data: ClassFormValues) => classApi.create(data),
  });
};

export const useGetAllClasses = () => {
  return useMutation({
    mutationFn: () => classApi.getAll(),
  });
};

export const useUpdateClass = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ClassFormValues }) => classApi.update(id, data),
  });
};

export const useDeleteClass = () => {
  return useMutation({
    mutationFn: (id: string) => classApi.delete(id),
  });
};
