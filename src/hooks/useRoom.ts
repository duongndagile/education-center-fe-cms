import { useMutation } from "@tanstack/react-query";
import { roomApi } from "@/api/room";
import type { RoomFormValues } from "@/api/room";

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: (data: RoomFormValues) => roomApi.create(data),
  });
};

export const useGetAllRooms = () => {
  return useMutation({
    mutationFn: () => roomApi.getAll(),
  });
};

export const useUpdateRoom = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RoomFormValues }) => roomApi.update(id, data),
  });
};

export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: (id: string) => roomApi.delete(id),
  });
};
