import { useState } from "react"
import { useNavigate } from "react-router-dom"

const EditProfilePage = () => {
  const navigate = useNavigate()
  const [fullname, setFullname] = useState("Mayank Bansal")
  const [username, setUsername] = useState("mbdon12")
  const [email, setEmail] = useState("mayank@example.com")
  const [bio, setBio] = useState("")

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

          {/* Cover */}
          <div className="w-full h-24 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative group cursor-pointer">
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm text-white">Change cover</span>
            </div>
          </div>

          {/* Avatar row */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="relative cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-[#e24b4a] border-[3px] border-[#0f0f0f] flex items-center justify-center text-xl font-medium">
                MB
              </div>
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                📷
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-0.5">Mayank Bansal</p>
              <p className="text-xs text-[#aaa]">@mbdon12</p>
            </div>
            <button className="ml-auto bg-transparent border border-[#555] text-white text-xs px-4 py-1.5 rounded-full cursor-pointer">
              Change photo
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