import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import MeetingIntelligence from './components/MeetingIntelligence';
import FeatureImpact from './components/FeatureImpact';
import AgentActions from './components/AgentActions';
import QBRGenerator from './components/QBRGenerator';
import Settings from './components/Settings';
import { initialActions } from './data/agentActions';
import './index.css';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [actions, setActions] = useState(initialActions);

  const pendingCount = actions.filter(
    (a) => a.status === 'Needs Approval' || a.status === 'Suggested'
  ).length;

  const handleApprove = (id) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a))
    );
  };

  const handleDismiss = (id) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Dismissed' } : a))
    );
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNav={setPage} />;
      case 'accounts': return <Accounts />;
      case 'meeting': return <MeetingIntelligence />;
      case 'feature': return <FeatureImpact />;
      case 'actions': return <AgentActions actions={actions} onApprove={handleApprove} onDismiss={handleDismiss} />;
      case 'qbr': return <QBRGenerator />;
      case 'settings': return <Settings />;
      default: return <Dashboard onNav={setPage} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar active={page} onNav={setPage} pendingCount={pendingCount} />
      <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh', overflowY: 'auto' }}>
        {renderPage()}
      </main>
    </div>
  );
}
