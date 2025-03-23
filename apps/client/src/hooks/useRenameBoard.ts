/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "~/api/apiClient";
import { TRenameRoomInput } from "@repo/types";

const useRenameBoard = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: ({ newName, roomId }: TRenameRoomInput) => {
      return apiClient.renameRoom(roomId, newName);
    },
    onError: (error: any) => {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    },
    onSuccess: () => {
      setErrorMessage(null);
      queryClient.invalidateQueries({
        queryKey: ["getBoards"],
      });
    },
  });

  const renameBoard = ({ roomId, newName }: TRenameRoomInput) => {
    mutation.mutate({ roomId, newName });
  };

  return {
    renameBoard: renameBoard,
    errorMessage,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useRenameBoard;
