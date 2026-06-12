# Customer Memory Model — SuccessOS AI

---

## What Is Customer Memory

Customer memory is the structured context that the AI agent retrieves before generating any analysis or recommendation for a specific account. It is the difference between an AI that gives generic advice and one that gives advice that is relevant to *this customer, right now*.

Without customer memory, Meeting Intelligence produces generic summaries. Without customer memory, the QBR Generator produces templates with filled-in names. With customer memory, every AI output is grounded in the account's history, current state, known risks, and open threads.

---

## Memory Components

### 1. Account Profile (Static)
Baseline facts that change infrequently:

```json
{
  "account_id": "acme-retail-group",
  "name": "Acme Retail Group",
  "arr": 420000,
  "renewal_date": "2026-09-14",
  "csm_owner": "Maya Hernandez",
  "products_used": ["Core Platform", "Analytics Suite", "API Integrations"],
  "primary_contacts": [
    { "name": "Sarah Chen", "title": "VP Operations", "is_executive_sponsor": true },
    { "name": "Mark Liu", "title": "IT Director", "is_champion": true }
  ],
  "segment": "Enterprise",
  "industry": "Retail",
  "company_size": "2,000-5,000 employees"
}
```

### 2. Health State (Dynamic)
Updated by the Account Health Monitor agent:

```json
{
  "health_score": 71,
  "health_tier": "Yellow",
  "last_updated": "2026-06-10",
  "component_scores": {
    "adoption": 68,
    "sentiment": 72,
    "support": 65,
    "engagement": 74,
    "renewal_risk": 58
  },
  "score_delta_30d": -4
}
```

### 3. Recent Activity Log (Rolling 90 days)
All signals ingested in the past 90 days:

```json
[
  { "date": "2026-06-09", "type": "meeting", "summary": "Quarterly review — discussed integration challenges", "sentiment": "Cautious" },
  { "date": "2026-05-28", "type": "support_ticket", "summary": "API rate limiting issue — P2 — resolved in 3 days", "severity": "Medium" },
  { "date": "2026-05-15", "type": "usage_event", "summary": "Analytics Suite adoption dropped 18% MoM", "signal": "Adoption decline" }
]
```

### 4. Known Risks (Structured)
Active risk flags from agent analysis:

```json
[
  { "risk_id": "r-001", "type": "Adoption Decline", "description": "Analytics Suite usage down 18% in last 30 days", "severity": "High", "opened_date": "2026-05-15", "status": "Open" },
  { "risk_id": "r-002", "type": "Integration Issues", "description": "API rate limiting causing team frustration", "severity": "Medium", "opened_date": "2026-05-28", "status": "In Progress" }
]
```

### 5. Expansion Signals (Structured)
Active expansion opportunities:

```json
[
  { "signal_id": "e-001", "type": "Team Expansion", "description": "VP mentioned 2 additional regional teams interested in rollout", "detected_from": "meeting-2026-06-09", "opportunity_score": 72 }
]
```

### 6. Prior Recommendations (Last 30 days)
What the AI has previously recommended and what happened:

```json
[
  { "action_type": "Executive Check-in", "recommended_date": "2026-05-20", "status": "Approved", "outcome": "Meeting scheduled" },
  { "action_type": "Expansion Outreach", "recommended_date": "2026-05-30", "status": "Dismissed", "dismiss_reason": "Wrong timing" }
]
```

---

## How Memory Is Used in Context Assembly

Before any AI call for an account, the context assembler constructs a prompt context block:

```
Account: Acme Retail Group | ARR: $420K | Renewal: Sep 14, 2026 (95 days)
Health: 71/100 (Yellow) | 30d delta: -4 points
Active risks: Adoption decline (High), Integration issues (Medium)
Expansion signals: Regional team expansion opportunity (Score: 72)
Last meeting: Jun 9 — Cautious sentiment; integration frustrations discussed
Prior AI recommendations: Executive check-in approved (May 20); Expansion outreach dismissed — wrong timing (May 30)
```

This context is passed alongside the new signal (e.g., new meeting notes) to ensure AI reasoning is grounded in account reality.

---

## Memory Freshness and Decay

| Memory Component | Update Frequency | Staleness Threshold |
|-----------------|-----------------|---------------------|
| Account profile | On CRM sync | Flag if > 30 days since sync |
| Health state | Daily (agent run) | Flag if > 3 days since update |
| Activity log | On signal ingestion | Rolling 90-day window |
| Risk flags | On detection / resolution | Flag open risks older than 30 days for review |
| Expansion signals | On detection | Auto-expire if not acted on in 45 days |

---

## Privacy and Security

- Customer memory is stored within tenant isolation boundaries — no cross-account or cross-tenant memory access
- Meeting notes content is not stored long-term in raw form — only structured signals extracted from notes are persisted
- Customer memory can be exported or deleted per customer request (GDPR compliance)
- LLM calls receive only the structured context block, not raw historical meeting transcripts
