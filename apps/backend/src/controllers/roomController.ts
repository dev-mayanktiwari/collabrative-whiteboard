import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler, httpError, httpResponse } from "@repo/shared-utils";
import {
  AuthenticatedRequest,
  CreateRoomInput,
  GetRoomShapesInput,
  RenameRoomInput,
  ResponseMessage,
  StatusCodes,
  UpdateRoomShapesInput,
} from "@repo/types";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  getRoomShapes,
  renameRoom,
  updateRoomShapes,
} from "@/services/roomDbServices";

export default {
  createRoom: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body, user } = req as AuthenticatedRequest;
      console.log(body);
      const safeParse = CreateRoomInput.safeParse(body);
      if (!safeParse.success) {
        console.log("Error", safeParse.error);
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }
      

      const { name } = safeParse.data;

      const room = await createRoom({
        roomName: name,
        userId: String(user?.userId),
      });

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.CREATED,
        "Room Created",
        {
          room: room,
        }
      );
    }
  ),

  getRooms: asyncErrorHandler(async (req: Request, res: Response) => {
    const { user } = req as AuthenticatedRequest;

    const rooms = await getRooms({ userId: String(user?.userId) });

    return httpResponse(req, res, StatusCodes.SUCCESS.OK, "Rooms Fetched", {
      rooms: rooms,
    });
  }),

  getRoomShapes: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { params, user } = req as AuthenticatedRequest;

      const safeParse = GetRoomShapesInput.safeParse(params);
      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const { boardId } = safeParse.data;

      const shapes = await getRoomShapes({
        roomId: boardId,
        userId: String(user?.userId),
      });

      return httpResponse(req, res, StatusCodes.SUCCESS.OK, "Room Fetched", {
        shapes: shapes,
      });
    }
  ),

  deleteRoom: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { params, user } = req as AuthenticatedRequest;

      const safeParse = GetRoomShapesInput.safeParse(params);
      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const { boardId } = safeParse.data;

      const shapes = await deleteRoom({
        roomId: boardId,
        userId: String(user?.userId),
      });

      return httpResponse(req, res, StatusCodes.SUCCESS.OK, "Room Fetched", {
        shapes: shapes,
      });
    }
  ),

  renameRoom: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body, user } = req as AuthenticatedRequest;

      const safeParse = RenameRoomInput.safeParse(body);
      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const { newName, roomId } = safeParse.data;

      const room = await renameRoom({
        newName: newName,
        roomId: roomId,
        userId: String(user?.userId),
      });

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.CREATED,
        "Room Updated",
        {
          room: room,
        }
      );
    }
  ),

  updateRoomShapes: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body, user } = req as AuthenticatedRequest;

      const safeParse = UpdateRoomShapesInput.safeParse(body);
      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const { shapes, roomId } = safeParse.data;

      const room = await updateRoomShapes({
        roomId: roomId,
        shapes: shapes,
        userId: String(user?.userId),
      });

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.CREATED,
        "Room Updated",
        {
          room: room,
        }
      );
    }
  ),

  getRoomById: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { params, user } = req as AuthenticatedRequest;

      const safeParse = GetRoomShapesInput.safeParse(params);
      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const { boardId } = safeParse.data;

      const room = await getRoomById({
        roomId: boardId,
        userId: String(user?.userId),
      });

      if (!room) {
        return httpError(
          next,
          new Error(ResponseMessage.NOT_FOUND),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.NOT_FOUND
        );
      }

      return httpResponse(req, res, StatusCodes.SUCCESS.OK, "Room Fetched", {
        room: room,
      });
    }
  ),
};
