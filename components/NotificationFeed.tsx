import { BsTwitter } from "react-icons/bs";

import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUsernext-13";
import { useNotifications } from "@/hooks/useNotificationsnext-13";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
  console.log(fetchedNotifications, "fetchedNotifications", currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0 || !currentUser) {
    return <div className="text-neutral-600 text-center p-6 text-xl">No notifications</div>;
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
