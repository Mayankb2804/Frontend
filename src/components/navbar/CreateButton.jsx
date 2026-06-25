import { Plus } from "lucide-react";

const CreateButton = () => {
  return (
    <button className="hidden h-9 items-center justify-center gap-1 rounded-full bg-[#272727] px-3 text-sm font-medium text-white transition-colors hover:bg-[#3f3f3f] md:flex">
      <Plus size={20} />
      Create
    </button>
  );
};

export default CreateButton;
