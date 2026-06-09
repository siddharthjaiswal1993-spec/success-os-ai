import { useState } from 'react';

const churnKeywords = ['delay', 'issue', 'blocked', 'not using', 'renewal concern', 'churn', 'adoption drop', 'unresolved', 'frustrated', 'disappointed', 'slow', 'broken', 'cancel', 'terminate', 'concerned', 'unhappy'];
const expansionKeywords = ['expand', 'more teams', 'additional locations', 'budget', 'interested', 'rollout', 'upgrade', 'new markets', 'scale', 'add users', 'grow', 'enterprise', 'additional'];

function analyzeNotes(text) {
  const lower = text.toLowerCase();
  const churnMatches = churnKeywords.filter((k) => lower.includes(k));
  const expansionMatches = expansionKeywords.filter((k) => lower.includes(k));

  const churnScore = Math.min(churnMatches.length, 4);
  const expansionScore = Math.min(expansionMatches.length, 4);

  const churnRisk = churnScore >= 3 ? 'High' : churnScore >= 1 ? 'Medium' : 'Low';
  const expansionSignal = expansionScore >= 3 ? 'Strong' : expansionScore >= 1 ? 'Moderate' : 'Low';

  const sentiment =
    churnScore > expansionScore + 1 ? 'Negative' :
    expansionScore > churnScore + 1 ? 'Positive' : 'Neutral';

  return { churnRisk, expansionSignal, sentiment, churnMatches, expansionMatches };
}

function generateAnalysis(text) {
  const { churnRisk, expansionSignal, sentiment, churnMatches, expansionMatches } = analyzeNotes(text);

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);

  return {
    summary: sentences.slice(0, 2).join('. ').trim() + (sentences.length > 2 ? '...' : ''),
    sentiment,
    churnRisk,
    expansionSignal,
    productGaps: churnMatches.includes('blocked') || churnMatches.includes('not using')
      ? ['Feature adoption blockers detected', 'Possible integration friction']
      : ['No significant product gaps detected'],
    objections: churnMatches.length > 0
      ? [`${churnMatches.length} concern signal${churnMatches.length > 1 ? 's' : ''} detected: ${churnMatches.slice(0, 3).join(', ')}`]
      : ['No significant objections raised'],
    actionItems: [
      churnRisk === 'High' ? 'Escalate account to CS manager within 24 hours' : null,
      expansionSignal !== 'Low' ? 'Prepare expansion proposal and schedule follow-up' : null,
      'Send meeting summary and next steps to customer',
      'Update CRM with sentiment and health signals from this meeting',
    ].filter(Boolean),
    followUpEmail: generateFollowUp(sentiment, churnRisk, expansionSignal),
    internalActions: generateInternalActions(churnRisk, expansionSignal),
  };
}

function generateFollowUp(sentiment, churnRisk, expansionSignal) {
  if (churnRisk === 'High') {
    return `Hi [Name],\n\nThank you for your candid feedback today. I want to personally commit to addressing the concerns you raised — I've already flagged the open issues internally and will have an update for you within 48 hours.\n\nI'd like to schedule a brief call with our solutions team to work through these blockers together. Would Thursday or Friday work this week?\n\nLooking forward to turning this around.\n\nBest,\n[Your Name]`;
  }
  if (expansionSignal === 'Strong') {
    return `Hi [Name],\n\nGreat conversation today — I'm excited about the growth momentum you shared. Based on what you described, I think there's a real opportunity to accelerate your results.\n\nI'll prepare a proposal outlining how we can support the expansion and get it over to you by end of week.\n\nTalk soon,\n[Your Name]`;
  }
  return `Hi [Name],\n\nThanks for the check-in today. I've captured the key points from our conversation and will follow up on the items we discussed.\n\nAs always, don't hesitate to reach out if anything comes up before our next meeting.\n\nBest,\n[Your Name]`;
}

