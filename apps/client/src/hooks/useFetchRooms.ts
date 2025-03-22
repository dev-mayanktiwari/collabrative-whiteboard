import { useQuery } from "@tanstack/react-query";
import apiClient from "~/api/apiClient";

const useFetchBoards = () => {
  console.log("Code must run here, useFetchBoards ");
  const { data, isPending, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ["getBoards"],
    queryFn: apiClient.getRooms,
  });

  return {
    data,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  };
};

export default useFetchBoards;
