import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useFetchBoards = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const query = useQuery({
    queryKey: "getBoards",
    
  })
};

export default useFetchBoards;
