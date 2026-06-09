export const accounts = [
  {
    id: 1,
    name: 'Acme Retail Group',
    arr: 480000,
    renewalDate: '2026-08-15',
    healthScore: 72,
    adoptionScore: 68,
    sentiment: 'Neutral',
    churnRisk: 'Medium',
    expansionPotential: 'Low',
    openTickets: 3,
    csm: 'Sarah Chen',
    lastMeeting: '2026-05-28',
    topRisks: ['Integration friction with legacy ERP', 'Low admin adoption', 'Pending feature request backlog'],
    recommendedAction: 'Schedule integration health review and connect with IT lead',
    products: ['Core Platform', 'Analytics Suite', 'API Integration Pack'],
    adoptionTrend: 'Stable',
    recentMeetings: [
      { date: '2026-05-28', type: 'QBR', summary: 'Reviewed integration blockers, IT lead committed to Q3 migration.' },
      { date: '2026-04-10', type: 'Check-in', summary: 'Adoption plateau discussed, training plan agreed.' },
    ],
    expansionOpportunities: ['HubSpot integration add-on', 'Custom reporting module'],
    timeline: [
      { date: '2026-05-28', event: 'QBR completed — integration roadmap agreed' },
      { date: '2026-04-10', event: 'Adoption review — training plan initiated' },
      { date: '2026-03-01', event: 'Renewal alert triggered — 6 months out' },
    ],
  },
  {
    id: 2,
    name: 'NovaHealth',
    arr: 720000,
    renewalDate: '2026-07-01',
    healthScore: 58,
    adoptionScore: 52,
    sentiment: 'At Risk',
    churnRisk: 'High',
    expansionPotential: 'Low',
    openTickets: 7,
    csm: 'Marcus Webb',
    lastMeeting: '2026-05-20',
    topRisks: ['Executive sponsor left company', 'HIPAA compliance concern raised', 'Support ticket backlog unresolved'],
    recommendedAction: 'Schedule executive re-engagement and escalate 3 critical support tickets',
    products: ['Core Platform', 'RBAC & Permissions', 'Audit Logs', 'SSO'],
    adoptionTrend: 'Declining',
    recentMeetings: [
      { date: '2026-05-20', type: 'Emergency Review', summary: 'New VP Success flagged compliance gaps and ticket delays.' },
      { date: '2026-04-05', type: 'Check-in', summary: 'Sponsor transition noted, interim contact assigned.' },
    ],
    expansionOpportunities: [],
    timeline: [
      { date: '2026-05-20', event: 'Emergency review — new VP CS flagged compliance concerns' },
      { date: '2026-05-10', event: 'Executive sponsor resigned' },
      { date: '2026-04-05', event: 'Adoption score dropped below 55' },
    ],
  },
  {
    id: 3,
    name: 'BrightPath Education',
    arr: 210000,
    renewalDate: '2026-10-30',
    healthScore: 85,
    adoptionScore: 88,
    sentiment: 'Positive',
    churnRisk: 'Low',
    expansionPotential: 'Medium',
    openTickets: 1,
    csm: 'Priya Nair',
    lastMeeting: '2026-06-02',
    topRisks: ['Budget cycle uncertainty for renewal', 'Feature gap in reporting for district admins'],
    recommendedAction: 'Propose district-wide expansion before budget freeze in September',
    products: ['Core Platform', 'Student Analytics', 'API Integration Pack'],
    adoptionTrend: 'Growing',
    recentMeetings: [
      { date: '2026-06-02', type: 'Check-in', summary: 'Strong NPS score, district expansion interest confirmed.' },
      { date: '2026-04-22', type: 'Training', summary: 'Admin training completed for 3 new schools.' },
    ],
    expansionOpportunities: ['District-wide rollout (est. +$80K ARR)', 'Custom reporting for district admins'],
    timeline: [
      { date: '2026-06-02', event: 'Check-in — district expansion discussed' },
      { date: '2026-04-22', event: 'Training session — 3 new schools onboarded' },
      { date: '2026-03-15', event: 'NPS survey — score 9/10' },
    ],
  },
  {
    id: 4,
    name: 'UrbanFit Studios',
    arr: 360000,
    renewalDate: '2026-09-15',
    healthScore: 91,
    adoptionScore: 93,
    sentiment: 'Champion',
    churnRisk: 'Low',
    expansionPotential: 'High',
    openTickets: 0,
    csm: 'Jordan Kim',
    lastMeeting: '2026-06-05',
    topRisks: ['Competitive evaluation underway for analytics tool'],
    recommendedAction: 'Accelerate multi-location benchmarking demo before competitor pilots',
    products: ['Core Platform', 'Analytics Suite', 'Multi-location Dashboard', 'Mobile App'],
    adoptionTrend: 'Growing',
    recentMeetings: [
      { date: '2026-06-05', type: 'Strategic Review', summary: '12 new studio locations confirmed for Q3, exploring enterprise tier.' },
      { date: '2026-05-01', type: 'Check-in', summary: 'Usage up 40% MoM, requesting advanced analytics.' },
    ],
    expansionOpportunities: ['Enterprise tier upgrade (+$120K ARR)', 'AI coaching add-on', 'White-label mobile app'],
    timeline: [
      { date: '2026-06-05', event: 'Strategic review — 12 new locations confirmed' },
      { date: '2026-05-01', event: 'Usage milestone — 40% MoM growth' },
      { date: '2026-04-10', event: 'Champion case study published' },
    ],
  },
  {
    id: 5,
    name: 'FinEdge Capital',
    arr: 950000,
    renewalDate: '2026-12-01',
    healthScore: 76,
    adoptionScore: 71,
    sentiment: 'Neutral',
    churnRisk: 'Medium',
    expansionPotential: 'Medium',
    openTickets: 4,
    csm: 'Sarah Chen',
    lastMeeting: '2026-05-15',
    topRisks: ['SOC 2 audit requirements creating friction', 'Power users concentrated in one team', 'RBAC configuration complexity'],
    recommendedAction: 'Assign solutions engineer to assist SOC 2 compliance configuration',
    products: ['Core Platform', 'RBAC & Permissions', 'Audit Logs', 'SSO', 'Advanced Reporting'],
    adoptionTrend: 'Stable',
    recentMeetings: [
      { date: '2026-05-15', type: 'QBR', summary: 'SOC 2 blockers reviewed, SE support requested.' },
      { date: '2026-04-01', type: 'Check-in', summary: 'New compliance officer onboarded, requirements shared.' },
    ],
    expansionOpportunities: ['Cross-team rollout (+$200K ARR)', 'Dedicated compliance module'],
    timeline: [
      { date: '2026-05-15', event: 'QBR — SOC 2 action plan agreed' },
      { date: '2026-04-01', event: 'New compliance officer joined' },
      { date: '2026-03-10', event: 'Audit log feature enabled' },
    ],
  },
  {
    id: 6,
    name: 'CloudKitchen Pro',
    arr: 175000,
    renewalDate: '2026-11-20',
    healthScore: 80,
    adoptionScore: 82,
    sentiment: 'Positive',
    churnRisk: 'Low',
    expansionPotential: 'Medium',
    openTickets: 2,
    csm: 'Priya Nair',
    lastMeeting: '2026-05-25',
    topRisks: ['Seasonal usage dips in summer', 'Limited IT resources for new feature rollouts'],
    recommendedAction: 'Propose multi-location dashboard trial ahead of fall expansion',
    products: ['Core Platform', 'Operations Dashboard', 'Multi-location Dashboard'],
    adoptionTrend: 'Stable',
    recentMeetings: [
      { date: '2026-05-25', type: 'Check-in', summary: 'Fall expansion to 5 new cities discussed, interest in multi-location tool.' },
    ],
    expansionOpportunities: ['Multi-location dashboard upgrade (+$45K ARR)', 'Inventory analytics add-on'],
    timeline: [
      { date: '2026-05-25', event: 'Check-in — fall expansion plan shared' },
      { date: '2026-04-15', event: 'Feature adoption — operations dashboard activated' },
    ],
  },
  {
    id: 7,
    name: 'FranchiseWorks',
    arr: 540000,
    renewalDate: '2026-08-01',
    healthScore: 44,
    adoptionScore: 38,
    sentiment: 'At Risk',
    churnRisk: 'High',
    expansionPotential: 'Low',
    openTickets: 9,
    csm: 'Marcus Webb',
    lastMeeting: '2026-05-18',
    topRisks: ['Adoption dropped 30% in 60 days', '9 unresolved support tickets', 'Executive threatening to evaluate competitors', 'Key admin user churned'],
    recommendedAction: 'Executive escalation call + emergency adoption recovery plan within 7 days',
    products: ['Core Platform', 'Multi-location Dashboard', 'Franchise Analytics'],
    adoptionTrend: 'Declining',
    recentMeetings: [
      { date: '2026-05-18', type: 'Emergency Check-in', summary: 'COO frustrated with support response times and adoption decline.' },
      { date: '2026-04-20', type: 'QBR', summary: 'Usage concerns noted, recovery plan committed.' },
    ],
    expansionOpportunities: [],
    timeline: [
      { date: '2026-05-18', event: 'Emergency check-in — COO escalation' },
      { date: '2026-05-10', event: 'Key admin user offboarded' },
      { date: '2026-04-20', event: 'QBR — adoption recovery plan started' },
      { date: '2026-04-01', event: 'Adoption score fell below 50' },
    ],
  },
  {
    id: 8,
    name: 'ZenOps Logistics',
    arr: 290000,
    renewalDate: '2026-10-10',
    healthScore: 83,
    adoptionScore: 79,
    sentiment: 'Positive',
    churnRisk: 'Low',
    expansionPotential: 'Medium',
    openTickets: 1,
    csm: 'Jordan Kim',
    lastMeeting: '2026-06-01',
    topRisks: ['Integration dependency on third-party logistics platform', 'Power user turnover risk'],
    recommendedAction: 'Build integration roadmap alignment with logistics platform team',
    products: ['Core Platform', 'API Integration Pack', 'Operations Dashboard'],
    adoptionTrend: 'Growing',
    recentMeetings: [
      { date: '2026-06-01', type: 'Check-in', summary: 'Integration working well, requesting HubSpot connector.' },
    ],
    expansionOpportunities: ['HubSpot integration (+$30K ARR)', 'Advanced logistics analytics'],
    timeline: [
      { date: '2026-06-01', event: 'Check-in — HubSpot integration requested' },
      { date: '2026-05-05', event: 'API integration deployed successfully' },
    ],
  },
];

export const getHealthColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
};

export const getHealthBg = (score) => {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (score >= 60) return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-red-50 text-red-700 border border-red-200';
};

export const getRiskBadge = (risk) => {
  if (risk === 'High') return 'bg-red-100 text-red-700 border border-red-200';
  if (risk === 'Medium') return 'bg-amber-100 text-amber-700 border border-amber-200';
  return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
};

export const getExpansionBadge = (potential) => {
  if (potential === 'High') return 'bg-purple-100 text-purple-700 border border-purple-200';
  if (potential === 'Medium') return 'bg-blue-100 text-blue-700 border border-blue-200';
  return 'bg-gray-100 text-gray-600 border border-gray-200';
};

export const formatARR = (arr) => {
  if (arr >= 1000000) return `$${(arr / 1000000).toFixed(1)}M`;
  return `$${(arr / 1000).toFixed(0)}K`;
};
