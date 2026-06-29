import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { updateAvatar, updateCoverImage, currentUser } from "../../services/user.api"

const EditProfilePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  const [avatarPreview, setAvatarPreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [coverLoading, setCoverLoading] = useState(false)

  const avatarInputRef = useRef(null)
  const coverInputRef = useRef(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await currentUser()
        setUser(userData)
        setFullname(userData.fullname || "")
        setUsername(userData.username || "")
        setEmail(userData.email || "")
        setBio(userData.bio || "")
        setAvatarPreview(userData.avatar || null)
        setCoverPreview(userData.coverImage || null)
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }
    fetchUser()
  }, [])

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Show local preview immediately
    setAvatarPreview(URL.createObjectURL(file))
    setAvatarLoading(true)
    try {
      const updatedUser = await updateAvatar(file)
      setAvatarPreview(updatedUser.avatar)
    } catch (error) {
      console.error("Avatar update failed:", error)
      // Revert preview on failure
      setAvatarPreview(user?.avatar || null)
    } finally {
      setAvatarLoading(false)
    }
  }

  const handleCoverChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Show local preview immediately
    setCoverPreview(URL.createObjectURL(file))
    setCoverLoading(true)
    try {
      const updatedUser = await updateCoverImage(file)
      setCoverPreview(updatedUser.coverImage)
    } catch (error) {
      console.error("Cover image update failed:", error)
      // Revert preview on failure
      setCoverPreview(user?.coverImage || null)
    } finally {
      setCoverLoading(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return "?"
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pb-12">

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#222]">
        <button
          onClick={() => navigate("/profile")}
          className="text-[#aaa] text-xl bg-transparent border-none cursor-pointer"
        >
          ←
        </button>
        <h1 className="text-lg font-medium m-0">Edit profile</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-8">

        {/* Avatar + Cover card */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden mb-6">

          {/* Cover image */}
          <div
            className="w-full h-24 relative group cursor-pointer"
            style={{
              background: coverPreview
                ? `url(${coverPreview}) center/cover no-repeat`
                : "linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)",
            }}
            onClick={() => coverInputRef.current.click()}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {coverLoading
                ? <span className="text-sm text-white">Uploading...</span>
                : <span className="text-sm text-white">Change cover</span>
              }
            </div>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={handleCoverChange}
              className="hidden"
            />
          </div>

          {/* Avatar row */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div
              className="relative cursor-pointer group"
              onClick={() => avatarInputRef.current.click()}
            >
              <div className="w-16 h-16 rounded-full bg-[#e24b4a] border-[3px] border-[#0f0f0f] flex items-center justify-center text-xl font-medium overflow-hidden">
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                  : <span>{getInitials(fullname)}</span>
                }
              </div>
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                {avatarLoading ? "⏳" : "📷"}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-0.5">{fullname || "—"}</p>
              <p className="text-xs text-[#aaa]">@{username || "—"}</p>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              onClick={() => avatarInputRef.current.click()}
              className="ml-auto bg-transparent border border-[#555] text-white text-xs px-4 py-1.5 rounded-full cursor-pointer"
            >
              {avatarLoading ? "Uploading..." : "Change photo"}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">

          {/* Full name */}
          <div>
            <label className="block text-sm text-[#aaa] mb-1.5">Full name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#e24b4a] text-white text-sm px-4 py-2.5 rounded-lg outline-none"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm text-[#aaa] mb-1.5">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa] text-sm">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#e24b4a] text-white text-sm pl-7 pr-4 py-2.5 rounded-lg outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-[#aaa] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#e24b4a] text-white text-sm px-4 py-2.5 rounded-lg outline-none"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-[#aaa] mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={150}
              placeholder="Tell viewers about your channel..."
              className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#e24b4a] text-white text-sm px-4 py-2.5 rounded-lg outline-none resize-none"
            />
            <p className="text-xs text-[#555] text-right mt-1">{bio.length} / 150</p>
          </div>

          {/* Change password */}
          <div className="border-t border-[#222] pt-5">
            <p className="text-sm text-[#aaa] mb-2">Password</p>
            <button className="w-full text-left bg-transparent border border-[#555] text-white text-sm px-4 py-2.5 rounded-lg cursor-pointer">
              🔒 Change password
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 bg-transparent border border-[#555] text-white text-sm py-2.5 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button className="flex-1 bg-[#e24b4a] border-none text-white text-sm py-2.5 rounded-lg cursor-pointer font-medium">
              Save changes
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditProfilePage
