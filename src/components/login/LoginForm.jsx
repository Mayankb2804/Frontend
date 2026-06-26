const LoginForm = ({ email, password, loading, onEmailChange, onPasswordChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Email</label>
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Enter your email"
          required
          className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Password</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Enter your password"
          required
          className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-full bg-[#3ea6ff] py-3 text-sm font-semibold text-black transition-colors hover:bg-[#65b8ff] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}

export default LoginForm
