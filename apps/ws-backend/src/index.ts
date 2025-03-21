import { WebSocketServer } from "ws";
import * as Y from "yjs";
import { authMiddleware } from "./middlewares/authMiddleware";
import prisma from "@repo/db";

const rooms = new Map<string, Y.Doc>();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
    console.log("New Web socket connection attempt");

    const user = authMiddleware(req);
    if (!user) {
        console.error("No user found");
        ws.close();
        return;
    }

    console.log(`User authenticated:`, user);

    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const roomID = url.searchParams.get("roomID");

    if (!roomID) {
        console.error("No room ID provided");
        ws.close();
        return;
    }

    console.log(`User ${user} connected to room ${roomID}`);

    let ydoc = rooms.get(roomID);
    if (!ydoc) {
        const ydoc = new Y.Doc();

        const existingRoom = await prisma.whiteBoard.findUnique({
            where: {
                boardId: roomID,
            }
        })

        if (existingRoom && existingRoom.shapes) {
            Y.applyUpdate(ydoc, Buffer.from(existingRoom.shapes, "base64"));    
        }

        rooms.set(roomID, ydoc);
    }

    ws.on("message", (message) => {
        Y.applyUpdate(ydoc, Buffer.from(message));
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }   
    }); 
});

wss.on("close", () => {
    console.log("Web socket connection closed");
});

setInterval(async () => {
    const state = Y.encodeStateAsUpdate(ydoc);
    await prisma.whiteBoard.update({
      where: { boardId: roomId },
      data: { shapes: Buffer.from(state).toString("base64") },
    });
  }, 5000); // Every 5 seconds
});

console.log("WebSocket server running on ws://localhost:1234");


