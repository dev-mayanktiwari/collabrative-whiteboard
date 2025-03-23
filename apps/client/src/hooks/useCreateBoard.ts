/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateRoomInput } from "@repo/types";
import { useState } from "react";
import apiClient from "~/api/apiClient";

const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (input: TCreateRoomInput) => {
      return apiClient.createRoom(input);
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

  const createBoard = ({ name }: TCreateRoomInput) => {
    mutation.mutate({ name });
  };

  return {
    createBoard: createBoard,
    errorMessage,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};

export default useCreateBoard;
