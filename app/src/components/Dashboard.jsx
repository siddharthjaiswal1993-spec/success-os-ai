import { accounts, formatARR, getHealthBg, getRiskBadge, getExpansionBadge } from '../data/accounts';

const insights = [
  {
    account: 'FranchiseWorks',
    severity: 'Critical',
    text: 'High churn risk detected — adoption dropped 30% in 60 days with 9 unresolved support tickets.',
    signals: ['Adoption: -30% MoM', '9 open tickets', 'Renewal: Aug 1'],
    action: 'Executive escalation + emergency QBR within 7 days',
    confidence: 91,
    color: 'border-red-300 bg-red-50',
    badge: 'bg-red-100 text-red-700',
  },
  {
    account: 'UrbanFit Studios',
    severity: 'Opportunity',
    text: 'Strong expansion signal — 12 new studio locations confirmed with 40% MoM usage growth.',
    signals: ['12 new locations', 'Adoption: 93', 'Expansion: High'],
    action: 'Accelerate enterprise tier upsell conversation this quarter',
    confidence: 84,
    color: 'border-purple-300 bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    account: 'NovaHealth',
    severity: 'High Risk',
    text: 'Executive sponsor departed — renewal in 22 days with compliance concerns unresolved.',
    signals: ['Sponsor churn', 'Health: 58', 'Renewal: Jul 1'],
    action: 'Schedule executive re-engagement with new VP of Customer Success',
    confidence: 88,
    color: 'border-amber-300 bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
  },
];

const totalARR = accounts.reduce((sum, a) => sum + a.arr, 0);
const atRisk = accounts.filter((a) => a.churnRisk === 'High').length;
const expansionOpps = accounts.filter((a) => a.expansionPotential === 'High' || a.expansionPotential === 'Medium').length;
const upcomingRenewals = accounts.filter((a) => {
  const days = (new Date(a.renewalDate) - new Date('2026-06-09')) / (1000 * 60 * 60 * 24);
  return days <= 90 && days >= 0;
}).length;
const avgHealth = Math.round(accounts.reduce((s, a) => s + a.healthScore, 0) / accounts.length);

export default function Dashboard({ onNav }) {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
          <p className="text-slate-500 text-sm mt-1">AI-powered account intelligence across your entire portfolio</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-700 text-xs font-medium">Agent Active — monitoring 8 accounts</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total ARR Managed', value: formatARR(totalARR), color: 'text-blue-600', sub: 'Across 8 accounts' },
          { label: 'Accounts at Risk', value: atRisk, color: 'text-red-600', sub: 'Require immediate action' },
          { label: 'Expansion Opportunities', value: expansionOpps, color: 'text-purple-600', sub: 'Medium or high potential' },
          { label: 'Upcoming Renewals', value: upcomingRenewals, color: 'text-amber-600', sub: 'Within 90 days' },
          { label: 'Avg Health Score', value: avgHealth, color: 'text-slate-700', sub: 'Portfolio average' },
          { label: 'Agent Actions Pending', value: 4, color: 'text-orange-600', sub: 'Awaiting approval' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-slate-600 text-xs font-medium mt-1">{kpi.label}</div>
            <div className="text-slate-400 text-xs mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Health Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Account Health Overview</h2>
            <button onClick={() => onNav('accounts')} className="text-blue-600 text-xs font-medium hover:underline">View all →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Account', 'ARR', 'Health', 'Churn Risk', 'Expansion', 'Renewal', 'Next Action'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{acc.name}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatARR(acc.arr)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${getHealthBg(acc.healthScore)}`}>
                        {acc.healthScore}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getRiskBadge(acc.churnRisk)}`}>
                        {acc.churnRisk}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getExpansionBadge(acc.expansionPotential)}`}>
                        {acc.expansionPotential}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{acc.renewalDate}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs max-w-[180px] truncate" title={acc.recommendedAction}>{acc.recommendedAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insight Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </div>
            <h2 className="text-sm font-semibold text-slate-900">AI Agent Insights</h2>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {insights.map((ins, i) => (
              <div key={i} className={`rounded-lg border p-4 ${ins.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ins.badge}`}>{ins.severity}</span>
                  <span className="text-xs text-slate-500 font-medium">{ins.account}</span>
                </div>
                <p className="text-sm text-slate-700 leading-snug mb-3">{ins.text}</p>
                <div className="space-y-1 mb-3">
                  {ins.signals.map((s, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <span className="text-slate-400">›</span>{s}
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <div className="text-xs font-medium text-slate-500 mb-1">Recommended Action</div>
                  <p className="text-xs text-slate-700">{ins.action}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Confidence</span>
                  <span className="text-xs font-semibold text-slate-600">{ins.confidence}%</span>
                </div>
                <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${ins.confidence}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <button onClick={() => onNav('actions')} className="w-full text-center text-xs font-medium text-blue-600 hover:underline">
              Review all agent actions →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
