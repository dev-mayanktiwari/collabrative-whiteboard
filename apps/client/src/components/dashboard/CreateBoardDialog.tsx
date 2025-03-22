import { Button, Input, Label } from "@repo/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { useEffect, useState } from "react";
import useCreateBoard from "~/hooks/useCreateBoard";

export default function CreateNewBoard({ open, onCancel }) {
  const [title, setTitle] = useState("");
  const { createBoard, errorMessage, isLoading, isError, isSuccess, reset } =
    useCreateBoard();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
    }
  }, [isSuccess, reset]);

  const handleCancel = () => {
    setTitle("");
    reset();
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Create a new board
          </DialogTitle>
          <DialogDescription className="text-lg">
            Create a new board to express your creativity.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title of board
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of the board"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-4 mt-4">
          <Button
            variant="noShadow"
            onClick={handleCancel}
            className="flex-1 font-bold border-3 border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={() => createBoard({ name: title })}
            className="flex-1 font-bold border-3"
          >
            {isLoading ? "Creating" : "Create"}
          </Button>
          {isError && (
            <p className="text-red-500 text-sm col-span-4">{errorMessage}</p>
          )}
          {isSuccess && (
            <p className="text-green-500 text-sm col-span-4">
              Board created successfully
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
