import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <Link
      to="/signin"
      className="flex h-9 items-center gap-2 rounded-full border border-[#3f3f3f] px-3 text-sm text-[#3ea6ff]"
    >
      <UserRound size={20} />
      Sign in
    </Link>
  );
};

export default SignIn;
