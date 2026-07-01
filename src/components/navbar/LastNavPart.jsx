import { useUser } from "../../context/UserContext";
import SignIn from "../user/SignIn";
import UserProfile from "../user/UserProfile";

const LastNavPart = () => {
  const { user } = useUser();

  return (
    <div className="flex h-full shrink-0 items-center gap-1 text-white sm:gap-2">
      <div>
        {user ? <UserProfile /> : <SignIn />}
      </div>
    </div>
  );
};

export default LastNavPart;
