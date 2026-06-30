import { api } from "./axiosInstance.js"

export async function getAllVideos() {
    const response = await api.get("/videos")
    return response.data.data
}

export async function getVideoById(videoId) {
    const response = await api.get(`/videos/${videoId}`)
    return response.data.data
}

export async function publishVideo({ title, description, videoFile, thumbnail }) {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("videoFile", videoFile)
    if (thumbnail) {
        formData.append("thumbnail", thumbnail)
    }
    const response = await api.post("/videos", formData)
    return response.data.data
}

export async function deleteVideo(videoId) {
    const response = await api.delete(`/videos/${videoId}`)
    return response.data
}

export async function togglePublish(videoId) {
    const response = await api.patch(`/videos/toggle/publish/${videoId}`)
    return response.data
}
