import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { signUp } from "../services/user.api"
import SignUpHeader from "../components/signup/SignUpHeader"
import SignUpError from "../components/signup/SignUpError"
import SignUpForm from "../components/signup/SignUpForm"

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

        <SignUpHeader />
        <SignUpError message={error} />
        <SignUpForm
          fullname={fullname}
          username={username}
          email={email}
          password={password}
          loading={loading}
          onFullnameChange={(e) => setFullname(e.target.value)}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onAvatarChange={(e) => setAvatar(e.target.files[0])}
          onCoverImageChange={(e) => setCoverImage(e.target.files[0])}
          onSubmit={handleSubmit}
        />

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
