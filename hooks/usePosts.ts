import { fetcher } from "@/libs/fetchernext-13";
import useSWR from "swr";

const usePosts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/posts", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
