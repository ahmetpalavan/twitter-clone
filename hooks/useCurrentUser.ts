import useSwr from "swr";
import { fetcher } from "@/libs/fetchernext-13";

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/current", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
