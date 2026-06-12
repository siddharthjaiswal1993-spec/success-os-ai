import { useState } from 'react';

const statusConfig = {
  'Needs Approval': { color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  'Suggested': { color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  'Approved': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'Completed': { color: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
  'Dismissed': { color: 'bg-red-50 text-red-400 border-red-100', dot: 'bg-red-300' },
};

const riskColor = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export default function AgentActions({ actions, onApprove, onDismiss }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const filtered = actions.filter((a) => {
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    const matchType = filterType === 'All' || a.type === filterType;
    return matchStatus && matchType;
  });

  const counts = {
    'Needs Approval': actions.filter((a) => a.status === 'Needs Approval').length,
    'Suggested': actions.filter((a) => a.status === 'Suggested').length,
    'Approved': actions.filter((a) => a.status === 'Approved').length,
    'Dismissed': actions.filter((a) => a.status === 'Dismissed').length,
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agent Actions</h1>
          <p className="text-slate-500 text-sm mt-1">AI-recommended workflows with human-in-the-loop approval for customer-facing actions</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-right">
          <div className="text-amber-700 text-sm font-bold">{counts['Needs Approval']}</div>
          <div className="text-amber-600 text-xs">Awaiting approval</div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(counts).map(([status, count]) => (
          <div key={status} className={`rounded-lg border px-4 py-3 ${statusConfig[status].color} cursor-pointer`} onClick={() => setFilterStatus(filterStatus === status ? 'All' : status)}>
            <div className="text-xl font-bold">{count}</div>
            <div className="text-xs font-medium mt-0.5">{status}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Needs Approval', 'Suggested', 'Approved', 'Dismissed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              filterStatus === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {s}
          </button>
        ))}
        <div className="w-px bg-slate-200 mx-1"></div>
        {['All', 'Internal', 'External'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              filterType === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {t === 'All' ? 'All Types' : t}
          </button>
        ))}
      </div>

      {/* Action cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <div className="text-3xl mb-3">✅</div>
            <p className="text-slate-600 text-sm font-medium">No actions match this filter</p>
          </div>
        )}
        {filtered.map((action) => {
          const isExternal = action.type === 'External';
          const canAct = action.status === 'Needs Approval' || action.status === 'Suggested';
          const isDismissed = action.status === 'Dismissed';

          return (
            <div
              key={action.id}
              className={`bg-white rounded-xl border shadow-sm p-5 transition-opacity ${isDismissed ? 'opacity-50' : 'border-slate-200'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="font-semibold text-slate-900 text-sm">{action.action}</span>
                    {isExternal && (
                      <span className="bg-orange-100 text-orange-700 border border-orange-200 text-xs px-2 py-0.5 rounded-md font-medium">
                        External · Needs Approval
                      </span>
                    )}
                    {!isExternal && (
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs px-2 py-0.5 rounded-md font-medium">
                        Internal
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-slate-500">{action.account}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${riskColor[action.riskLevel]}`}>{action.riskLevel} Risk</span>
                    <span className={`text-xs px-2 py-0.5 rounded-md border font-medium flex items-center gap-1.5 ${statusConfig[action.status].color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[action.status].dot}`}></span>
                      {action.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">{action.reason}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {action.signals.map((s, i) => (
                      <span key={i} className="bg-slate-50 border border-slate-200 text-xs text-slate-600 px-2 py-0.5 rounded-md">{s}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Agent confidence</span>
                    <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${action.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{action.confidence}%</span>
                  </div>
                </div>

                {canAct && (
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => onApprove(action.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onDismiss(action.id)}
                      className="bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
                {action.status === 'Approved' && (
                  <div className="shrink-0 text-emerald-600 text-sm font-semibold flex items-center gap-1">
                    ✓ Approved
                  </div>
                )}
                {action.status === 'Dismissed' && (
                  <div className="shrink-0 text-red-400 text-sm font-semibold">Dismissed</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
