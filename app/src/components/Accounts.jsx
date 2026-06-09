import { useState } from 'react';
import { accounts, formatARR, getHealthBg, getRiskBadge, getExpansionBadge, getHealthColor } from '../data/accounts';

function AccountDetail({ account, onBack }) {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 text-sm font-medium flex items-center gap-1">
          ← Accounts
        </button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{account.name}</h1>
          <p className="text-slate-500 text-sm mt-1">CSM: {account.csm} · Last meeting: {account.lastMeeting}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getRiskBadge(account.churnRisk)}`}>Churn: {account.churnRisk}</span>
          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getExpansionBadge(account.expansionPotential)}`}>Expansion: {account.expansionPotential}</span>
        </div>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ARR', value: formatARR(account.arr) },
          { label: 'Health Score', value: account.healthScore, color: getHealthColor(account.healthScore) },
          { label: 'Adoption Score', value: account.adoptionScore, color: getHealthColor(account.adoptionScore) },
          { label: 'Open Tickets', value: account.openTickets, color: account.openTickets > 5 ? 'text-red-600' : account.openTickets > 2 ? 'text-amber-600' : 'text-slate-700' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className={`text-2xl font-bold ${card.color || 'text-slate-900'}`}>{card.value}</div>
            <div className="text-slate-500 text-xs font-medium mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top risks */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Top Risks</h3>
          <ul className="space-y-2">
            {account.topRisks.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-red-500 mt-0.5">⚠</span>{r}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended action */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">AI Recommended Action</h3>
          <p className="text-sm text-blue-800">{account.recommendedAction}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-blue-600 bg-white border border-blue-200 px-2 py-1 rounded-md font-medium">Trend: {account.adoptionTrend}</span>
            <span className="text-xs text-blue-600 bg-white border border-blue-200 px-2 py-1 rounded-md font-medium">Sentiment: {account.sentiment}</span>
            <span className="text-xs text-blue-600 bg-white border border-blue-200 px-2 py-1 rounded-md font-medium">Renewal: {account.renewalDate}</span>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Products & Features Used</h3>
          <div className="flex flex-wrap gap-2">
            {account.products.map((p) => (
              <span key={p} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200">{p}</span>
            ))}
          </div>
        </div>

        {/* Expansion opportunities */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Expansion Opportunities</h3>
          {account.expansionOpportunities.length > 0 ? (
            <ul className="space-y-2">
              {account.expansionOpportunities.map((opp, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-purple-500">◆</span>{opp}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400 italic">No expansion opportunities identified at this time.</p>
          )}
        </div>

        {/* Recent meetings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Meetings</h3>
          <div className="space-y-3">
            {account.recentMeetings.map((m, i) => (
              <div key={i} className="border-l-2 border-blue-200 pl-3">
                <div className="text-xs font-semibold text-slate-500">{m.date} · {m.type}</div>
                <p className="text-sm text-slate-700 mt-0.5">{m.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Account Timeline</h3>
          <div className="space-y-3">
            {account.timeline.map((t, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-slate-400 whitespace-nowrap text-xs pt-0.5">{t.date}</span>
                <span className="text-slate-700">{t.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Accounts() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');

  if (selected) {
    return <AccountDetail account={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = accounts.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === 'All' || a.churnRisk === riskFilter;
    return matchSearch && matchRisk;
  });

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
        <p className="text-slate-500 text-sm mt-1">Detailed account intelligence for your entire customer portfolio</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search accounts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <div className="flex gap-2">
          {['All', 'High', 'Medium', 'Low'].map((r) => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                riskFilter === r
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {r === 'All' ? 'All Accounts' : `${r} Risk`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((acc) => (
          <button
            key={acc.id}
            onClick={() => setSelected(acc)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 text-left hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{acc.name}</div>
                <div className="text-slate-400 text-xs mt-0.5">{formatARR(acc.arr)} ARR · {acc.csm}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${getHealthBg(acc.healthScore)}`}>{acc.healthScore}</span>
            </div>

            <div className="flex gap-2 mb-3">
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getRiskBadge(acc.churnRisk)}`}>{acc.churnRisk} Risk</span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getExpansionBadge(acc.expansionPotential)}`}>{acc.expansionPotential} Expansion</span>
            </div>

            <p className="text-xs text-slate-500 leading-snug line-clamp-2">{acc.recommendedAction}</p>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Renewal: {acc.renewalDate}</span>
              <span className={`text-xs font-medium ${acc.openTickets > 5 ? 'text-red-500' : acc.openTickets > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                {acc.openTickets} ticket{acc.openTickets !== 1 ? 's' : ''}
              </span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm">No accounts match your search.</p>
        </div>
      )}
    </div>
  );
}
