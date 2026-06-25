const YoutubeLogo = () => {
  return (
    <div className="flex h-full items-center">
      <a className="flex h-full items-center gap-1 px-2" href="/">
        <div className="h-5 w-7 overflow-hidden rounded-md">
          <img src="/youtube.png" alt="YouTube" className="h-full w-full object-cover" />
        </div>
        <div className="hidden text-xl font-bold tracking-[-1.2px] text-white sm:block">YouTube</div>
      </a>
      <div className="hidden text-[10px] text-[#aaa] sm:block" style={{ position: 'relative', top: '-6px' }}>IN</div>
    </div>
  );
};

export default YoutubeLogo;
