import Image from "next/image";
import Avatar from "./Avatar";
import useUser from "@/hooks/useUsernext-13";

interface UserHeroProps {
  userId: string;
}

const UserHero = ({ userId }: UserHeroProps) => {
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            style={{
              objectFit: "cover",
            }}
            src={fetchedUser.coverImage}
            alt=""
            fill
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
