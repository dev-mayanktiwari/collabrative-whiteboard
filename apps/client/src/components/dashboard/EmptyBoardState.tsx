import { Plus } from "lucide-react";
import { Button } from "@repo/ui";
import CreateNewBoard from "./CreateBoardDialog";
import { useState } from "react";

export default function EmptyBoardsState() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
      <h3 className="text-2xl font-bold mb-4">No boards found</h3>
      <p className="mb-6">
        Try adjusting your search or create a new board to get started.
      </p>
      <Button
        onClick={() => setOpen(true)}
        className="font-bold border-3 border-black bg-[#FFE156] hover:bg-[#FFD923] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create New Board
      </Button>
      <CreateNewBoard open={open} onCancel={() => setOpen(false)} />
    </div>
  );
}
