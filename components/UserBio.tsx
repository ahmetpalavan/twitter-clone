import { useCurrentUser } from "@/hooks/useCurrentUsernext-13";
import useUser from "@/hooks/useUsernext-13";
import { useMemo } from "react";
import { format } from "date-fns";
import Button from "./Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModalnext-13";
import useFollow from "@/hooks/useFollownext-13";

interface UserBioProps {
  userId: string;
}

const UserBio = ({ userId }: UserBioProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { isFollowing, toggleFollow } = useFollow(userId);

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button onClick={editModal.openModal} label="Edit Profile" secondary />
        ) : (
          <Button onClick={toggleFollow} label={isFollowing ? "Unfollow" : "Follow"} secondary={!isFollowing} outline={isFollowing} />
        )}
      </div>
      <div className="mt-8 px-4">
        <h1 className="text-2xl text-white font-bold">{fetchedUser?.name}</h1>
        <p className="text-neutral-500 text-sm mt-1">@{fetchedUser?.name}</p>
        <div className="flex flex-col mt-1">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row gap-1 items-center">
            <p className="text-white font-bold">{fetchedUser?.followingIds?.length || 0}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <p className="text-white font-bold">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
