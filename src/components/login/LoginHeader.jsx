function LoginHeader() {
  return (
    <div className="mb-8 flex flex-col items-center gap-2">
      <img src="/youtube.png" alt="YouTube" className="h-8 w-11 rounded-md object-cover" />
      <h1 className="text-2xl font-semibold text-white">Sign in</h1>
      <p className="text-sm text-[#aaa]">to continue to YouTube</p>
    </div>
  )
}

export default LoginHeader
