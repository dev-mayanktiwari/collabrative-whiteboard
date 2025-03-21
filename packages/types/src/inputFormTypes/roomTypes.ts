import { z } from "zod";

export const CreateRoomInput = z.object({
  name: z.string().max(255),
});

export const GetRoomShapesInput = z.object({
  boardId: z.string().max(255),
});

export const RenameRoomInput = z.object({
  newName: z.string().max(255),
  roomId: z.string().max(255),
});

export const UpdateRoomShapesInput = z.object({
  roomId: z.string().max(255),
  shapes: z.any(),
});

export type TCreateRoomInput = z.infer<typeof CreateRoomInput>;
export type TGetRoomShapesInput = z.infer<typeof GetRoomShapesInput>;
export type TRenameRoomInput = z.infer<typeof RenameRoomInput>;
export type TUpdateRoomShapesInput = z.infer<typeof UpdateRoomShapesInput>;
