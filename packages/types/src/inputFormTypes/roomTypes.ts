import { z } from "zod";

export const CreateRoomInput = z.object({
  name: z
    .string()
    .max(255)
    .nonempty("Board name cannot be empty.")
    .min(5, "Room name must be at least 5 characters long")
    .trim(),
});

export const GetRoomShapesInput = z.object({
  boardId: z.string().max(255).trim().nonempty("Board ID cannot be empty."),
});

export const RenameRoomInput = z.object({
  newName: z
    .string()
    .max(255)
    .nonempty("Board name cannot be empty.")
    .min(5, "Room name must be at least 5 characters long")
    .trim(),
  roomId: z.string().max(255).nonempty("Board ID cannot be empty.").trim(),
});

export const UpdateRoomShapesInput = z.object({
  roomId: z.string().max(255).nonempty("Board ID cannot be empty.").trim(),
  shapes: z.any(),
});

export type TCreateRoomInput = z.infer<typeof CreateRoomInput>;
export type TGetRoomShapesInput = z.infer<typeof GetRoomShapesInput>;
export type TRenameRoomInput = z.infer<typeof RenameRoomInput>;
export type TUpdateRoomShapesInput = z.infer<typeof UpdateRoomShapesInput>;
