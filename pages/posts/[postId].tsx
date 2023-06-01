import Form from "@/components/Formnext-13";
import Header from "@/components/Headernext-13";
import CommentFeed from "@/components/posts/CommentFeednext-13";
import PostItem from "@/components/posts/PostItemnext-13";
import usePost from "@/hooks/usePostnext-13";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data, isLoading } = usePost(postId as string);

  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={data} />
      <Form postId={postId as string} placeholder="Write a comment..." isComment />
      <CommentFeed comments={data.comments} />
    </>
  );
};

export default PostView;
