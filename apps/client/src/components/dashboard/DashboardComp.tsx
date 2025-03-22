  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import DashboardHeader from "./DashboardHeader";
  import SearchBar from "./Searchbar";
  import ViewToggle from "./ViewToggle";
  import BoardGrid from "./BoardGrid";
  import BoardList from "./BoardList";
  import DeleteBoardDialog from "./DeleteBoardDialog";
  import EmptyBoardsState from "./EmptyBoardState";
  // import { MOCK_BOARDS } from "../../data/mockData";
  import useFetchBoards from "~/hooks/useFetchRooms";

  export default function DashboardFull() {
    const navigate = useNavigate();
    // const [boards, setBoards] = useState(MOCK_BOARDS);
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [boardToDelete, setBoardToDelete] = useState(null);

    const { data, isPending, isError } = useFetchBoards();
    console.log("Data: ", data);
    console.warn("Code must run here");
    // Remove the explicit type annotation here
    const boards = data?.data?.rooms || [];

    const filteredBoards = boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // console.log("Boards: ", boards);

    // const filteredBoards = boards.filter((board) =>
    //   board?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // const handleCreateNewBoard = () => {
    //   navigate("/board/new");
    // };

    // Remove the type error by adding parameter type here
    const handleDeleteBoard = (board) => {
      setBoardToDelete(board);
    };

    const confirmDelete = () => {
      // if (boardToDelete) {
      //   setBoards(boards.filter((b) => b.id !== boardToDelete.id));
      //   setBoardToDelete(null);
      // }
    };

    return (
      <div className="p-6 bg-bg container mx-auto">
        <DashboardHeader />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {isPending ? (
          <p>Loading boards...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading boards.</p>
        ) : filteredBoards.length === 0 ? (
          <EmptyBoardsState />
        ) : viewMode === "grid" ? (
          <BoardGrid
            boards={filteredBoards}
            onDeleteBoard={handleDeleteBoard}
            onOpenBoard={(id) => navigate(`/board/${id}`)}
          />
        ) : (
          <BoardList
            boards={filteredBoards}
            onDeleteBoard={handleDeleteBoard}
            onOpenBoard={(id) => navigate(`/board/${id}`)}
          />
        )}

        <DeleteBoardDialog
          boardToDelete={boardToDelete}
          onCancel={() => setBoardToDelete(null)}
          onConfirm={confirmDelete}
        />
      </div>
    );
  }
