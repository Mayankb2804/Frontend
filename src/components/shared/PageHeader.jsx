/**
 * PageHeader — title + subtitle + optional right action.
 * Used in: HistoryPage, LikedPage, PlaylistsPage, SubscriptionPage
 *
 * Props:
 *   icon       node    (optional emoji or element)
 *   title      string
 *   subtitle   string
 *   action     node    (optional right-side button/element)
 */
const PageHeader = ({ icon, title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-[#e24b4a]/20 flex items-center justify-center text-xl">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-[#aaa]">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export default PageHeader
