import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { signUp } from "../services/user.api"

function SignUpPage() {
  const navigate = useNavigate()

  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signUp({ fullname, username, email, password, avatar, coverImage })
      navigate("/signin")
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#3f3f3f] bg-[#1a1a1a] p-8">

        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <img src="/youtube.png" alt="YouTube" className="h-8 w-11 rounded-md object-cover" />
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="text-sm text-[#aaa]">to continue to YouTube</p>
        </div>

        {/* Error */}
        {error !== "" && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#aaa]">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#aaa]">Username</label>
            <input
              type="text"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#aaa]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#aaa]">Password</label>
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border border-[#3f3f3f] bg-[#121212] px-4 py-3 text-sm text-white outline-none placeholder:text-[#555] focus:border-[#1c62b9]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#aaa]">Avatar (required)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
              className="text-sm text-[#aaa]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#aaa]">Cover Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="text-sm text-[#aaa]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-[#3ea6ff] py-3 text-sm font-semibold text-black transition-colors hover:bg-[#65b8ff] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        {/* Link to sign in */}
        <p className="mt-4 text-center text-sm text-[#aaa]">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#3ea6ff] hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignUpPage
