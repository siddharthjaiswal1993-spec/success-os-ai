import { useState } from 'react';
import { accounts, formatARR } from '../data/accounts';

const matchRules = [
  {
    keywords: ['multi-location', 'multi location', 'franchise', 'locations'],
    accounts: ['FranchiseWorks', 'UrbanFit Studios', 'CloudKitchen Pro'],
    impact: { churnReduction: 'High', upsell: 'Medium', adoption: 'High', productGap: 'Yes' },
    useCase: 'Multi-location management and cross-location benchmarking',
  },
  {
    keywords: ['rbac', 'permissions', 'access control', 'roles', 'sso'],
    accounts: ['FinEdge Capital', 'NovaHealth', 'FranchiseWorks'],
    impact: { churnReduction: 'High', upsell: 'Low', adoption: 'Medium', productGap: 'Yes' },
    useCase: 'Enterprise security, compliance, and role-based access control',
  },
  {
    keywords: ['integration', 'hubspot', 'crm', 'api', 'connect'],
    accounts: ['Acme Retail Group', 'ZenOps Logistics', 'BrightPath Education'],
    impact: { churnReduction: 'Medium', upsell: 'Medium', adoption: 'High', productGap: 'Yes' },
    useCase: 'Third-party system integration and workflow automation',
  },
  {
    keywords: ['analytics', 'reporting', 'dashboard', 'insights', 'benchmark', 'metrics'],
    accounts: ['UrbanFit Studios', 'FranchiseWorks', 'FinEdge Capital'],
    impact: { churnReduction: 'Medium', upsell: 'High', adoption: 'Medium', productGap: 'No' },
    useCase: 'Advanced analytics, custom reporting, and performance benchmarking',
  },
  {
    keywords: ['automation', 'ai', 'task', 'workflow', 'automate'],
    accounts: ['ZenOps Logistics', 'CloudKitchen Pro', 'Acme Retail Group'],
    impact: { churnReduction: 'Low', upsell: 'High', adoption: 'High', productGap: 'No' },
    useCase: 'AI-powered workflow automation and task management',
  },
  {
    keywords: ['onboarding', 'training', 'education', 'learning'],
    accounts: ['BrightPath Education', 'FranchiseWorks', 'NovaHealth'],
    impact: { churnReduction: 'High', upsell: 'Low', adoption: 'High', productGap: 'Yes' },
    useCase: 'Customer onboarding, training, and adoption acceleration',
  },
];

function matchFeature(text) {
  const lower = text.toLowerCase();
  const matched = new Map();

  for (const rule of matchRules) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      for (const name of rule.accounts) {
        if (!matched.has(name)) {
          const acc = accounts.find((a) => a.name === name);
          if (acc) {
            matched.set(name, {
              account: acc,
              useCase: rule.useCase,
              impact: rule.impact,
              score: rule.impact.churnReduction === 'High' ? 90 : rule.impact.upsell === 'High' ? 80 : 70,
            });
          }
        }
      }
    }
  }
  return Array.from(matched.values()).sort((a, b) => b.score - a.score);
}

function generateMessaging(feature, matches) {
  if (matches.length === 0) return '';
  const topAccount = matches[0].account.name;
  return `Subject: Introducing ${feature} — Built for Teams Like Yours\n\nHi [Name],\n\nWe just launched something I think you'll love: ${feature}.\n\nBased on how your team uses the platform, this update directly addresses ${matches[0].useCase.toLowerCase()}. Several accounts like yours are already seeing strong results.\n\nI'd love to walk you through a quick demo — would 20 minutes this week work?\n\nBest,\n[Your Name]`;
}

const SAMPLE_FEATURE = 'Multi-location benchmarking dashboard — allows franchise and multi-location businesses to compare performance across all locations in real time with AI-powered insights.';

export default function FeatureImpact() {
  const [feature, setFeature] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!feature.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const matches = matchFeature(feature);
      setResult({ matches, messaging: generateMessaging(feature, matches) });
      setLoading(false);
    }, 1600);
  };

  const impactColor = {
    High: 'text-emerald-600 font-semibold',
    Medium: 'text-amber-600 font-medium',
    Low: 'text-slate-400',
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Feature Impact</h1>
        <p className="text-slate-500 text-sm mt-1">Enter a feature update to identify which customers should be targeted or informed</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">Feature or Roadmap Update</label>
          <button onClick={() => setFeature(SAMPLE_FEATURE)} className="text-xs text-blue-600 hover:underline font-medium">
            Load sample feature
          </button>
        </div>
        <textarea
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          placeholder="Enter a feature update, such as: Multi-location benchmarking dashboard, AI-powered task automation, advanced RBAC, integration with HubSpot, custom reporting, etc."
          className="w-full h-36 border border-slate-200 rounded-lg p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex gap-3">
          <button
            onClick={analyze}
            disabled={!feature.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            {loading ? 'Mapping impact...' : 'Analyze Customer Impact'}
          </button>
          {feature && (
            <button onClick={() => { setFeature(''); setResult(null); }} className="text-slate-400 hover:text-slate-600 text-sm">
              Clear
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
          <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm font-medium">Mapping feature impact across customer base…</p>
          <p className="text-slate-400 text-xs mt-1">Matching use cases, churn signals, and upsell potential</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-5">
          {result.matches.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
              <div className="text-3xl mb-3">🔍</div>
              <p className="text-slate-600 text-sm font-medium">No strong customer matches found</p>
              <p className="text-slate-400 text-xs mt-1">Try keywords like: multi-location, RBAC, integration, analytics, automation, onboarding</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <span className="text-blue-700 text-sm font-semibold">{result.matches.length} customers matched</span>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2">
                  <span className="text-purple-700 text-sm font-semibold">
                    Recommended launch audience: {result.matches.filter(m => m.score >= 80).length} priority accounts
                  </span>
                </div>
              </div>

              {/* Impact table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="text-sm font-semibold text-slate-900">Customer Impact Analysis</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {['Customer', 'ARR', 'Priority Score', 'Use Case Match', 'Churn Reduction', 'Upsell Potential', 'Recommended Action'].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {result.matches.map(({ account, useCase, impact, score }) => (
                        <tr key={account.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{account.name}</td>
                          <td className="px-4 py-3 text-slate-600">{formatARR(account.arr)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${score}%` }}></div>
                              </div>
                              <span className="text-sm font-semibold text-slate-700">{score}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600 text-xs max-w-[200px]">{useCase}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs ${impactColor[impact.churnReduction]}`}>{impact.churnReduction}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs ${impactColor[impact.upsell]}`}>{impact.upsell}</span>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">
                            {account.churnRisk === 'High' ? 'Personalized outreach + adoption plan' :
                             impact.upsell === 'High' ? 'Schedule upsell demo' :
                             'Include in launch communications'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Suggested messaging */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Suggested Customer Messaging Template</h3>
                <pre className="text-xs text-blue-800 whitespace-pre-wrap leading-relaxed font-sans">{result.messaging}</pre>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
