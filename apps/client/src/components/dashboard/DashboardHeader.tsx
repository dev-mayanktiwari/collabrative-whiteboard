import { Plus } from "lucide-react";
import { Button } from "@repo/ui";

export default function DashboardHeader({ handleOpenCreateBoard }) {
  return (
    <div className="flex  md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-black mb-2">
          <span className="bg-[#B8E0D2] px-3 py-1 inline-block transform -rotate-1">
            Your Boards
          </span>
        </h2>
        <p className="text-lg">
          Create, manage, and collaborate on your drawing boards
        </p>
      </div>

      <Button
        onClick={() => handleOpenCreateBoard(true)}
        className="font-bold border-3 border-black bg-[#FF90B3] hover:bg-[#FF7DA6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <Plus className="h-5 w-5 mr-2" />
        New Board
      </Button>

      {/* <CreateNewBoard open={open} onCancel={() => setOpen(false)} onConfirm={handleOnCreateBoard}/> */}
    </div>
  );
}
