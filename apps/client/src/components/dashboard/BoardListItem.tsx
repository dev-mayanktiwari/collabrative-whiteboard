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

export default function BoardListItem({
  board,
  onOpenBoard,
  onDeleteBoard,
  isLast,
  onRenameBoard,
}) {
  return (
    <div
      className={`flex items-center p-4 ${
        !isLast ? "border-b-2 border-black" : ""
      }`}
    >
      <div className="relative">
        <div className="w-16 h-16  border- mr-4  flex justify-center items-center bg-gradient-to-r from-yellow-500 to-pink-200 text-white text-center text-2xl font-bold border-2 border-black">
          {board.title[0]}
        </div>
      </div>
      {/* <img
        src={board.thumbnail || "/placeholder.svg"}
        alt={board.title}
        className="w-16 h-16 object-cover border-2 border-black mr-4"
      /> */}
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{board.title}</h3>
        <p className="text-sm text-gray-600">
          Last edited: {formatDate(board.lastEdited)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onOpenBoard(board.boardId)}
          className="font-bold border-2 border-black bg-[#A0D2EB]"
        >
          Open
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="noShadow"
              size="icon"
              className="border-2 border-black bg-white hover:bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
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
  );
}
