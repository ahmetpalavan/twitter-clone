import { toast } from "react-hot-toast";
import { useCurrentUser } from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId: string }) => {
  const { data } = useCurrentUser();
  const { data: dataPost, mutate } = usePost(postId);
  const { mutate: mutateFetch } = usePosts(userId);

  const loginModal = useLoginModal();
  const hasLiked = () => {
    const likes = dataPost?.likedIds || [];
    return likes.includes(data?.id);
  };
  const toggleLike = async () => {
    if (!data) {
      return loginModal.open();
    }
    try {
      const { data: updatedPost } = await axios.post(`/api/likes`, { postId });
      mutate(updatedPost);
      mutateFetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { hasLiked, toggleLike };
};

export default useLike;
