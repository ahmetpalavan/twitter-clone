import { fetcher } from "@/libs/fetchernext-13";
import useSWR from "swr";

const usePost = (postId: string | undefined) => {
  const url = postId ? `/api/posts/${postId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
