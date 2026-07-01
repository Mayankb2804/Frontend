import PageWrapper from "../components/shared/PageWrapper"
import PageHeader from "../components/shared/PageHeader"
import VideoCard from "../components/shared/VideoCard"
import { useEffect, useState } from "react"
import { currentUser, getUserSubscribedChannels } from "../services/user.api"

// const VIDEOS = Array.from({ length: 10 }, (_, i) => ({
//   id: i,
//   title: `Latest Upload from Subscription ${i + 1}`,
//   channel: `Channel ${i + 1}`,
//   views: `${Math.floor(Math.random() * 900) + 1}K views`,
//   duration: `${Math.floor(Math.random() * 20) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
//   avatar: String.fromCharCode(65 + (i % 26)),
//   avatarBg: "bg-gradient-to-br from-[#e24b4a] to-[#ff6b6b]",
//   badge: i % 4 === 0
//     ? <span className="bg-[#e24b4a] text-white text-xs px-2 py-0.5 rounded font-medium">NEW</span>
//     : null,
// }))

const SubscriptionPage = () => {
  const [channels, setChannels] = useState([])
  const [videos, setVideos] = useState([])
  const[channelsId, setChannelsId] = useState([])

  useEffect(() => {
    const fetchSubsChannels = async () => {
      const user = await currentUser();
      const subscriberId = user._id
      const data = await getUserSubscribedChannels(subscriberId)
      setChannels(data)
       setChannelsId(data.map(item => item.channelId));
    }
    const fetchLatestVIdeos = async () => {

    }
    fetchSubsChannels()
    fetchLatestVIdeos()
  }, [])

  return (

    
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="Subscriptions"
          subtitle={`${channels.length} channels`}
          action={
            <button className="text-sm text-[#3ea6ff] hover:underline bg-transparent border-none cursor-pointer">
              Manage
            </button>
          }
        />

        {/* Channel avatars row */}
        <div className="flex gap-6 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {channels.length ===  0 ? 
          <div className="text-gray-500 font-bold">You're not subscribed to any channels</div>
          :
          channels.map((ch, id) => (
            <div key={id} className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group">
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-transparent group-hover:border-[#e24b4a] transition-all overflow-hidden shrink-0">
                  {ch.avatar ? (
                    <img src={ch.avatar} alt={ch.fullname} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#e24b4a] to-[#ff6b6b] flex items-center justify-center text-white font-bold text-lg">
                      {ch.fullname[0]}
                    </div>
                  )}
                </div>
                {ch.live && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f0f0f]" />
                )}
              </div>
              <p className="text-[#aaa] text-xs text-center w-14 truncate group-hover:text-white transition-colors">
                {ch.fullname} {ch.id + 1}
              </p>
            </div>
          ))}
          
        </div>

        {/* <p className="text-xs font-semibold text-[#aaa] uppercase tracking-wider mb-4">Latest</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div> */}
      </div>
    </PageWrapper>
  )
}

export default SubscriptionPage
