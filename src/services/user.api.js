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

export async function deleteAccount(params) {
    const response = api.delete("/users/delete-account")
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
  return response.data
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

export async function getAllVideos() {
  const response = await api.get("/videos")
  return response.data.data
}

export async function getLikedVideos() {
  const response = await api.get("/likes/videos")
  return response.data.data
}

//playlists

export async function getUserPlaylists() {
  const user = await currentUser();
  const response = await api.get(`/playlist/user/${user._id}`)
  return response.data.data
}