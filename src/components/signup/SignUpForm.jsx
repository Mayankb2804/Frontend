function SignUpForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={props.fullname}
          onChange={props.onFullnameChange}
          required
          className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Username</label>
        <input
          type="text"
          placeholder="Enter a username"
          value={props.username}
          onChange={props.onUsernameChange}
          required
          className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={props.email}
          onChange={props.onEmailChange}
          required
          className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Password</label>
        <input
          type="password"
          placeholder="Enter a password"
          value={props.password}
          onChange={props.onPasswordChange}
          required
          className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Avatar (required)</label>
        <input
          type="file"
          accept="image/*"
          onChange={props.onAvatarChange}
          required
          className="text-sm text-[#aaa]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#aaa]">Cover Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={props.onCoverImageChange}
          className="text-sm text-[#aaa]"
        />
      </div>

      <button
        type="submit"
        disabled={props.loading}
        className="mt-2 rounded-full bg-[#3ea6ff] py-3 text-sm font-semibold text-black transition-colors hover:bg-[#65b8ff] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {props.loading ? "Creating account..." : "Create account"}
      </button>

    </form>
  )
}

export default SignUpForm
