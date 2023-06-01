import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments: Record<string, any>[];
}
const CommentFeed = ({ comments }: CommentFeedProps) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
