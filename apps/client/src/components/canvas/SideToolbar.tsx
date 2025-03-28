import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SideToolbarProps = {
  tool: string;
  freehandOptions: {
    strokeWidth: number;
    strokeColor: string;
    smoothing: number;
    thinning: number;
    streamline: number;
  };
  setFreehandOptions: (options: any) => void;
  shapeOptions: {
    roughness: number;
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    fill: boolean;
  };
  setShapeOptions: (options: any) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

export function SideToolbar({
  tool,
  freehandOptions,
  setFreehandOptions,
  shapeOptions,
  setShapeOptions,
  backgroundColor,
  setBackgroundColor,
}: SideToolbarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const isShapeTool = ["rectangle", "ellipse", "line", "arrow"].includes(tool);
  const isFreehandTool = tool === "freehand";

  const renderSlider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number = 1,
    onChange: (value: number) => void
  ) => (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="text-sm">
        {typeof value === "number" ? value.toFixed(1) : value}
      </div>
    </div>
  );

  return (
    <div
      className={`fixed left-4 top-20 z-10 flex flex-col rounded-xl border-2 border-black bg-white p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all ${
        collapsed ? "w-12" : "w-64"
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-white"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {!collapsed && (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">
            {isFreehandTool
              ? "Drawing Options"
              : isShapeTool
                ? "Shape Options"
                : "Board Options"}
          </h3>

          {/* Background color option */}
          <div className="space-y-2 border-t border-gray-200 pt-4">
            <label className="block font-medium">Background Color</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-10 w-full"
            />
          </div>

          {isFreehandTool && (
            <>
              {renderSlider(
                "Stroke Width",
                freehandOptions.strokeWidth,
                1,
                20,
                1,
                (value) =>
                  setFreehandOptions({
                    ...freehandOptions,
                    strokeWidth: value,
                  })
              )}

              <div className="space-y-2">
                <label className="block font-medium">Stroke Color</label>
                <input
                  type="color"
                  value={freehandOptions.strokeColor}
                  onChange={(e) =>
                    setFreehandOptions({
                      ...freehandOptions,
                      strokeColor: e.target.value,
                    })
                  }
                  className="h-10 w-full"
                />
              </div>

              {renderSlider(
                "Smoothing",
                freehandOptions.smoothing,
                0,
                1,
                0.1,
                (value) =>
                  setFreehandOptions({
                    ...freehandOptions,
                    smoothing: value,
                  })
              )}

              {renderSlider(
                "Thinning",
                freehandOptions.thinning,
                0,
                1,
                0.1,
                (value) =>
                  setFreehandOptions({
                    ...freehandOptions,
                    thinning: value,
                  })
              )}

              {renderSlider(
                "Streamline",
                freehandOptions.streamline,
                0,
                1,
                0.1,
                (value) =>
                  setFreehandOptions({
                    ...freehandOptions,
                    streamline: value,
                  })
              )}
            </>
          )}

          {isShapeTool && (
            <>
              {renderSlider(
                "Roughness",
                shapeOptions.roughness,
                0,
                5,
                0.1,
                (value) =>
                  setShapeOptions({
                    ...shapeOptions,
                    roughness: value,
                  })
              )}

              {renderSlider(
                "Stroke Width",
                shapeOptions.strokeWidth,
                1,
                10,
                1,
                (value) =>
                  setShapeOptions({
                    ...shapeOptions,
                    strokeWidth: value,
                  })
              )}

              <div className="space-y-2">
                <label className="block font-medium">Stroke Color</label>
                <input
                  type="color"
                  value={shapeOptions.strokeColor}
                  onChange={(e) =>
                    setShapeOptions({
                      ...shapeOptions,
                      strokeColor: e.target.value,
                    })
                  }
                  className="h-10 w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium">
                  <input
                    type="checkbox"
                    checked={shapeOptions.fill}
                    onChange={(e) =>
                      setShapeOptions({
                        ...shapeOptions,
                        fill: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Fill Shape
                </label>
              </div>

              {shapeOptions.fill && (
                <div className="space-y-2">
                  <label className="block font-medium">Fill Color</label>
                  <input
                    type="color"
                    value={shapeOptions.fillColor}
                    onChange={(e) =>
                      setShapeOptions({
                        ...shapeOptions,
                        fillColor: e.target.value,
                      })
                    }
                    className="h-10 w-full"
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
