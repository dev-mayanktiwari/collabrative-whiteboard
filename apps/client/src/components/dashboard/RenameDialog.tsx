import { Button, Input, Label } from "@repo/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { useState } from "react";

export default function RenameDialog({ boardToRename, onCancel, onConfirm }) {
  const [title, setTitle] = useState("");

  const handleCancel = () => {
    setTitle("");
    onCancel();
  };

  const handleSubmit = () => {
    onConfirm(boardToRename, title);
    setTitle("");
  };


  return (
    <Dialog
      open={!!boardToRename}
      onOpenChange={(open) => !open && handleCancel()}
    >
      <DialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Rename the board "{boardToRename?.title}"
          </DialogTitle>
          <DialogDescription className="text-lg">
            Changed your mind? No worries, you can rename the board here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              New title
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
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 font-bold border-3"
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
