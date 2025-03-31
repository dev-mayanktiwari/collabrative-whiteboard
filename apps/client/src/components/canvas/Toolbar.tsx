import {
  //  MousePointer,
  Pencil,
  Square,
  Circle,
  Minus,
  // ArrowRight,
  // Hand,
  Download,
  Trash2,
} from "lucide-react";

type ToolbarProps = {
  activeTool: string;
  setTool: (tool: string) => void;
  onExport: () => void;
  onClear: () => void;
};

export function Toolbar({
  activeTool,
  setTool,
  onExport,
  onClear,
}: ToolbarProps) {
  const tools = [
    // { id: "select", icon: <MousePointer size={20} />, label: "Select" },
    { id: "freehand", icon: <Pencil size={20} />, label: "Draw" },
    { id: "rectangle", icon: <Square size={20} />, label: "Rectangle" },
    { id: "ellipse", icon: <Circle size={20} />, label: "Ellipse" },
    { id: "line", icon: <Minus size={20} />, label: "Line" },
    // { id: "arrow", icon: <ArrowRight size={20} />, label: "Arrow" },
    // { id: "drag", icon: <Hand size={20} />, label: "Pan" },
  ];

  return (
    <div className="fixed top-4 left-1/2 z-20 -translate-x-1/2 transform rounded-xl bg-white p-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setTool(tool.id)}
            className={`flex h-10 w-10 flex-col items-center justify-center rounded-lg border-2 border-black transition-all hover:bg-yellow-200 ${
              activeTool === tool.id ? "bg-yellow-300" : "bg-white"
            }`}
            title={tool.label}
          >
            {tool.icon}
          </button>
        ))}
        <div className="mx-2 h-10 w-0.5 bg-black"></div>
        <button
          onClick={onExport}
          className="flex h-10 w-10 flex-col items-center justify-center rounded-lg border-2 border-black bg-white transition-all hover:bg-green-200"
          title="Export"
        >
          <Download size={20} />
        </button>
        <button
          onClick={onClear}
          className="flex h-10 w-10 flex-col items-center justify-center rounded-lg border-2 border-black bg-white transition-all hover:bg-red-200"
          title="Clear Canvas"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
