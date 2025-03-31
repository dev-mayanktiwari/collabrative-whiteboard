import React, { useCallback, useEffect, useRef, useState } from "react";
import { getStroke } from "perfect-freehand";
import rough from "roughjs";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Toolbar } from "./Toolbar";
import { SideToolbar } from "./SideToolbar";
import { useParams } from "react-router-dom";
import { ExportModal } from "./ExportModal";

// Type definitions
type Point = { x: number; y: number };
type Tool = "freehand" | "rectangle" | "ellipse" | "line";

interface BaseElement {
  id: string;
  type: Tool;
}

interface FreehandElement extends BaseElement {
  type: "freehand";
  points: Point[];
  strokeOptions: {
    strokeWidth: number;
    strokeColor: string;
    smoothing: number;
    thinning: number;
    streamline: number;
  };
}

interface ShapeElement extends BaseElement {
  type: "rectangle" | "ellipse" | "line";
  start: Point;
  end: Point;
  shapeOptions: {
    roughness: number;
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    fill: boolean;
  };
}

type Element = FreehandElement | ShapeElement;

export default function Whiteboard() {
  const { canvasId } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  // State management
  const [tool, setTool] = useState<Tool>("freehand");
  const [elements, setElements] = useState<Element[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Canvas and rendering refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roughCanvasRef = useRef<RoughCanvas | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // WebSocket Reference
  const socketRef = useRef<WebSocket | null>(null);

  // Tool options
  const [backgroundColor, setBackgroundColor] = useState("#fff5e0");
  const [freehandOptions, setFreehandOptions] = useState({
    strokeWidth: 3,
    strokeColor: "#000000",
    smoothing: 0.5,
    thinning: 0.5,
    streamline: 0.5,
  });

  const [shapeOptions, setShapeOptions] = useState({
    roughness: 2,
    strokeWidth: 2,
    strokeColor: "#000000",
    fillColor: "#ffffff",
    fill: false,
  });

  // Connect WebSocket
  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.WS_URL}?whiteboardId=${canvasId}&token=${accessToken}`
    );

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Shapes", data?.content?.shapes);
      // console.log("WebSocket Message:", data);
      switch (data.type) {
        case "INITIAL_STATE":
          setElements(data?.content?.shapes || []);
          break;
        case "DRAWING_UPDATE":
          updateRemoteElement(data.payload);
          break;
        case "CLEAR_CANVAS":
          setElements([]);
          break;
      }
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  // Canvas initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    contextRef.current = context;
    roughCanvasRef.current = rough.canvas(canvas);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Redraw canvas when elements change
  useEffect(() => {
    redrawCanvas();
  }, [elements, backgroundColor]);

  // Update remote element
  const updateRemoteElement = (newElement: Element) => {
    setElements((prev) => {
      const existingIndex = prev.findIndex((el) => el.id === newElement.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = newElement;
        return updated;
      }
      return [...prev, newElement];
    });
  };

  // Send WebSocket message
  const sendMessage = (type: string, payload: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type, payload }));
    }
  };

  // Get mouse coordinates
  const getCoordinates = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  // Mouse handlers
  const startDrawing = (event: React.MouseEvent) => {
    const { x, y } = getCoordinates(event);
    setIsDrawing(true);

    const newElement: Element =
      tool === "freehand"
        ? {
            id: `draw-${Date.now()}`,
            type: "freehand",
            points: [{ x, y }],
            strokeOptions: freehandOptions,
          }
        : {
            id: `draw-${Date.now()}`,
            type: tool,
            start: { x, y },
            end: { x, y },
            shapeOptions,
          };

    setElements((prev) => [...prev, newElement]);
    sendMessage("DRAWING_UPDATE", newElement);
  };

  const draw = (event: React.MouseEvent) => {
    if (!isDrawing) return;

    const { x, y } = getCoordinates(event);
    const updatedElements = [...elements];
    const lastElement = updatedElements[updatedElements.length - 1];

    if (lastElement?.type === "freehand") {
      lastElement.points.push({ x, y });
    } else {
      // @ts-expect-error FIX LATER
      lastElement.end = { x, y };
    }

    setElements(updatedElements);
    sendMessage("DRAWING_UPDATE", lastElement);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    const lastElement = elements[elements.length - 1];
    sendMessage("DRAWING_COMPLETE", lastElement);
  };

  // Clear canvas
  const handleClear = () => {
    setElements([]);
    sendMessage("CLEAR_CANVAS", {});
  };

  // Redraw canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = roughCanvasRef.current;

    if (!canvas || !context || !roughCanvas) return;

    // Clear and reset canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    elements.forEach((element) => {
      if (element.type === "freehand") {
        drawFreehandElement(context, element);
      } else {
        drawShapeElement(roughCanvas, element);
      }
    });
  }, [elements, backgroundColor]);

  // Drawing helper methods
  const drawFreehandElement = (
    context: CanvasRenderingContext2D,
    element: FreehandElement
  ) => {
    const { points, strokeOptions } = element;
    if (points.length < 2) return;

    const stroke = getStroke(points, {
      size: strokeOptions.strokeWidth,
      thinning: strokeOptions.thinning,
      smoothing: strokeOptions.smoothing,
      streamline: strokeOptions.streamline,
    });

    context.fillStyle = strokeOptions.strokeColor;
    context.beginPath();
    context.moveTo(stroke[0][0], stroke[0][1]);

    for (let i = 1; i < stroke.length; i++) {
      context.lineTo(stroke[i][0], stroke[i][1]);
    }

    context.closePath();
    context.fill();
  };

  const drawShapeElement = (
    roughCanvas: RoughCanvas,
    element: ShapeElement
  ) => {
    const { type, start, end, shapeOptions } = element;
    const options = {
      roughness: shapeOptions.roughness,
      stroke: shapeOptions.strokeColor,
      strokeWidth: shapeOptions.strokeWidth,
      fill: shapeOptions.fill ? shapeOptions.fillColor : undefined,
    };

    switch (type) {
      case "rectangle":
        roughCanvas.rectangle(
          Math.min(start.x, end.x),
          Math.min(start.y, end.y),
          Math.abs(end.x - start.x),
          Math.abs(end.y - start.y),
          options
        );
        break;
      case "ellipse": {
        const centerX = (start.x + end.x) / 2;
        const centerY = (start.y + end.y) / 2;
        const width = Math.abs(end.x - start.x);
        const height = Math.abs(end.y - start.y);
        roughCanvas.ellipse(centerX, centerY, width, height, options);
        break;
      }
      case "line":
        roughCanvas.line(start.x, start.y, end.x, end.y, options);
        break;
    }
  };

  const handleExport = (format: "png" | "jpeg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL(`image/${format}`);
    const link = document.createElement("a");
    link.download = `whiteboard-export.${format}`;
    link.href = dataUrl;
    link.click();

    setShowExportModal(false);
  };
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Toolbar
        activeTool={tool}
        // @ts-expect-error FIX LATER
        setTool={setTool}
        onClear={handleClear}
        onExport={() => setShowExportModal(true)}
      />

      <SideToolbar
        tool={tool}
        freehandOptions={freehandOptions}
        setFreehandOptions={setFreehandOptions}
        shapeOptions={shapeOptions}
        setShapeOptions={setShapeOptions}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      {showExportModal && (
        <ExportModal
          onExport={handleExport}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
