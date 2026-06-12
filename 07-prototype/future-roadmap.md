# Future Roadmap — SuccessOS AI

What comes after the current prototype and MVP.

---

## Version History

| Version | Contents | Status |
|---------|---------|--------|
| v0 (current prototype) | Account health dashboard, meeting intelligence simulation, recommended actions, QBR generation, feature impact agent | Complete |
| v1 (MVP) | Real LLM integration, CRM sync, full signal-to-action loop, org-level health roll-up | Design complete — build pending |
| v2 | Multi-CSM collaboration, coaching layer, advanced analytics | Planned |
| v3 | Agentic automation for select internal workflows, fine-tuned CS models | Planned |

---

## Roadmap by Quarter

### Q3 2026 — MVP (v1)

**Theme: Make the AI Real**

| Feature | Description | Priority |
|---------|-------------|---------|
| Claude API integration | Replace keyword detection with real LLM calls for meeting analysis | P0 |
| Salesforce read integration | Sync account ARR, renewal dates, owner from CRM | P0 |
| QBR generation via LLM | Real QBR generation using account context + LLM | P0 |
| Confidence score display | Show LLM confidence on all outputs | P0 |
| Audit log | Full event log: who approved what, when | P0 |
| User authentication | Login + role-based access (CSM, CS Director, Admin) | P0 |
| Email digest | Weekly at-risk account summary to CS Director | P1 |
| Meeting note history | Persistent storage; timeline with all past meetings | P1 |
| Churn prediction model | Structured signal → risk score upgrade | P1 |

---

### Q4 2026 — Collaboration and Coaching (v2)

**Theme: Make the Team Smarter Together**

| Feature | Description | Priority |
|---------|-------------|---------|
| Multi-CSM assignment | Accounts assigned to CSMs; actions are per-CSM | P0 |
| CS Director oversight view | See all open actions across all CSMs | P0 |
| CSM activity analytics | QBRs completed, actions approved, response times | P1 |
| Meeting note templates | Structured note prompts that improve AI parsing | P1 |
| HubSpot integration | Second CRM integration | P1 |
| Expansion pipeline | Track expansion opportunities across portfolio | P1 |
| Slack notification integration | Send action notifications to Slack channel | P2 |
| CSM coaching recommendations | Directors can see patterns across CSMs' accounts | P2 |

---

### Q1 2027 — Intelligence Upgrade (v3 Early)

**Theme: Compound Learning**

| Feature | Description | Priority |
|---------|-------------|---------|
| Fine-tuned churn model | Model trained on outcome-labeled data from platform | P1 |
| Outcome capture | Log churn/renewal/expansion outcomes linked to signals | P0 |
| Feature-adoption signal ingestion | Product analytics webhook (Amplitude, Mixpanel) | P1 |
| Support ticket signal ingestion | Jira / Zendesk integration | P1 |
| Proactive risk alerts | Push notification when health score drops > 5 pts | P1 |
| Expansion opportunity scoring | ML-scored expansion likelihood per account | P2 |
| QBR collaboration | Multiple people can comment/edit a QBR before delivery | P2 |
| SAML SSO | Enterprise auth | P2 |

---

### Q2 2027 — Agentic Automation (v3)

**Theme: Trusted Automation**

| Feature | Description | Priority |
|---------|-------------|---------|
| Auto-execute internal actions | Automatically create CS tasks, update health records | P1 |
| Renewal risk workflow automation | Auto-create renewal prep tasks 120 days before renewal | P1 |
| Batch QBR generation | Generate QBRs for all accounts in a single run | P1 |
| Enterprise API | Allow customers to read signals via API for BI tools | P2 |
| Custom agentic workflows | Enterprise tier: configurable workflow automation | P2 |
| Fine-grained RBAC | Custom roles and permissions | P2 |

---

## Non-Roadmap (Won't Build)

| Feature | Reason |
|---------|--------|
| Auto-send customer emails | Violates human-in-the-loop invariant |
| Auto-schedule customer meetings | Same — requires human approval |
| AI-generated renewal price negotiation | Too high stakes for autonomous AI execution |
| Sentiment analysis of customer Slack | Privacy boundary; not in platform scope |
| Real-time call transcription | Scope too broad for current product focus |
