import { useCurrentUser } from "@/hooks/useCurrentUsernext-13";
import useLoginModal from "@/hooks/useLoginModalnext-13";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IconType } from "react-icons";


interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem = ({ label, href, icon: Icon, onClick, auth }: SidebarItemProps) => {
  const loginModal = useLoginModal();
  const { push } = useRouter();
  const { data: currentUser } = useCurrentUser();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (auth && !currentUser) {
      loginModal.open();
      toast.error("You must login first");
      return;
    } else if (href) {
      push(href);
    }
  };
  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" onClick={onClick} />
      </div>
      <div
        className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      "
      >
        <Icon size={24} color="white" />
        <p className="hidden text-white lg:block text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
