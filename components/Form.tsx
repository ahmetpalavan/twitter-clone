import { useCurrentUser } from "@/hooks/useCurrentUsernext-13";
import useLoginModal from "@/hooks/useLoginModalnext-13";
import usePosts from "@/hooks/usePostsnext-13";
import useRegisterModal from "@/hooks/useRegisterModalnext-13";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePostnext-13";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form = ({ placeholder, isComment, postId }: FormProps) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comment?postId=${postId}` : "/api/posts";
      await axios.post(url, { body });
      toast.success("Tweet created");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              className="w-full bg-black font-serif placeholder-neutral-500 text-[20px] outline-none ring-0 text-white disabled:opacity-80 peer resize-none "
              disabled={isLoading}
              placeholder={placeholder}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <hr className="border-neutral-800 opacity-0 peer-focus:opacity-100 h-[1px] w-full transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button onClick={submit} label="Tweet" disabled={isLoading || !body} />
            </div>
          </div>
        </div>
      ) : (
        <div className="gap-y-8">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button onClick={loginModal.open} label="Login" />
            <Button onClick={registerModal.open} label="Register" secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
