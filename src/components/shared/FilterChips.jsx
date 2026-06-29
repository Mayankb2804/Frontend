/**
 * FilterChips — horizontal scrollable pill buttons.
 * Used in: HomePage, SearchPage
 *
 * Props:
 *   chips        string[]
 *   active       string   (active chip label)
 *   onSelect     fn(chip)
 */
const FilterChips = ({ chips = [], active, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect?.(chip)}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${
            chip === active
              ? "bg-white text-black"
              : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}

export default FilterChips
