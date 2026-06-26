import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { loginUser } from "../services/user.api";
import LoginHeader from "../components/login/LoginHeader";
import LoginError from "../components/login/LoginError";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginUser(username, password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#3f3f3f] bg-[#1a1a1a] p-8">
        <LoginHeader />
        <LoginError message={error} />
        <LoginForm
          username={username}
          password={password}
          loading={loading}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
        />
        <p className="mt-4 text-center text-sm text-[#aaa]">
          New to YouTube?{" "}
          <Link to="/signup" className="text-[#3ea6ff] hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
