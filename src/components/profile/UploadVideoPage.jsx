import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import FormField from "../shared/FormField"

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public", desc: "Everyone can watch your video" },
  { value: "unlisted", label: "Unlisted", desc: "Anyone with the link can watch" },
  { value: "private", label: "Private", desc: "Only you can watch" },
]

const UploadVideoPage = () => {
  const navigate = useNavigate()
  const videoInputRef = useRef(null)
  const thumbInputRef = useRef(null)
  const [videoFile, setVideoFile] = useState(null)
  const [thumbPreview, setThumbPreview] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState("public")

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pb-12">

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#222]">
        <button onClick={() => navigate("/profile")} className="text-[#aaa] text-xl bg-transparent border-none cursor-pointer">←</button>
        <h1 className="text-lg font-medium m-0">Upload video</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8">

        {/* Drop zone / file selected */}
        {!videoFile ? (
          <div
            onClick={() => videoInputRef.current.click()}
            className="border-2 border-dashed border-[#333] hover:border-[#e24b4a] rounded-2xl p-16 flex flex-col items-center gap-4 cursor-pointer transition-colors mb-8 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] group-hover:bg-[#e24b4a]/10 flex items-center justify-center text-3xl transition-colors">📁</div>
            <div className="text-center">
              <p className="text-white font-medium mb-1">Drag and drop video files to upload</p>
              <p className="text-[#aaa] text-sm">Your videos will be private until you publish them</p>
            </div>
            <button className="bg-[#e24b4a] text-white text-sm font-medium px-6 py-2.5 rounded-full border-none cursor-pointer hover:bg-[#c73c3b] transition-colors">
              Select file
            </button>
            <input type="file" accept="video/*" ref={videoInputRef} onChange={(e) => setVideoFile(e.target.files[0])} className="hidden" />
          </div>
        ) : (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 flex items-center gap-4 mb-8">
            <span className="text-2xl">🎬</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{videoFile.name}</p>
              <p className="text-[#aaa] text-xs mt-0.5">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</p>
              <div className="mt-2 h-1 bg-[#333] rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-[#e24b4a] rounded-full" />
              </div>
            </div>
            <button onClick={() => setVideoFile(null)} className="text-[#aaa] hover:text-white bg-transparent border-none cursor-pointer text-lg">✕</button>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <FormField label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} charCount placeholder="Add a title that describes your video" />
          <FormField label="Description" type="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={5000} charCount placeholder="Tell viewers about your video" />

          {/* Thumbnail */}
          <div>
            <label className="block text-sm text-[#aaa] mb-2">Thumbnail</label>
            <div className="flex gap-4 items-start">
              <div
                onClick={() => thumbInputRef.current.click()}
                className="relative w-48 aspect-video rounded-lg overflow-hidden bg-[#1a1a1a] border-2 border-dashed border-[#333] hover:border-[#e24b4a] cursor-pointer flex items-center justify-center transition-colors group"
              >
                {thumbPreview
                  ? <img src={thumbPreview} alt="thumbnail" className="w-full h-full object-cover" />
                  : <div className="flex flex-col items-center gap-1 text-[#555] group-hover:text-[#aaa] transition-colors">
                      <span className="text-2xl">🖼️</span>
                      <span className="text-xs">Upload thumbnail</span>
                    </div>
                }
              </div>
              <div className="text-xs text-[#aaa] pt-2 leading-relaxed">
                <p className="mb-1 text-white text-sm">Custom thumbnail</p>
                <p>Recommended: 1280×720 (16:9)</p>
                <p className="mt-1">Max size: 2MB · JPG, PNG, WebP</p>
              </div>
              <input type="file" accept="image/*" ref={thumbInputRef} onChange={(e) => { const f = e.target.files[0]; if (f) setThumbPreview(URL.createObjectURL(f)) }} className="hidden" />
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm text-[#aaa] mb-2">Visibility</label>
            <div className="flex flex-col gap-2">
              {VISIBILITY_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-start gap-3 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 cursor-pointer hover:border-[#555] transition-colors">
                  <input type="radio" name="visibility" value={opt.value} checked={visibility === opt.value} onChange={() => setVisibility(opt.value)} className="mt-0.5 accent-[#e24b4a]" />
                  <div>
                    <p className="text-white text-sm font-medium">{opt.label}</p>
                    <p className="text-[#aaa] text-xs">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => navigate("/profile")} className="flex-1 bg-transparent border border-[#555] text-white text-sm py-2.5 rounded-lg cursor-pointer hover:border-[#aaa] transition-colors">Cancel</button>
            <button disabled={!videoFile || !title.trim()} className="flex-1 bg-[#e24b4a] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm py-2.5 rounded-lg cursor-pointer font-medium hover:bg-[#c73c3b] transition-colors border-none">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadVideoPage
