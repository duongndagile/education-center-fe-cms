import {
  Box,
  Button,
  Heading,
  useDisclosure,
  CloseButton,
  Input,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import {  } from "@chakra-ui/hooks";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/table";
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
import { useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

type Room = {
  id: number;
  name: string;
  description: string;
};

type RoomFormValues = {
  name: string;
  description: string;
};

export const RoomPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const { open, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<RoomFormValues>();
  
  const onSubmit = (data: RoomFormValues) => {
    if (editingRoom) {
      // Cập nhật phòng
      setRooms((prev) =>
        prev.map((r) => (r.id === editingRoom.id ? { ...r, ...data } : r))
      );
    } else {
      // Thêm phòng mới
      const newRoom: Room = {
        id: Date.now(),
        ...data,
      };
      setRooms((prev) => [...prev, newRoom]);
    }

    reset();
    setEditingRoom(null);
    onClose();
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    reset(room); // fill form với data
    onOpen();
  };

  const handleDelete = (roomId: number) => {
    setRooms((prev) => prev.filter((room) => room.id !== roomId));
  };

  const handleAddRoom = () => {
    reset();
    setEditingRoom(null);
    onOpen();
  };

  // const modalBg = useColorModeValue('white', 'gray.800');

  return (
    <Box p={4}>
      <Heading mb={4}>Rooms</Heading>
      <Button colorScheme="teal" onClick={handleAddRoom} mb={4}>
        Thêm phòng
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Tên phòng</Th>
            <Th>Mô tả</Th>
            <Th>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rooms.map((room) => (
            <Tr key={room.id}>
              <Td>{room.name}</Td>
              <Td>{room.description}</Td>
              <Td>
                <Stack direction="row" padding={2}>
                  <IconButton
                    aria-label="Sửa"
                    size="sm"
                    onClick={() => handleEdit(room)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    aria-label="Xoá"
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(room.id)}
                  >
                    <FaTrash />
                  </IconButton>
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  bg='white' borderRadius="lg" p={4}>
          <ModalHeader>{editingRoom ? "Sửa phòng" : "Thêm phòng"}</ModalHeader>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={onClose}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isRequired mb={4}>
                <FormLabel>Tên phòng</FormLabel>
                <Input {...register("name", { required: true })} />
              </FormControl>

              <FormControl>
                <FormLabel>Mô tả</FormLabel>
                <Input {...register("description")} />
              </FormControl>
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
      {/* <Modal isOpen={open} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBg} borderRadius="lg" p={4}>
          <ModalHeader>
            {editingRoom ? 'Cập nhật phòng' : 'Thêm phòng mới'}
          </ModalHeader>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={onClose}
          />
          <ModalBody>
            <Input
              placeholder="Tên phòng"
              mb={4}
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
            />
            <Input
              placeholder="Sức chứa"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData((f) => ({ ...f, capacity: e.target.value }))}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Lưu
            </Button>
            <Button onClick={onClose}>Huỷ</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};
