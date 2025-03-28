import {
  TCreateRoomInput,
  TGetRoomShapesInput,
  TRenameRoomInput,
  TUserRegistrationInput,
} from "@repo/types";
import api from "./api";

export default {
  register: async (data: TUserRegistrationInput) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  verifyEmail: async (token: string, code: string) => {
    const response = await api.put(
      `/auth/verify-email?token=${token}&code=${code}`
    );
    return response.data;
  },

  self: async () => {
    const response = await api.get("/auth/self");
    return response.data;
  },

  logout: async () => {
    const response = await api.put("/auth/logout");
    return response.data;
  },

  getRooms: async () => {
    const response = await api.get("/rooms/get-rooms");
    return response.data;
  },

  renameRoom: async (input: TRenameRoomInput) => {
    const response = await api.put(`/rooms/rename-room`, input);
    return response.data;
  },

  deleteRoom: async (roomId: TGetRoomShapesInput) => {
    const response = await api.delete(`/rooms/delete-room/${roomId.boardId}`);
    return response.data;
  },

  getRoomById: async (roomId: string) => {
    const response = await api.get(`/rooms/get-room/${roomId}`);
    return response.data;
  },

  updateShapes: async (roomId: string, shapes: object) => {
    const response = await api.put(`/rooms/update-room-shapes`, {
      roomId,
      shapes,
    });
    return response.data;
  },

  createRoom: async (input: TCreateRoomInput) => {
    // console.log(input);
    const response = await api.post(`/rooms/create-room`, input);
    return response.data;
  },
};
