import { fetcher } from "@/libs/fetchernext-13";
import useSWR from "swr";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
