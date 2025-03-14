"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Image,
  Square,
  Circle,
  Type,
  User,
  Sparkles,
} from "lucide-react";

export default function CanvasPreview() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current) {
        const width = canvasRef.current.offsetWidth - 30;
        const height = canvasRef.current.offsetHeight - 30;
        setCursorPosition({
          x: Math.random() * width,
          y: Math.random() * height,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Canvas Container */}
      <div
        ref={canvasRef}
        className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[400px] md:h-[500px] overflow-hidden"
      >
        {/* Canvas Content */}
        <div className="relative h-full w-full border-2 border-dashed border-gray-300 rounded-md">
          {/* AI Generated Element */}
          <div className="absolute top-[15%] left-[20%] transform -rotate-3">
            <div className="bg-[#FFE156] border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div className="h-16 w-16 md:h-24 md:w-24 bg-white border-2 border-black flex items-center justify-center">
                <Image className="h-8 w-8 md:h-10 md:w-10" />
              </div>
            </div>
            <div className="mt-1 text-xs font-bold bg-[#A0D2EB] border-2 border-black px-2 py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              AI Generated
            </div>
          </div>

          {/* Shape Element */}
          <div className="absolute bottom-[25%] right-[15%]">
            <div className="h-12 w-12 md:h-16 md:w-16 bg-[#FF90B3] border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"></div>
          </div>

          {/* Text Element */}
          <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 -rotate-1">
            <div className="bg-white border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold">Great idea!</p>
            </div>
          </div>

          {/* User Indicator */}
          <div className="absolute bottom-4 right-4 bg-[#A0D2EB] border-2 border-black p-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="text-xs font-bold">Jane</span>
            </div>
          </div>

          {/* Moving Cursor */}
          <motion.div
            className="absolute"
            animate={{
              x: cursorPosition.x,
              y: cursorPosition.y,
              transition: { duration: 1, ease: "easeInOut" },
            }}
          >
            <div className="relative">
              <Pencil className="h-5 w-5 text-black" />
              <div className="absolute top-6 left-6 bg-[#FFE156] border-2 border-black px-2 py-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                <span className="text-xs font-bold">AI suggesting...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
        <button className="h-8 w-8 bg-[#A0D2EB] border-2 border-black rounded-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Pencil className="h-4 w-4" />
        </button>
        <button className="h-8 w-8 bg-[#FFE156] border-2 border-black rounded-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Square className="h-4 w-4" />
        </button>
        <button className="h-8 w-8 bg-[#FF90B3] border-2 border-black rounded-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Circle className="h-4 w-4" />
        </button>
        <button className="h-8 w-8 bg-white border-2 border-black rounded-md flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Type className="h-4 w-4" />
        </button>
      </div>

      {/* AI Feature Badge */}
      <div className="absolute -right-2 -bottom-2 bg-[#FF90B3] border-3 border-black px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-bold">AI Powered</span>
        </div>
      </div>
    </div>
  );
}
