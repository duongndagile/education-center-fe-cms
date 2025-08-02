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
import { Select } from "@chakra-ui/select";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import {
  useCreateClass,
  useDeleteClass,
  useGetAllClasses,
} from "../../hooks/useClass";
import { toaster } from "@/helpers/toaster";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { ClassFormValues } from "@/api/class";
import { useGetAllRooms } from "@/hooks/useRoom";

type Class = {
  _id: string;
  name: string;
  room: string;
  schedule?: string;
  //   teacher?: string;
};

const validationSchema = yup.object({
  name: yup.string().required("Tên lớp là bắt buộc"),
  //   teacher: yup.string().required("Giáo viên là bắt buộc"),
  scheduler: yup.string().optional(),
  room: yup.string().required("Phòng là bắt buộc"),
});

export const ClassPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const { open, onOpen, onClose } = useDisclosure();

  const { data: roomsData, refetch } = useGetAllRooms();
  //   const { data: teachers = [] } = useGetAllTeachers();
const roomMap = useMemo(() => {
  const map = new Map<string, string>();
  roomsData?.forEach((room) => {
    map.set(room._id, room.name);
  });
  return map;
}, [roomsData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    data: classData,
    isPending,
    mutate: getAllClasses,
  } = useGetAllClasses();
  const { mutate: createClass } = useCreateClass();
  const { mutate: deleteClass } = useDeleteClass();

  useEffect(() => {
    getAllClasses();
    // getAllRooms();
  }, [getAllClasses]);

  useEffect(() => {
    if (classData && Array.isArray(classData)) {
      setClasses(classData);
    }
  }, [classData]);

  const handleShowToast = (message: string, status: "success" | "error") => {
    toaster({
      title: status === "success" ? "Thành công" : "Lỗi",
      description: message,
      duration: 3000,
    });
  };

  const onSubmit = (data: ClassFormValues) => {
    if (editingClass) {
      // Update logic can be handled here if update API is available
      setClasses((prev) =>
        prev.map((c) => (c._id === editingClass._id ? { ...c, ...data } : c))
      );
      handleShowToast("Cập nhật lớp thành công", "success");
    } else {
      createClass(data, {
        onSuccess: (response) => {
          setClasses((prev) => [...prev, response]);
          handleShowToast("Đã thêm lớp thành công", "success");
          refetch();
          onClose();
          reset();
          console.log("refetchhhh1");
        },
        onError: (error: any) => {
          console.error("Failed to create class:", error);
          handleShowToast("Thêm lớp thất bại", "error");
        },
      });
    }
  };

  const handleEdit = (cls: Class) => {
    setEditingClass(cls);
    reset(cls);
    onOpen();
  };

  const handleDelete = (id: string) => {
    deleteClass(id, {
      onSuccess: () => {
        handleShowToast("Đã xoá lớp thành công", "success");
        getAllClasses();
      },
      onError: () => {
        handleShowToast("Xoá lớp thất bại", "error");
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
      <Heading mb={4}>Classes</Heading>
      <Button
        colorScheme="teal"
        onClick={() => {
          reset();
          setEditingClass(null);
          onOpen();
        }}
        mb={4}
      >
        Thêm lớp
      </Button>
      <Table.Root size="sm" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Tên lớp</Table.ColumnHeader>
            {/* <Table.ColumnHeader>Giáo viên</Table.ColumnHeader> */}
            <Table.ColumnHeader>Phòng</Table.ColumnHeader>
            <Table.ColumnHeader>Hành động</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Array.isArray(classes) &&
            classes.map((item, index) => (
              <Table.Row key={item._id || index}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{roomMap.get(item.room)}</Table.Cell>
                {/* <Table.Cell>{item.schedule}</Table.Cell> */}
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

      <Modal isOpen={open} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="white"
          borderRadius="lg"
          p={4}
          maxW="500px"
          boxShadow="lg"
        >
          <ModalHeader>{editingClass ? "Sửa lớp" : "Thêm lớp"}</ModalHeader>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={onClose}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={!!errors.name} isRequired mb={4}>
                <FormLabel>Tên lớp</FormLabel>
                <Input {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.room} mb={4}>
                <FormLabel>Phòng</FormLabel>
                <Select placeholder="Chọn phòng" {...register("room")}>
                  {roomsData?.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.room?.message}</FormErrorMessage>
              </FormControl>

              {/* <FormControl isInvalid={!!errors.scheduler} mb={4}>
                <FormLabel>Mô tả</FormLabel>
                <Input {...register("scheduler")} />
                <FormErrorMessage>{errors.scheduler?.message}</FormErrorMessage>
              </FormControl> */}
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Huỷ
              </Button>
              <Button type="submit" colorScheme="teal">
                {editingClass ? "Lưu thay đổi" : "Thêm"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};
