import useUser from "@/hooks/useUsernext-13";
import Image from "next/image";
import { useRouter } from "next/router";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
  const { push } = useRouter();
  const { data: fetchedUser } = useUser(userId);
  const onClick = (event: any) => {
    event.stopPropagation();
    const url = `/users/${userId}`;
    push(url);
  };

  return (
    <div
      className={`
    ${hasBorder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-12"}
    ${isLarge ? "w-32" : "w-12"}
    rounded-full 
    hover:opacity-90 
    transition 
    cursor-pointer
    relative
  `}
    >
      <Image
        src={
          fetchedUser?.profileImage || "https://github.com/AntonioErdeljac/twitter-clone/blob/master/public/images/placeholder.png?raw=true"
        }
        alt="avatar"
        fill
        onClick={onClick}
        style={{
          borderRadius: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Avatar;
