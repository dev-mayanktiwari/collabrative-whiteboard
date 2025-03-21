import BoardListItem from "./BoardListItem";

export default function BoardList({ boards, onOpenBoard, onDeleteBoard }) {
  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      {boards.map((board, index) => (
        <BoardListItem
          key={board.id}
          board={board}
          onOpenBoard={onOpenBoard}
          onDeleteBoard={onDeleteBoard}
          isLast={index === boards.length - 1}
        />
      ))}
    </div>
  );
}
