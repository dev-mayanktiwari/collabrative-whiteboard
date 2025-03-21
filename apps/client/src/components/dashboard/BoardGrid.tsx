import BoardCard from "./BoardCard";

export default function BoardGrid({ boards, onOpenBoard, onDeleteBoard }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onOpenBoard={onOpenBoard}
          onDeleteBoard={onDeleteBoard}
        />
      ))}
    </div>
  );
}
