import { useState } from 'react';

const integrations = [
  { name: 'Salesforce CRM', status: 'Connected', icon: '☁️', color: 'text-blue-600' },
  { name: 'HubSpot', status: 'Connected', icon: '🟠', color: 'text-orange-600' },
  { name: 'Zendesk', status: 'Connected', icon: '🎫', color: 'text-emerald-600' },
  { name: 'Gong', status: 'Connected', icon: '🎙️', color: 'text-purple-600' },
  { name: 'Slack', status: 'Pending Setup', icon: '💬', color: 'text-slate-500' },
  { name: 'Jira', status: 'Pending Setup', icon: '🔵', color: 'text-slate-500' },
];

export default function Settings() {
  const [agentMode, setAgentMode] = useState('Advisory');
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [threshold, setThreshold] = useState(75);
  const [notifications, setNotifications] = useState({ email: true, slack: false, inApp: true });
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Configure agent behavior, approval workflows, and data integrations</p>
      </div>

      {/* Agent mode */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-semibold text-slate-900">Agent Behavior</h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Agent Mode</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { mode: 'Advisory', desc: 'Agent suggests actions. All actions — internal and external — require human review and approval before execution.' },
              { mode: 'Semi-autonomous', desc: 'Agent autonomously executes internal actions (CRM updates, internal tasks). External customer-facing actions always require approval.' },
            ].map(({ mode, desc }) => (
              <button
                key={mode}
                onClick={() => setAgentMode(mode)}
                className={`text-left p-4 rounded-lg border transition-all ${
                  agentMode === mode
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-3 h-3 rounded-full border-2 ${agentMode === mode ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}></div>
                  <span className="text-sm font-semibold text-slate-900">{mode}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-100">
          <div>
            <div className="text-sm font-medium text-slate-700">Require approval for external actions</div>
            <div className="text-xs text-slate-500 mt-0.5">Customer-facing emails, meeting invites, and external communications</div>
          </div>
          <button
            onClick={() => setApprovalRequired(!approvalRequired)}
            className={`relative w-11 h-6 rounded-full transition-colors ${approvalRequired ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${approvalRequired ? 'translate-x-5' : 'translate-x-0'}`}></span>
          </button>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-slate-700">Confidence Threshold</div>
              <div className="text-xs text-slate-500 mt-0.5">Minimum agent confidence to surface a suggested action</div>
            </div>
            <span className="text-sm font-bold text-blue-600">{threshold}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={95}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>50% — More suggestions</span>
            <span>95% — Fewer, higher confidence</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-900">Notification Preferences</h2>
        {[
          { key: 'email', label: 'Email Alerts', desc: 'Receive agent action summaries and risk alerts via email' },
          { key: 'slack', label: 'Slack Notifications', desc: 'Push agent insights and approvals to your Slack workspace' },
          { key: 'inApp', label: 'In-App Notifications', desc: 'Show notification badges and alerts within the dashboard' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <div>
              <div className="text-sm font-medium text-slate-700">{label}</div>
              <div className="text-xs text-slate-500">{desc}</div>
            </div>
            <button
              onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
              className={`relative w-11 h-6 rounded-full transition-colors ${notifications[key] ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notifications[key] ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>
        ))}
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Data Sources & Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {integrations.map((int) => (
            <div key={int.name} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg">{int.icon}</span>
                <div>
                  <div className="text-sm font-medium text-slate-800">{int.name}</div>
                  <div className={`text-xs ${int.status === 'Connected' ? 'text-emerald-600' : 'text-slate-400'}`}>{int.status}</div>
                </div>
              </div>
              {int.status === 'Connected' ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              ) : (
                <button className="text-xs text-blue-600 font-medium hover:underline">Connect</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Save Settings
        </button>
        {saved && <span className="text-emerald-600 text-sm font-medium">✓ Settings saved</span>}
      </div>
    </div>
  );
}
