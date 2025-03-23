/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "~/api/apiClient";
import { TGetRoomShapesInput } from "@repo/types";

const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (input: TGetRoomShapesInput) => {
      return apiClient.deleteRoom(input);
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

  const deleteBoard = ({ boardId }: TGetRoomShapesInput) => {
    mutation.mutate({ boardId });
  };

  return {
    deleteBoard: deleteBoard,
    errorMessage,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};

export default useDeleteBoard;
