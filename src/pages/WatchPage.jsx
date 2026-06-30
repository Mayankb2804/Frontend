import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PageWrapper from "../components/shared/PageWrapper"
import VideoRow from "../components/shared/VideoRow"
import { getCommentsByVideoId, getVideoById, getUserProfile, getAllLikedVideosCount, toggleVideoLike, addComment, currentUser, toggleCommentLike, toggleSubscribe } from "../services/user.api"
import { Component } from "lucide-react"

const RECOMMENDED = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Recommended Video Title ${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 1}K views`,
  duration: `${Math.floor(Math.random() * 20) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
}))

const WatchPage = () => {
  const { videoId } = useParams()
  const [video, setVideo] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const[comments, setComments] = useState([])
  const[newComment, setNewComment] = useState("")
  const[likeCount, setLikeCount] = useState(0)
  const[isLiked, setIsLiked] = useState(false)
  const[loggedInUser, setLoggedInUser] = useState(null)
  const[subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    currentUser().then(setLoggedInUser).catch(() => {})
  }, [])

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true)
      setError("")
      try {
        const data = await getVideoById(videoId)
        setVideo(data)

        try {
          const likeData = await getAllLikedVideosCount({ videoId })
          setLikeCount(likeData?.likeCount ?? 0)
          setIsLiked(likeData?.isLiked ?? false)
        } catch (err) {
          console.error("Failed to fetch like count:", err)
        }

        if (data?.owner?.username) {
          try {
            const profile = await getUserProfile({ username: data.owner.username })
            setChannel(profile)
            setSubscribed(profile?.isSubscribed ?? false)
          } catch (err) {
            console.error("Failed to fetch channel profile:", err)
          }
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load video")
      } finally {
        setLoading(false)
      }
    }
    const fetchComments = async () => {
      try {
        const data = await getCommentsByVideoId({ videoId })
        // attach per-comment like state, since the backend doesn't return it with the comment list
        const withLikeState = (data || []).map((c) => ({
          ...c,
          likeCount: c.likeCount ?? 0,
          isLiked: c.isLiked ?? false,
        }))
        setComments(withLikeState)
      } catch (error) {
        setError(error?.response?.data?.message || "Failed to load Comments")
      }
    }
    if (videoId) {
      fetchVideo()
      fetchComments()
    }
  }, [videoId])
 
  
  const toggleSubscriptionBtn = async (e) => {
    if (!channel?._id) return
    const channelId = channel._id
    try {
      const subsStatus = await toggleSubscribe({channelId})
      const nowSubscribed = subsStatus?.subscribed ?? false
      setSubscribed(nowSubscribed)
      setChannel((prev) => prev ? {
        ...prev,
        subscribersCount: (prev.subscribersCount ?? 0) + (nowSubscribed ? 1 : -1)
      } : prev)
    } catch (err) {
      console.error("Failed to toggle subscription:", err)
    }
  }
  
  const addNewComment = async (e) => {
    try {
      if(e.key === 'Enter'){
        const content = newComment;
        const response = await addComment({videoId, content})
        setNewComment("")
        // The backend returns a raw comment doc (owner is just an id string),
        // so attach the logged-in user's own details for immediate display.
        const displayComment = {
          ...response,
          owner: {
            _id: loggedInUser?._id,
            username: loggedInUser?.username,
            fullname: loggedInUser?.fullname,
            avatar: loggedInUser?.avatar,
          },
          likeCount: 0,
          isLiked: false,
        }
        setComments((prev) => [...prev, displayComment])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeToggle = async () => {
    if (!videoId) return
    // optimistic update
    const wasLiked = isLiked
    setIsLiked(!wasLiked)
    setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1))
    try {
      await toggleVideoLike(videoId)
    } catch (err) {
      // revert on failure
      setIsLiked(wasLiked)
      setLikeCount((prev) => (wasLiked ? prev + 1 : prev - 1))
      console.error("Failed to toggle like:", err)
    }
  }

  const handleLikeToggleComment = async (commentId) => {
    if (!commentId) return

    const target = comments.find((c) => c._id === commentId)
    const wasLiked = target?.isLiked ?? false

    // optimistic update — only the clicked comment changes
    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId
          ? { ...c, isLiked: !wasLiked, likeCount: wasLiked ? c.likeCount - 1 : c.likeCount + 1 }
          : c
      )
    )

    try {
      await toggleCommentLike(commentId)
    } catch (err) {
      // revert only this comment on failure
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, isLiked: wasLiked, likeCount: wasLiked ? c.likeCount + 1 : c.likeCount - 1 }
            : c
        )
      )
      console.error("Failed to toggle comment like:", err)
    }
  }
  return (
    <PageWrapper>
      <div className="max-w-[1400px] mx-auto px-4 py-6 flex flex-col xl:flex-row gap-6">

        {/* ── Left: Player + Info ── */}
        <div className="flex-1 min-w-0">

          {/* Player */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                Loading video...
              </div>
            ) : error || !video?.videoFile ? (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-white/30">
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-4xl">▶</div>
                  <p className="text-sm">{error || "Video unavailable"}</p>
                </div>
              </div>
            ) : (
              <video
                key={video._id}
                src={video.videoFile}
                poster={video.thumbnail}
                controls
                className="w-full h-full bg-black"
              />
            )}
          </div>

          {/* Title + actions */}
          <h1 className="text-white text-lg font-semibold mb-2 leading-snug">
            {video?.title || "Video Title — Full Episode or Tutorial Name Goes Here"}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <p className="text-[#aaa] text-sm">
              {video ? `${video.views ?? 0} views` : "1.2M views · 3 months ago"}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-colors border-none cursor-pointer ${
                  isLiked ? "bg-white text-black" : "bg-[#272727] hover:bg-[#3f3f3f] text-white"
                }`}
              >
                <span>{isLiked ? "👍" : "👍🏻"}</span>
                <span>{likeCount}</span>
              </button>
              {[["👎", ""], ["↗", "Share"], ["+", "Save"], ["⋯", ""]].map(([icon, label], i) => (
                <button key={i} className="flex items-center gap-1.5 bg-[#272727] hover:bg-[#3f3f3f] text-white text-sm px-4 py-2 rounded-full transition-colors border-none cursor-pointer">
                  {icon}{label && <span>{label}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div className="flex items-center justify-between bg-[#1a1a1a] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e24b4a] flex items-center justify-center text-white font-bold shrink-0 overflow-hidden">
                {video?.owner?.avatar
                  ? <img src={video.owner.avatar} alt="" className="w-full h-full object-cover" />
                  : (video?.owner?.username?.[0]?.toUpperCase() || "C")}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{video?.owner?.username || "Channel Name"}</p>
                <p className="text-[#aaa] text-xs">
                  {channel?.subscribersCount != null ? `${channel.subscribersCount} subscribers` : "..."}
                </p>
              </div>
            </div>
            <button onClick={toggleSubscriptionBtn} className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full border-none cursor-pointer hover:bg-[#e0e0e0] transition-colors">
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          {/* Description */}
          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6 cursor-pointer">
            <p className="text-white text-sm font-medium mb-1">
              {video ? `${video.views ?? 0} views` : "1.2M views · 3 months ago"}
            </p>
            <p className="text-[#aaa] text-sm line-clamp-2">
              {video?.description || "This is the video description. It contains details about the content, links, timestamps, and other relevant information."}
            </p>
            <button className="text-white text-sm font-medium mt-2 bg-transparent border-none cursor-pointer">...more</button>
          </div>

          {/* Comments */}
          <div>
            <h2 className="text-white font-medium mb-5">{comments?.length || "0"} Comments</h2>
            <div className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-[#3ea6ff] shrink-0 flex items-center justify-center text-black font-bold text-sm">U</div>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onKeyDown={addNewComment}
                onChange={(e) => {
                  setNewComment(e.target.value)
                }}

                
                className="flex-1 bg-transparent border-b border-[#333] text-white text-sm py-2 outline-none placeholder:text-[#555] focus:border-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-5">
              {comments.map((c) => (
                <div key={c._id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#272727] shrink-0 flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                    {c.owner?.avatar
                      ? <img src={c.owner.avatar} alt="" className="w-full h-full object-cover" />
                      : (c.owner?.username?.[0]?.toUpperCase() || "?")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white text-sm font-medium">@{c.owner?.username || "unknown"}</p>
                      <p className="text-[#aaa] text-xs">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "just now"}</p>
                    </div>
                    <p className="text-[#e0e0e0] text-sm">{c.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => handleLikeToggleComment(c._id)}
                        className={`text-xs flex items-center gap-1 bg-transparent border-none cursor-pointer ${
                          c.isLiked ? "text-white" : "text-[#aaa] hover:text-white"
                        }`}
                      >
                        {c.isLiked ? "👍" : "👍🏻"} {c.likeCount}
                      </button>
                      <button className="text-[#aaa] text-xs bg-transparent border-none cursor-pointer hover:text-white">👎</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Recommended ── */}
        <div className="w-full xl:w-96 shrink-0">
          <div className="flex flex-col gap-1">
            {RECOMMENDED.map((v) => (
              <VideoRow key={v.id} {...v} thumbWidth="w-40" />
            ))}
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}

export default WatchPage
