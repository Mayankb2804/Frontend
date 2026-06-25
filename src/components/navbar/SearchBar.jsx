import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="mx-1 flex h-full min-w-0 max-w-[732px] flex-1 items-center text-white sm:mx-4">
      <div className="flex h-10 w-full overflow-hidden rounded-full">
        <input
          className="h-full min-w-0 flex-1 rounded-l-full border border-[#303030] bg-[#121212] px-4 text-base text-white outline-none placeholder:text-[#888] focus:border-[#1c62b9]"
          placeholder="Search"
        />
        <button
          className="flex h-full w-14 shrink-0 cursor-pointer items-center justify-center border border-l-0 border-[#303030] bg-[#222] transition-colors hover:bg-[#303030] sm:w-16"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
