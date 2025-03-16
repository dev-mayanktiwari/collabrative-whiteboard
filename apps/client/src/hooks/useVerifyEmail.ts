/* eslint-disable @typescript-eslint/no-explicit-any */
import { TVerifyEmailInput } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "~/api/apiClient";

const useVerifyEmail = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: ({ token, code }: TVerifyEmailInput) => {
      return apiClient.verifyEmail(token, code);
    },
    onError: (error: any) => {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    },
    onSuccess: () => {
      setErrorMessage(null);
    },
  });

  const verifyEmail = ({ token, code }: TVerifyEmailInput) => {
    mutation.mutate({ token, code });
  };

  return {
    verifyEmail,
    errorMessage,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useVerifyEmail;
