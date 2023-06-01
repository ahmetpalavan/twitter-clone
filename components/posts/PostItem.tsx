import { useCurrentUser } from "@/hooks/useCurrentUsernext-13";
import useLoginModal from "@/hooks/useLoginModalnext-13";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";
import Avatar from "../Avatar";
import useLike from "@/hooks/useLikenext-13";

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem = ({ data, userId }: PostItemProps) => {
  console.log(data, "data");
  const { push } = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId: data.user.id });
  const goToUser = (e: any) => {
    e.stopPropagation();
    push(`/users/${data.user.id}`);
  };

  const goToPost = (e: any) => {
    e.stopPropagation();
    push(`/posts/${data.id}`);
  };

  const onLike = (e: any) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.open();
    }
    toggleLike();
  };

  const createdAt = (date: string) => {
    return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
  };

  const LikeIcon = hasLiked() ? AiFillHeart : AiOutlineHeart;

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-800 transition" onClick={goToPost}>
      <div className="flex flex-row items-start gap-4">
        <Avatar userId={data?.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <span onClick={goToUser} className="font-bold text-neutral-100 cursor-pointer hover:underline">
              {data?.user.name}
            </span>
            <span onClick={goToUser} className="text-neutral-500 text-sm hidden md:block cursor-pointer">
              @{data.user.name}
            </span>
            <span className="text-neutral-500 text-sm">{data?.createdAt && createdAt(data?.createdAt)}</span>
          </div>
          <div className="text-neutral-100 mt-1">{data?.body}</div>
          <div className="flex flex-row items-center mt-2 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <span>{data?.comments?.length}</span>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked() ? "red" : ""} />
              <span>{data?.likedIds?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
