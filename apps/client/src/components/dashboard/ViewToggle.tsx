import { Grid, List } from "lucide-react";
import { Button } from "@repo/ui";

export default function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={viewMode === "grid" ? "default" : "noShadow"}
        size="icon"
        onClick={() => setViewMode("grid")}
        className="border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <Grid className="h-5 w-5" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "noShadow"}
        size="icon"
        onClick={() => setViewMode("list")}
        className="border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <List className="h-5 w-5" />
      </Button>
    </div>
  );
}
