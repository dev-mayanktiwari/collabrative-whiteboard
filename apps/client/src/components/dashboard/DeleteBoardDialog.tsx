import { Button } from "@repo/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";

export default function DeleteBoardDialog({
  boardToDelete,
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog open={!!boardToDelete} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Delete Board
          </DialogTitle>
          <DialogDescription className="text-lg">
            Are you sure you want to delete "{boardToDelete?.title}"? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 mt-4">
          <Button
            variant="noShadow"
            onClick={onCancel}
            className="flex-1 font-bold border-3 border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 font-bold border-3 border-black bg-red-500 hover:bg-red-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
