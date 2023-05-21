import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  label: string;
  showBackArrow?: boolean;
}

const Header = ({ label, showBackArrow }: Props) => {
  const { push } = useRouter();
  const handleBack = useCallback(() => {
    push("/");
  }, [push]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack color="white" size={20} onClick={handleBack} className="cursor-pointer hover:opacity-70 transition" />
        )}
        <p className="text-white text-xl font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default Header;
