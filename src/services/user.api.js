import { api } from "./axiosInstance.js"

export async function loginUser(username, password) {
  const response = await api.post("/users/login", { username, password })
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
  return response.data
}
