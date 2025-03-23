import roomController from "@/controllers/roomController";
import { Router } from "express";

const roomRouter: Router = Router();

roomRouter.post("/create-room", roomController.createRoom);
roomRouter.get("/get-rooms", roomController.getRooms);
roomRouter.get("/get-room-shapes", roomController.getRoomShapes);
roomRouter.delete("/delete-room/:boardId", roomController.deleteRoom);
roomRouter.put("/rename-room", roomController.renameRoom);
roomRouter.put("/update-room-shapes", roomController.updateRoomShapes);
roomRouter.get("/get-room/:roomId", roomController.getRoomById);

export default roomRouter;
