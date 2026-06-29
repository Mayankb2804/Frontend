import PageWrapper from "../components/shared/PageWrapper"

const SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: "👤", label: "Personal info", desc: "Name, email, profile photo" },
      { icon: "🔒", label: "Privacy & security", desc: "Password, two-factor auth" },
      { icon: "🔔", label: "Notifications", desc: "Push, email, and SMS preferences" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "🌙", label: "Appearance", desc: "Dark mode, theme" },
      { icon: "🌐", label: "Language & region", desc: "Language, location, timezone" },
      { icon: "⌨️", label: "Keyboard shortcuts", desc: "Customize hotkeys" },
    ],
  },
  {
    title: "Playback",
    items: [
      { icon: "▶️", label: "Playback & performance", desc: "Autoplay, quality, speed" },
      { icon: "💬", label: "Subtitles & captions", desc: "Language, size, style" },
    ],
  },
  {
    title: "Data & privacy",
    items: [
      { icon: "📊", label: "Your data in YouTube", desc: "Manage your activity" },
      { icon: "🗑️", label: "Delete account", desc: "Permanently remove your account", danger: true },
    ],
  },
]

const SettingsPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-white mb-8">Settings</h1>

        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-3">{section.title}</p>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
                {section.items.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#222] transition-colors ${
                      i !== section.items.length - 1 ? "border-b border-[#2a2a2a]" : ""
                    }`}
                  >
                    <span className="text-xl w-7 text-center">{item.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${item.danger ? "text-red-400" : "text-white"}`}>{item.label}</p>
                      <p className="text-xs text-[#aaa] mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-[#555] text-sm">›</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#444] mt-10">YouTube Clone · v1.0.0</p>
      </div>
    </PageWrapper>
  )
}

export default SettingsPage
