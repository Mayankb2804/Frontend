import { api } from "./axiosInstance.js"

export async function loginUser(email, password) {
  const response = await api.post("/users/login", { email, password })
  return response.data.data.user
}

export async function logoutUser() {
  await api.post("/users/logout")
}

export async function currentUser() {
  const response = await api.get("/users/current-user")
  return response.data.data
}

export async function signUp({ email, password, username, fullname, avatar, coverImage }) {
  const formData = new FormData()
  formData.append("fullname", fullname)
  formData.append("username", username)
  formData.append("email", email)
  formData.append("password", password)
  formData.append("avatar", avatar)
  if (coverImage) {
    formData.append("coverImage", coverImage)
  }
  const response = await api.post("/users/register", formData)
  return response.data.data.user
}

export async function deleteAccount() {
  const response = await api.delete("/users/delete-account")
  return response.data
}

export async function updateAccountDetails({ fullname, username, email }) {
  const response = await api.patch("/users/update-account-details", { fullname, username, email })
  return response.data.data
} 

export async function changePassword({ oldPassword, newPassword }) {
  await api.post("/users/change-password", { oldPassword, newPassword })
  return true
}

export async function updateAvatar(avatar) {
  const formData = new FormData()
  formData.append("avatar", avatar)
  const response = await api.patch("/users/avatar", formData)
  return response.data.data.user
}

export async function updateCoverImage(coverImage) {
  const formData = new FormData()
  formData.append("coverImage", coverImage)
  const response = await api.patch("/users/cover-image", formData)
  return response.data.data.user
}

export async function getUserProfile({username}){
  const response = await api.get(`/users/c/${username}`);
  return response.data.data
}

export async function getChannelStats() {
  const response = await api.get("/dashboard/stats");
  return response.data.data;
}



//videos
export async function publishVideo({title, description, videoFile, thumbnail, onProgress}){
  const formdata = new FormData()
  formdata.append("title", title)
  formdata.append("description", description)
  formdata.append("videoFile", videoFile)
  formdata.append("thumbnail", thumbnail)
  const response = await api.post("/videos", formdata, {
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      if (onProgress) onProgress(percent)
    }
  })
  return response.data.data
}

export async function getChannelVideos() {
  const response = await api.get("/dashboard/videos")
  return response.data.data
}

export async function getAllVideos() {
  const response = await api.get("/videos/")
  return response.data.data
}

export async function getVideoById(videoId) {
  const response = await api.get(`/videos/${videoId}`)
  return response.data.data
}
 
export async function deleteVideo({videoId}) {
  const response = await api.delete(`/videos/${videoId}`)
  return response.data.data
}

export async function togglePublishBtn({videoId}) {
  const response = await api.patch(`/videos/toggle/publish/${videoId}`)
  return response.data.data
}

export async function updateVideo({videoId, title, description, thumbnail}) {
  const formData = new FormData();
  if (title) formData.append("title", title)
  if (description) formData.append("description", description)
  if (thumbnail) formData.append("thumbnail", thumbnail)
  const response = await api.patch(`/videos/${videoId}`, formData)
  return response.data.data
}

//playlists
export async function getUserPlaylists() {
  const user = await currentUser();
  const response = await api.get(`/playlist/user/${user._id}`)
  return response.data.data
}

export async function createPlaylist({ name, description }) {
  const response = await api.post("/playlist/", { name, description })
  return response.data.data
}

export async function getPlaylistById(playlistId) {
  const response = await api.get(`/playlist/${playlistId}`)
  return response.data.data
}

export async function addVideoToPlaylist({videoId, playlistId}){
  const response = await api.patch(`/playlist/add/${videoId}/${playlistId}`)
  return response.data.data
}

export async function removeVideoFromPlaylist({videoId, playlistId}){
  const response = await api.patch(`/playlist/remove/${videoId}/${playlistId}`)
  return response.data.data
}

export async function updatePlaylist({name, description, playlistId}) {
  const response = await api.patch(`/playlist/${playlistId}`, { name, description })
  return response.data.data
}

export async function deletePlaylist({playlistId}) {
  const response = await api.delete(`/playlist/${playlistId}`)
  return response.data.data
}



//comments
export async function getCommentsByVideoId({videoId}) {
    const response = await api.get(`/comments/${videoId}`)
    return response.data.data
}

export async function addComment({videoId, content}) {
    const response = await api.post(`/comments/${videoId}`,{content})
    return response.data.data
}

export async function toggleCommentLike(commentId) {
  const response = await api.post(`/likes/toggle/c/${commentId}`)
  return response.data.data
}



//subs
export async function getUserChannelSubscribers({channelId}) {
  const response = await api.get(`/subscriptions/c/${channelId}`)
  return response.data.data
}

export async function toggleSubscribe({channelId}) {
  const response = await api.post(`/subscriptions/c/${channelId}`)
  return response.data.data
}

export async function getUserSubscribedChannels() {
  const user = await currentUser()
  const response = await api.get(`/subscriptions/u/${user._id}`)
  return response.data.data
}



//likes
export async function getAllLikedVideosCount({videoId}) {
  const response = await api.get(`/likes/v/${videoId}`)
  return response.data.data
}

export async function getLikedVideos() {
  const response = await api.get("/likes/videos")
  return response.data.data
}

export async function toggleVideoLike(videoId) {
  const response = await api.post(`/likes/toggle/v/${videoId}`)
  return response.data.data
}