import { WebSocketServer } from "ws";
import { setupWSConnection } from "y-websocket/server";

const wss = new WebSocketServer({ port: 1234 });
