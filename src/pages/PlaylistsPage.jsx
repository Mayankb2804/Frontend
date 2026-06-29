import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"

const PLAYLISTS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  name: `Playlist Name ${i + 1}`,
  count: Math.floor(Math.random() * 30) + 2,
}))

const PlaylistsPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Playlists"
          subtitle={`${PLAYLISTS.length} playlists`}
          action={
            <button className="flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] text-white text-sm px-4 py-2 rounded-full transition-colors border-none cursor-pointer">
              <span className="text-lg leading-none">+</span>
              New playlist
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden cursor-pointer hover:border-[#444] transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video bg-[#272727]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
                <div className="absolute top-2 left-2 right-2 h-1.5 bg-white/10 rounded-sm" />
                <div className="absolute top-4 left-3 right-3 h-1.5 bg-white/10 rounded-sm" />
                <div className="absolute bottom-0 right-0 bg-black/80 text-white text-xs px-2 py-1 flex items-center gap-1">
                  <span>▶</span>
                  <span>{pl.count} videos</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <p className="text-white text-sm font-medium mb-1 group-hover:text-[#ccc] transition-colors">
                  {pl.name}
                </p>
                <p className="text-[#aaa] text-xs mb-3">View full playlist</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#555] text-xs">Updated 3 days ago</span>
                  <button className="text-[#aaa] hover:text-white text-sm bg-transparent border-none cursor-pointer">⋮</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default PlaylistsPage
