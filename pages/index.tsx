import Form from "@/components/Formnext-13";
import Header from "@/components/Headernext-13";
import PostFeed from "@/components/posts/PostFeednext-13";
import { useCurrentUser } from "@/hooks/useCurrentUsernext-13";

export default function Home() {
  const { data: postId } = useCurrentUser();
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
