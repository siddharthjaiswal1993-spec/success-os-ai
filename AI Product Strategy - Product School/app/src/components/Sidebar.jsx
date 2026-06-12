const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬛' },
  { id: 'accounts', label: 'Accounts', icon: '🏢' },
  { id: 'meeting', label: 'Meeting Intelligence', icon: '🎙️' },
  { id: 'feature', label: 'Feature Impact', icon: '✨' },
  { id: 'actions', label: 'Agent Actions', icon: '⚡' },
  { id: 'qbr', label: 'QBR Generator', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ active, onNav, pendingCount }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-slate-900 flex flex-col z-40">
      <div className="px-5 py-6 border-b border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">S</div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">SuccessOS AI</div>
            <div className="text-slate-400 text-xs">Customer Intelligence</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              active === item.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === 'actions' && pendingCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold min-w-[20px] text-center">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">CS</div>
          <div>
            <div className="text-white text-xs font-medium">CS Team</div>
            <div className="text-slate-500 text-xs">Enterprise Plan</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400"></div>
        </div>
      </div>
    </aside>
  );
}
