import { useUser } from "../../context/UserContext";
import SignIn from "../user/SignIn";
import UserProfile from "../user/UserProfile";
import CreateButton from "./CreateButton";
import NotificationButton from "./NotificationButton";

const LastNavPart = () => {
  const { user } = useUser();

  return (
    <div className="flex h-full shrink-0 items-center gap-1 text-white sm:gap-2">
      <CreateButton />
      <NotificationButton />
      <div>
        {user ? <UserProfile /> : <SignIn />}
      </div>
    </div>
  );
};

export default LastNavPart;
