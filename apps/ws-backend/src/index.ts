import { WebSocketServer, WebSocket } from "ws";
import prisma from "@repo/db";

class WhiteboardServer {
  private wss: WebSocketServer;
  private clients: Map<string, Set<WebSocket>> = new Map();
  private boardStates: Map<string, any[]> = new Map();
  private saveInterval = 30000; // Save to DB every 30 seconds
  private saveTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    this.wss = new WebSocketServer({ port: 8080 });
    this.wss.on("connection", this.handleConnection.bind(this));
    console.log("WebSocket Server running on ws://localhost:8080");
  }

  private async handleConnection(ws: WebSocket, req: any) {
    try {
      const whiteboardId = this.extractWhiteboardId(req);
      if (!whiteboardId) {
        this.sendError(ws, "No whiteboard ID provided");
        return;
      }

      // Manage clients and board state
      this.manageClientConnection(whiteboardId, ws);

      // Load and send initial state
      await this.loadAndSendInitialState(whiteboardId, ws);

      // Handle incoming messages
      ws.on("message", async (message) => {
        try {
          const data = JSON.parse(message.toString());
          await this.handleIncomingMessage(whiteboardId, data, ws);
        } catch (error) {
          this.sendError(ws, "Invalid message format");
        }
      });

      // Handle disconnection
      ws.on("close", () => this.handleDisconnection(whiteboardId, ws));
    } catch (error) {
      console.error("Connection error:", error);
      this.sendError(ws, "Internal server error");
    }
  }

  private sendError(ws: WebSocket, message: string) {
    ws.send(JSON.stringify({ type: "ERROR", message }));
    ws.close();
  }

  private extractWhiteboardId(req: any): string | null {
    return new URL(req.url, `http://${req.headers.host}`).searchParams.get(
      "whiteboardId"
    );
  }

  private manageClientConnection(whiteboardId: string, ws: WebSocket) {
    if (!this.clients.has(whiteboardId)) {
      this.clients.set(whiteboardId, new Set());
    }
    this.clients.get(whiteboardId)!.add(ws);

    // Start periodic save timer if not already running
    if (!this.saveTimers.has(whiteboardId)) {
      const timer = setInterval(() => {
        this.saveBoardState(whiteboardId);
      }, this.saveInterval);
      this.saveTimers.set(whiteboardId, timer);
    }
  }

  private async loadAndSendInitialState(whiteboardId: string, ws: WebSocket) {
    const whiteboard = await prisma.whiteBoard.findUnique({
      where: { boardId: whiteboardId },
    });

    // Initialize board state if not exists
    if (!this.boardStates.has(whiteboardId)) {
      this.boardStates.set(whiteboardId, (whiteboard?.shapes as any[]) || []);
    }

    // Send initial state
    ws.send(
      JSON.stringify({
        type: "INITIAL_STATE",
        content: {
          shapes: this.boardStates.get(whiteboardId) || [],
        },
      })
    );
  }

  private async handleIncomingMessage(
    whiteboardId: string,
    data: any,
    ws: WebSocket
  ) {
    switch (data.type) {
      case "DRAWING_UPDATE":
        // Temporary update during drawing
        this.broadcastDrawingUpdate(whiteboardId, data.payload, ws);
        break;
      case "DRAWING_COMPLETE":
      case "SHAPE_UPDATE":
        // Final shape update to be saved
        this.handleShapeUpdate(whiteboardId, data.payload);
        break;
      case "CLEAR_CANVAS":
        // Clear canvas for all clients
        this.handleClearCanvas(whiteboardId);
        break;
    }
  }

  private broadcastDrawingUpdate(
    whiteboardId: string,
    payload: any,
    sender: WebSocket
  ) {
    const clients = this.clients.get(whiteboardId);
    if (clients) {
      const message = JSON.stringify({
        type: "DRAWING_UPDATE",
        payload,
      });

      clients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }

  private handleShapeUpdate(whiteboardId: string, payload: any) {
    // Update board state in memory
    const currentState = this.boardStates.get(whiteboardId) || [];
    const updatedState = [...currentState, payload];
    this.boardStates.set(whiteboardId, updatedState);

    // Broadcast full shape update to all clients
    const clients = this.clients.get(whiteboardId);
    if (clients) {
      const message = JSON.stringify({
        type: "SHAPE_UPDATE",
        payload: updatedState,
      });

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }

  private handleClearCanvas(whiteboardId: string) {
    // Clear board state in memory
    this.boardStates.set(whiteboardId, []);

    // Broadcast clear canvas to all clients
    const clients = this.clients.get(whiteboardId);
    if (clients) {
      const message = JSON.stringify({
        type: "CLEAR_CANVAS",
        payload: {},
      });

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }

  private handleDisconnection(whiteboardId: string, ws: WebSocket) {
    const clients = this.clients.get(whiteboardId);
    if (clients) {
      clients.delete(ws);

      // If no clients left, save state and clear timer
      if (clients.size === 0) {
        this.saveBoardState(whiteboardId);

        const timer = this.saveTimers.get(whiteboardId);
        if (timer) {
          clearInterval(timer);
          this.saveTimers.delete(whiteboardId);
        }
      }
    }
  }

  private async saveBoardState(whiteboardId: string) {
    try {
      const boardState = this.boardStates.get(whiteboardId);
      if (boardState) {
        await prisma.whiteBoard.update({
          where: { boardId: whiteboardId },
          data: {
            shapes: boardState,
            updatedAt: new Date(),
          },
        });
        console.log(`Saved board state for ${whiteboardId}`);
      }
    } catch (error) {
      console.error(`Failed to save board state for ${whiteboardId}:`, error);
    }
  }
}

// Start the server
new WhiteboardServer();
