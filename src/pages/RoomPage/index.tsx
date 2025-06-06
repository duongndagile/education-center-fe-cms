/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Heading,
  useDisclosure,
  CloseButton,
  Input,
  Table,
  Spinner,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useCreateRoom,
  useDeleteRoom,
  useGetAllRooms,
  useUpdateRoom,
} from "@/hooks/useRoom";
import type { RoomFormValues } from "@/api/room";
import { toaster } from "@/helpers/toaster";
import { FaEdit, FaTrash } from "react-icons/fa";

type Room = {
  _id: string;
  name: string;
  capacity: number;
  description: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
};

export const RoomPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const { open, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, reset } = useForm<RoomFormValues>();
  const { mutate } = useCreateRoom();
  const { data: roomsData, isPending, mutate: getAllRooms } = useGetAllRooms();
  const { mutate: deleteRoom } = useDeleteRoom();
  const { mutate: updateRoom } = useUpdateRoom();

  useEffect(() => {
    getAllRooms();
  }, [getAllRooms]);

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
    }
  }, [roomsData]);

  useEffect(() => {
    if (editingRoom) {
      reset({
        name: editingRoom.name,
        capacity: editingRoom.capacity,
        description: editingRoom.description,
        addressAt: editingRoom.address,
      });
    }
  }, [editingRoom, reset]);

  const onSubmit = (data: RoomFormValues) => {
    if (editingRoom) {
      updateRoom(
        { id: editingRoom._id, data },
        {
          onSuccess: () => {
            handleShowToast("Cập nhật phòng thành công", "success");
            setEditingRoom(null);
            onClose();
            getAllRooms();
          },
          onError: (error: any) => {
            console.error("Failed to update room:", error);
            handleShowToast("Cập nhật phòng thất bại", "error");
          },
        }
      );
    } else {
      mutate(data, {
        onSuccess: (response) => {
          setRooms((prev) => [...prev, response]);
          handleShowToast("Đã thêm phòng thành công", "success");
          onClose();
          reset();
        },
        onError: (error: any) => {
          console.error("Failed to create room:", error);
          handleShowToast("Thêm phòng thất bại", "error");
        },
      });
    }
  };

  const handleShowToast = (message: string, status: "success" | "error") => {
    toaster({
      title: status === "success" ? "Thành công" : "Lỗi",
      description: message,
      duration: 3000,
    });
    console.log("handleShowToast", message, status);
  };

  const handleAddRoom = () => {
    reset();
    setEditingRoom(null);
    onOpen();
  };

  const handleEdit = (room: Room) => {
    console.log("handleEdit", room);
    reset();
    setEditingRoom(room);
    onOpen();
    // setEditingRoom(room);
    // onOpen();
  };

  const handleDelete = (id: string) => {
    deleteRoom(id, {
      onSuccess: (response) => {
        console.log("Delete room successful", response);
        handleShowToast("Đã xoá phòng thành công", "success");
        getAllRooms();
      },
      onError: (error: any) => {
        console.error("Delete room failed", error);
        handleShowToast("Xoá phòng thất bại", "error");
      },
    });
  };

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Rooms</Heading>
      <Button colorScheme="teal" onClick={handleAddRoom} mb={4}>
        Thêm phòng
      </Button>

      <Table.Root size="sm" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Capacity</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Address</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rooms?.map((item, index) => (
            <Table.Row key={`${Date.now()}-${index}`}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.capacity}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.address}</Table.Cell>
              <Table.Cell textAlign="end">
                <Stack direction="row" padding={2}>
                  <IconButton
                    aria-label="Sửa"
                    size="xs"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    aria-label="Xoá"
                    size="xs"
                    colorScheme="red"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrash />
                  </IconButton>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Box display="flex" justifyContent="center" alignItems="center">
      <Modal isOpen={open} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="white"
          borderRadius="lg"
          px={6}
          py={4}
          maxW="500px"
          boxShadow="lg"
        >
          <ModalHeader>{editingRoom ? "Sửa phòng" : "Thêm phòng"}</ModalHeader>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={onClose}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <ModalBody>
                <FormControl isRequired mb={4}>
                  <FormLabel>Tên phòng</FormLabel>
                  <Input {...register("name", { required: true })} />
                </FormControl>

                <FormControl>
                  <FormLabel>Sức chứa</FormLabel>
                  <Input {...register("capacity")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Mô tả</FormLabel>
                  <Input {...register("description")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Địa chỉ</FormLabel>
                  <Input {...register("addressAt")} />
                </FormControl>
              </ModalBody>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Huỷ
              </Button>
              <Button type="submit" colorScheme="teal">
                {editingRoom ? "Lưu thay đổi" : "Thêm"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      </Box>
    </Box>
  );
};
