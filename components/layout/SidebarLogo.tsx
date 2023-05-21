import { useRouter } from "next/router";
import React from "react";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const { push } = useRouter();
  return (
    <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 cursor-pointer transition">
      <BsTwitter color="white" size={28} onClick={() => push("/")} />
    </div>
  );
};

export default SidebarLogo;
