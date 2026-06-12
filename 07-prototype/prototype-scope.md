# Prototype Scope — SuccessOS AI

---

## What the Prototype Demonstrates

The `/app` prototype is a working React application that simulates the core SuccessOS AI experience. It demonstrates the product's key interactions and decision flows.

### Included in the Prototype

| Feature | Status | Notes |
|---------|--------|-------|
| Account dashboard with health scores | ✅ Full | 8 sample accounts; filtering by tier and health status |
| Account detail view | ✅ Full | Timeline, signals, actions, QBR sections |
| Meeting Intelligence (note submission + analysis) | ✅ Simulated | Keyword detection simulates AI analysis |
| Churn risk flagging with reasoning | ✅ Full | Risk flags with supporting evidence shown |
| Expansion signal detection | ✅ Simulated | Pattern matching on submitted notes |
| Recommended Actions panel | ✅ Full | Approve / Dismiss with reason capture |
| QBR generation | ✅ Simulated | Template-based QBR with account data injection |
| Feature Impact Agent | ✅ Simulated | Feature description → matched accounts |
| Human-in-the-loop approval flow | ✅ Full | Complete approve/dismiss/edit interaction |
| Confidence levels displayed | ✅ Full | High/Medium/Low shown on all recommendations |
| Evidence and reasoning visible | ✅ Full | Supporting phrases shown for every flag |

### Not Included in the Prototype (Production-Only)

| Feature | Production Implementation |
|---------|--------------------------|
| Real LLM integration | Claude API for meeting analysis, QBR generation |
| CRM sync (read/write) | Salesforce / HubSpot API integration |
| Real product usage signals | Product analytics platform webhook integration |
| Support ticket signal ingestion | Jira / Zendesk integration |
| Email/calendar integration | Gmail / Outlook API |
| Multi-user collaboration | Auth layer + per-user state |
| Audit logging | Full event log with user attribution |
| Org-level health trend reporting | Rollup analytics across all accounts |
| Multi-tenant isolation | Production data architecture |
| SAML SSO | Enterprise auth provider integration |

---

## Prototype Design Decisions

**Why simulate AI calls?**
The prototype uses keyword detection and rule-based logic to simulate the AI outputs. This was intentional — it allows the full interaction flow to be demonstrated without requiring API keys or incurring LLM costs during portfolio review.

**Why these 8 accounts?**
The 8 sample accounts (Acme Retail Group, NovaHealth, BrightPath Education, UrbanFit Studios, FinEdge Capital, CloudKitchen Pro, FranchiseWorks, ZenOps Logistics) were chosen to demonstrate a range of health states, industries, and use cases. See `sample-data.md` for full account context.

**Why not include auth?**
Portfolio prototype. All users see the same state. Production would require auth, multi-tenancy, and per-user role access.

---

## Navigation Structure

```
/ (Dashboard)
  ↓ Accounts list with health indicators
  ↓ Click any account → Account Detail
      ↓ Timeline tab — meeting history, signals, flags
      ↓ Actions tab — pending and completed recommended actions
      ↓ QBR tab — generate and view QBR
      ↓ Overview tab — health score, key metrics
/feature-impact
  ↓ Feature description input
  ↓ Matched accounts list with relevance and reasoning
/settings (placeholder)
```
