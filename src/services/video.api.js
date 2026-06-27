import { api } from "./axiosInstance.js"

export async function getAllVideos({ page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId = "" } = {}) {
    const params = new URLSearchParams({ page, limit, sortBy, sortType })
    if (query) params.append("query", query)
    if (userId) params.append("userId", userId)
    const response = await api.get(`/videos?${params.toString()}`)
    return response.data.data
}

export async function publishVideo({ title, description, videoFile, thumbnail }) {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("videoFile", videoFile)
    formData.append("thumbnail", thumbnail)
    const response = await api.post("/videos", formData)
    return response.data.data
}

export async function getVideoById(videoId) {
    const response = await api.get(`/videos/${videoId}`)
    return response.data.data
}

export async function deleteVideo(videoId) {
    await api.delete(`/videos/${videoId}`)
    return true
}

export async function togglePublishStatus(videoId) {
    const response = await api.patch(`/videos/toggle/publish/${videoId}`)
    return response.data.data
}
