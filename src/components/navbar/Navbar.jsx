import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";
import LastNavPart from "./LastNavPart";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-2 bg-[#0f0f0f] px-2 sm:px-4">
      <MenuBtn />
      <SearchBar />
      <LastNavPart />
    </header>
  );
};

export default Navbar;
