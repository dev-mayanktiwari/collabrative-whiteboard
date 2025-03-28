import { Button } from "@repo/ui";
import { Edit, MoreVertical, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { formatDate } from "../../utils/formatters";
import CopyToClipboard from "./CopyToClipboard";

export default function BoardCard({
  board,
  onOpenBoard,
  onDeleteBoard,
  onRenameBoard,
}) {
  return (
    <div
      className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
      style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
    >
      <div className="relative">
        <div className="w-full flex justify-center items-center h-40 bg-gradient-to-r from-yellow-500 to-pink-200 text-white text-center text-2xl font-bold border-b-4 border-black">
          {board.title}
        </div>
        {/* <img
          data-src={`holder.js/300x200`}
          alt={board.title}
          className="w-full h-40 object-cover border-b-4 border-black"
        /> */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="noShadow"
                size="icon"
                className="h-8 w-8 border-2 border-black bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <DropdownMenuItem
                className="font-medium"
                onClick={() => onRenameBoard(board)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-medium"
                onClick={() => CopyToClipboard({ url: String(board.boardId) })}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="font-medium text-red-500"
                onClick={() => onDeleteBoard(board)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{board.title}</h3>
        <p className="text-sm text-gray-600">
          Last edited: {formatDate(board.lastEdited)}
        </p>
        <Button
          onClick={() => onOpenBoard(board.boardId)}
          className="w-full mt-4 font-bold border-2 border-black bg-[#A0D2EB] hover:bg-[#8BC0E0] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Open Board
        </Button>
      </div>
    </div>
  );
}
