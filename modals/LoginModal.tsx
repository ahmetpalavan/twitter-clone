import React, { useCallback, useState } from "react";
import Input from "@/components/Inputnext-13";
import Modal from "@/components/Modalnext-13";
import useRegisterModal from "@/hooks/useRegisterModalnext-13";
import useLoginModal from "@/hooks/useLoginModalnext-13";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = () => {
    loginModal.close();
    registerModal.open();
  };

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      loginModal.close();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-500 text-center mt-4">
      <p className="text-white">
        First time using Twitter? {""}
        <span className="text-red-200 cursor-pointer underline hover:underline " onClick={onToggle}>
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.close}
      title="Login"
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel="Sign In"
      disabled={isLoading}
      footer={footerContent}
    />
  );
};

export default LoginModal;
