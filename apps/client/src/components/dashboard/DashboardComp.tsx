import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import SearchBar from "./Searchbar";
import ViewToggle from "./ViewToggle";
import BoardGrid from "./BoardGrid";
import BoardList from "./BoardList";
import DeleteBoardDialog from "./DeleteBoardDialog";
import EmptyBoardsState from "./EmptyBoardState";
import useFetchBoards from "~/hooks/useFetchRooms";
import useDeleteBoard from "~/hooks/useDeleteBoard";
import useCreateBoard from "~/hooks/useCreateBoard";
import { useToast } from "@repo/ui";
import CreateNewBoard from "./CreateBoardDialog";
import useRenameBoard from "~/hooks/useRenameBoard";
import RenameDialog from "./RenameDialog";

export default function DashboardFull() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // UI state
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);
  const [boardToRename, setBoardToRename] = useState(null);

  // Fetch boards hook
  const { data, isPending, isError: isFetchError } = useFetchBoards();
  const boards = data?.data?.rooms || [];

  // Delete board hook
  const {
    deleteBoard,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: resetDelete,
  } = useDeleteBoard();

  // Create board hook
  const {
    createBoard,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    errorMessage: createErrorMessage,
    reset: resetCreate,
  } = useCreateBoard();

  // Rename board hook
  const {
    renameBoard,
    isSuccess: isRenameSuccess,
    isError: isRenameError,
    errorMessage: renameErrorMessage,
    reset: resetRename,
  } = useRenameBoard();

  // Filter boards based on search query
  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle board deletion
  const handleDeleteBoard = (board) => {
    setBoardToDelete(board);
  };

  const confirmDelete = () => {
    if (boardToDelete) {
      deleteBoard({ boardId: boardToDelete.boardId });
    }
  };

  // Handle board creation
  const handleCreateNewBoard = (title) => {
    if (title.trim()) {
      createBoard({ name: title });
    }
  };

  // Handle board renaming
  const handleBoardRename = (board) => {
    setBoardToRename(board);
  };

  const confirmRename = (board, newName) => {
    console.log("confirmRename", board, newName);
    if (newName.trim()) {
      renameBoard({ roomId: board.boardId, newName });
    }
  };

  // Effects for handling success/error states

  // Delete board success
  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        description: "Board deleted successfully.",
        duration: 5000,
      });
      resetDelete();
      setBoardToDelete(null);
    }
  }, [isDeleteSuccess, toast, resetDelete]);

  // Delete board error
  useEffect(() => {
    if (isDeleteError) {
      toast({
        variant: "destructive",
        description: "Failed to delete the board.",
        duration: 5000,
      });
      resetDelete();
      setBoardToDelete(null);
    }
  }, [isDeleteError, toast, resetDelete]);

  // Create board success
  useEffect(() => {
    if (isCreateSuccess) {
      toast({
        description: "Board created successfully.",
        duration: 5000,
      });
      setIsCreateBoardDialogOpen(false);
      resetCreate();
    }
  }, [isCreateSuccess, toast, resetCreate]);

  // Create board error
  useEffect(() => {
    if (isCreateError) {
      toast({
        variant: "destructive",
        description: `Failed to create board: ${createErrorMessage || "Unknown error"}`,
        duration: 5000,
      });
      resetCreate();
    }
  }, [isCreateError, createErrorMessage, toast, resetCreate]);

  // Rename board success
  useEffect(() => {
    if (isRenameSuccess) {
      toast({
        description: "Board renamed successfully.",
        duration: 5000,
      });
      resetRename();
      setBoardToRename(null);
    }
  }, [isRenameSuccess, toast, resetRename]);

  // Rename board error
  useEffect(() => {
    if (isRenameError) {
      toast({
        variant: "destructive",
        description: `Failed to rename board: ${renameErrorMessage || "Unknown error"}`,
        duration: 5000,
      });
      resetRename();
      setBoardToRename(null);
    }
  }, [isRenameError, renameErrorMessage, toast, resetRename]);

  return (
    <div className="p-6 bg-bg container mx-auto">
      <DashboardHeader
        handleOpenCreateBoard={() => setIsCreateBoardDialogOpen(true)}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {isPending ? (
        <p>Loading boards...</p>
      ) : isFetchError ? (
        <p className="text-red-500">Error loading boards.</p>
      ) : filteredBoards.length === 0 ? (
        <EmptyBoardsState
          handleOpenCreateBoard={() => setIsCreateBoardDialogOpen(true)}
        />
      ) : viewMode === "grid" ? (
        <BoardGrid
          boards={filteredBoards}
          onDeleteBoard={handleDeleteBoard}
          onRenameBoard={handleBoardRename}
          onOpenBoard={(id) => navigate(`/board/${id}`)}
        />
      ) : (
        <BoardList
          boards={filteredBoards}
          onDeleteBoard={handleDeleteBoard}
          onRenameBoard={handleBoardRename}
          onOpenBoard={(id) => navigate(`/board/${id}`)}
        />
      )}

      <DeleteBoardDialog
        boardToDelete={boardToDelete}
        onCancel={() => setBoardToDelete(null)}
        onConfirm={confirmDelete}
      />

      <CreateNewBoard
        open={isCreateBoardDialogOpen}
        onCancel={() => {
          setIsCreateBoardDialogOpen(false);
          resetCreate();
        }}
        onConfirm={handleCreateNewBoard}
      />

      <RenameDialog
        boardToRename={boardToRename}
        onCancel={() => {
          setBoardToRename(null);
          resetRename();
        }}
        onConfirm={confirmRename}
      />
    </div>
  );
}