function generateInternalActions(churnRisk, expansionSignal) {
  const actions = [];
  if (churnRisk === 'High') {
    actions.push('🚨 Flag account as high churn risk in CRM');
    actions.push('📩 Notify CS manager and schedule escalation call');
    actions.push('🎫 Review and prioritize all open support tickets');
  }
  if (churnRisk === 'Medium') {
    actions.push('⚠️ Set 2-week health check reminder');
    actions.push('📋 Document concerns in account notes');
  }
  if (expansionSignal === 'Strong') {
    actions.push('💰 Create expansion opportunity in CRM pipeline');
    actions.push('📊 Prepare ROI summary for upsell conversation');
  }
  if (expansionSignal === 'Moderate') {
    actions.push('📝 Log expansion signal for next QBR discussion');
  }
  actions.push('✅ Update account health score in dashboard');
  return actions;
}

const SAMPLE_NOTES = `Had a call with FranchiseWorks today. The COO was frustrated - adoption has completely dropped across their franchise locations and they have 9 support tickets that are still unresolved. They said if this doesn't get fixed soon they're going to have a serious renewal concern. The key admin we relied on for deployment is no longer at the company, which has caused a major gap. They're not using the multi-location dashboard at all anymore. There are integration issues that have been blocked for over a month. If we don't resolve this by next week, they may start evaluating competitors.`;

export default function MeetingIntelligence() {
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!notes.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(generateAnalysis(notes));
      setLoading(false);
    }, 1800);
  };

  const churnColor = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  const expansionColor = {
    Strong: 'bg-purple-100 text-purple-700 border-purple-200',
    Moderate: 'bg-blue-100 text-blue-700 border-blue-200',
    Low: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  const sentimentColor = {
    Positive: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Neutral: 'bg-slate-100 text-slate-600 border-slate-200',
    Negative: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meeting Intelligence</h1>
        <p className="text-slate-500 text-sm mt-1">Paste customer meeting notes to extract structured account intelligence</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">Meeting Notes</label>
          <button
            onClick={() => setNotes(SAMPLE_NOTES)}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            Load sample notes
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your customer meeting notes here. Include what was discussed, any concerns raised, expansion interest, blockers, or next steps..."
          className="w-full h-52 border border-slate-200 rounded-lg p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={analyze}
            disabled={!notes.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze Meeting Notes'}
          </button>
          {notes && (
            <button onClick={() => { setNotes(''); setResult(null); }} className="text-slate-400 hover:text-slate-600 text-sm">
              Clear
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
          <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm font-medium">Analyzing meeting notes…</p>
          <p className="text-slate-400 text-xs mt-1">Detecting churn signals, expansion opportunities, and action items</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4">
          {/* Signal badges */}
          <div className="flex flex-wrap gap-3">
            <span className={`px-3 py-1.5 rounded-lg border text-sm font-semibold ${sentimentColor[result.sentiment]}`}>
              Sentiment: {result.sentiment}
            </span>
            <span className={`px-3 py-1.5 rounded-lg border text-sm font-semibold ${churnColor[result.churnRisk]}`}>
              Churn Risk: {result.churnRisk}
            </span>
            <span className={`px-3 py-1.5 rounded-lg border text-sm font-semibold ${expansionColor[result.expansionSignal]}`}>
              Expansion Signal: {result.expansionSignal}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Summary */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Meeting Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{result.summary || 'Meeting notes captured and processed.'}</p>
            </div>

            {/* Objections */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Objections & Blockers</h3>
              <ul className="space-y-1.5">
                {result.objections.map((o, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>{o}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product gaps */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Product Gaps Detected</h3>
              <ul className="space-y-1.5">
                {result.productGaps.map((g, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">◆</span>{g}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action items */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Action Items</h3>
              <ul className="space-y-1.5">
                {result.actionItems.map((a, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>{a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow-up email */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Suggested Follow-up Email</h3>
              <pre className="text-xs text-blue-800 whitespace-pre-wrap leading-relaxed font-sans">{result.followUpEmail}</pre>
            </div>

            {/* Internal actions */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Recommended Internal Actions</h3>
              <ul className="space-y-1.5">
                {result.internalActions.map((a, i) => (
                  <li key={i} className="text-sm text-slate-700">{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
