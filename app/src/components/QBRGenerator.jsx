import { useState } from 'react';
import { accounts, formatARR } from '../data/accounts';

function generateQBR(account) {
  const isAtRisk = account.churnRisk === 'High';
  const hasExpansion = account.expansionPotential !== 'Low';

  return {
    executiveSummary: isAtRisk
      ? `${account.name} is currently in a critical health state with a score of ${account.healthScore}/100. Immediate action is required to address adoption decline, ${account.openTickets} unresolved support tickets, and executive relationship gaps before the ${account.renewalDate} renewal.`
      : `${account.name} continues to drive strong value from the platform with a health score of ${account.healthScore}/100. This QBR highlights key achievements, current adoption status, and a roadmap for continued growth and expansion.`,

    businessGoals: isAtRisk
      ? ['Stabilize adoption across all franchise/team locations', 'Resolve critical support issues impacting daily operations', 'Re-establish executive alignment and renewal confidence']
      : ['Expand platform usage across new teams and locations', 'Increase depth of adoption across advanced features', 'Achieve measurable ROI targets for the current contract year'],

    productAdoption: {
      score: account.adoptionScore,
      trend: account.adoptionTrend,
      products: account.products,
      note: account.adoptionTrend === 'Declining'
        ? `Adoption has declined significantly. Key features including ${account.products.slice(0, 2).join(' and ')} are underutilized. Recovery plan required.`
        : `Adoption is ${account.adoptionTrend.toLowerCase()} across ${account.products.length} active products. Team engagement with core features is ${account.adoptionScore > 80 ? 'excellent' : 'on track'}.`,
    },

    roi: isAtRisk
      ? `ROI realization is at risk due to adoption challenges. Current usage levels are below expectations for an account of this size (${formatARR(account.arr)} ARR). Recovery actions have been initiated.`
      : `${account.name} has demonstrated strong ROI through operational efficiency gains and measurable improvements in team productivity. Customers report ${account.adoptionScore > 85 ? 'excellent' : 'solid'} satisfaction with the platform's core workflows.`,

    risks: account.topRisks,

    supportIssues: account.openTickets > 0
      ? `${account.openTickets} open support ticket${account.openTickets > 1 ? 's' : ''} currently active. ${account.openTickets > 5 ? 'Critical escalation required — ticket volume is above acceptable thresholds.' : 'Resolution is in progress within standard SLA.'}`
      : 'No open support tickets. Account has maintained a clean support record this quarter.',

    expansionOpportunities: account.expansionOpportunities.length > 0
      ? account.expansionOpportunities
      : ['No expansion opportunities identified at this time. Focus remains on adoption stabilization.'],

    roadmapAlignment: hasExpansion
      ? [`Multi-location benchmarking (Q3 2026) — strong alignment for ${account.name}`, 'Advanced analytics module — directly supports reported business goals', 'API enhancements — unblocks integration use cases identified in recent check-ins']
      : ['Onboarding optimization features — helps address current adoption challenges', 'Enhanced support tooling — reduces ticket resolution time', 'Admin dashboard improvements — simplifies management for key admin users'],

    nextSteps: [
      isAtRisk ? 'Executive escalation call within 7 days' : 'Schedule renewal conversation for next quarter',
      `Follow up on: ${account.recommendedAction}`,
      'Align on 90-day success plan and KPIs',
      hasExpansion ? 'Present expansion proposal and commercial terms' : 'Review adoption recovery milestones',
    ],
  };
}

export default function QBRGenerator() {
  const [selectedId, setSelectedId] = useState('');
  const [qbr, setQbr] = useState(null);
  const [loading, setLoading] = useState(false);

  const selected = accounts.find((a) => a.id === Number(selectedId));

  const generate = () => {
    if (!selected) return;
    setLoading(true);
    setQbr(null);
    setTimeout(() => {
      setQbr(generateQBR(selected));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">QBR Generator</h1>
        <p className="text-slate-500 text-sm mt-1">Generate an executive-ready Quarterly Business Review brief for any customer account</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Account</label>
            <select
              value={selectedId}
              onChange={(e) => { setSelectedId(e.target.value); setQbr(null); }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a customer account…</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {formatARR(a.arr)} ARR
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={generate}
            disabled={!selectedId || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            {loading ? 'Generating...' : 'Generate QBR Brief'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
          <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm font-medium">Generating QBR brief…</p>
          <p className="text-slate-400 text-xs mt-1">Synthesizing account health, adoption data, and strategic recommendations</p>
        </div>
      )}

      {qbr && selected && !loading && (
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Quarterly Business Review</div>
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <p className="text-slate-400 text-sm mt-1">{formatARR(selected.arr)} ARR · Renewal: {selected.renewalDate} · CSM: {selected.csm}</p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${selected.healthScore >= 80 ? 'text-emerald-400' : selected.healthScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                  {selected.healthScore}
                </div>
                <div className="text-slate-400 text-xs">Health Score</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Executive summary */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Executive Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{qbr.executiveSummary}</p>
            </div>

            {/* Business goals */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Business Goals</h3>
              <ul className="space-y-2">
                {qbr.businessGoals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-blue-500 mt-0.5 font-bold">{i + 1}.</span>{g}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product adoption */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Product Adoption</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className={`text-2xl font-bold ${qbr.productAdoption.score >= 80 ? 'text-emerald-600' : qbr.productAdoption.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                  {qbr.productAdoption.score}%
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${
                  qbr.productAdoption.trend === 'Growing' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  qbr.productAdoption.trend === 'Declining' ? 'bg-red-100 text-red-700 border-red-200' :
                  'bg-slate-100 text-slate-600 border-slate-200'
                }`}>{qbr.productAdoption.trend}</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{qbr.productAdoption.note}</p>
              <div className="flex flex-wrap gap-1.5">
                {qbr.productAdoption.products.map((p) => (
                  <span key={p} className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-md border border-slate-200">{p}</span>
                ))}
              </div>
            </div>

            {/* ROI */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">ROI & Value Realized</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{qbr.roi}</p>
            </div>

            {/* Risks */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-red-900 mb-3">Risks</h3>
              <ul className="space-y-2">
                {qbr.risks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                    <span className="text-red-500 mt-0.5">⚠</span>{r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Support Issues</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{qbr.supportIssues}</p>
            </div>

            {/* Expansion */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Expansion Opportunities</h3>
              <ul className="space-y-2">
                {qbr.expansionOpportunities.map((opp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-purple-500 mt-0.5">◆</span>{opp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Roadmap */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Recommended Roadmap Alignment</h3>
              <ul className="space-y-2">
                {qbr.roadmapAlignment.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-blue-500 mt-0.5">→</span>{r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next steps */}
            <div className="lg:col-span-2 bg-slate-900 rounded-xl p-5 text-white">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {qbr.nextSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedId && !loading && (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-16 text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-slate-600 text-sm font-medium">Select an account to generate a QBR brief</p>
          <p className="text-slate-400 text-xs mt-1">Each account generates a unique, AI-tailored executive brief</p>
        </div>
      )}
    </div>
  );
}
