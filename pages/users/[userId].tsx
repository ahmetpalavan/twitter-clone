import Header from "@/components/Headernext-13";
import UserBio from "@/components/UserBionext-13";
import UserHero from "@/components/UserHeronext-13";
import useUser from "@/hooks/useUsernext-13";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (!fetchedUser || isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={fetchedUser.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;
