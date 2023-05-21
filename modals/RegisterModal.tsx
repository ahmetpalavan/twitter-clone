import Input from "@/components/Inputnext-13";
import Modal from "@/components/Modalnext-13";
import useLoginModal from "@/hooks/useLoginModalnext-13";
import useRegisterModal from "@/hooks/useRegisterModalnext-13";
import React, { useState } from "react";

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = () => {
    registerModal.close();
    loginModal.open();
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      registerModal.close();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
      <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
      <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p className="text-white">
        Already have an account?{" "}
        <span className="text-primary-500 cursor-pointer" onClick={onToggle}>
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.close}
      title="Register"
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel="Sign Up"
      disabled={isLoading}
      footer={footerContent}
    />
  );
};
