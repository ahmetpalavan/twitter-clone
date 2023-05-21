import { useRouter } from "next/router";
import React from "react";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "@/hooks/useLoginModalnext-13";

const SidebarTweetButton = () => {
  const { push } = useRouter();
  const loginModal = useLoginModal();

  const onClick = () => {
    loginModal.open();
  }

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather color="white" size={24} />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
        <p className="text-center font-semibold text-white text-[20px]">Tweet</p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
