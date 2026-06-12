# Product Requirements Document — SuccessOS AI MVP

**Version:** 1.0  
**Status:** Strategy artifact (prototype-stage)  
**Owner:** Product Strategy

---

## 1. Product Overview

SuccessOS AI is an AI-native Customer Success Intelligence Agent for enterprise SaaS companies. It converts fragmented customer signals into structured account health intelligence, churn risk detection, expansion identification, recommended workflows, and customer-ready outputs — with human approval required for all customer-facing actions.

---

## 2. MVP Scope

The MVP delivers value across five core modules:

| Module | Priority | Core Value |
|--------|----------|-----------|
| Dashboard | P0 | Portfolio-level health view; risky accounts; AI insight panel |
| Meeting Intelligence | P0 | Paste notes → structured analysis + recommended actions |
| Account Health | P0 | Per-account health score, signals, timeline, and risk flags |
| Feature Impact Intelligence | P1 | Enter feature → impacted customer map with priority and messaging |
| QBR Generator | P1 | Per-account QBR brief with 9 AI-generated sections |
| Agent Actions | P1 | Approval workflow for AI-recommended customer-facing actions |
| Settings and Governance | P2 | Agent mode, confidence thresholds, integration toggles |

---

## 3. Module Requirements

### 3.1 Dashboard

**Purpose:** Give CS leaders and CSMs a real-time portfolio health command center.

**Required views:**
- Portfolio KPI strip: Total ARR, accounts at risk, churn risk ARR, expansion opportunities
- Accounts list with health tier (Red/Yellow/Green), ARR, renewal date, CSM owner
- AI Insight Panel: Top 3 AI-generated recommendations for the portfolio this week
- Filter/sort by: health tier, renewal date, CSM, ARR, churn risk level

**Acceptance criteria:**
- Dashboard loads in < 2 seconds
- Health tiers update within 24 hours of new signal
- AI Insight Panel shows source reasoning for each recommendation

---

### 3.2 Meeting Intelligence

**Purpose:** Convert unstructured meeting notes into structured account intelligence.

**Input:** Free-text meeting notes pasted by CSM (any format, any length ≥100 words)

**Required outputs:**
- Meeting summary (2–3 sentences)
- Sentiment classification (Positive / Neutral / Cautious / Negative)
- Churn risk delta (Increased / Stable / Decreased) with reasoning
- Expansion signal detection (Identified / None detected) with supporting quote
- Action items (bulleted list)
- Recommended next-best actions (≤3, with reasoning)
- Draft follow-up email for human review and approval
- Internal action summary for CSM notes

**Acceptance criteria:**
- Analysis returned in < 8 seconds for notes up to 1,000 words
- Churn risk detection: ≥ 75% recall on test set (see evals-and-trust)
- Every output includes confidence indicator (High / Medium / Low)
- Draft email is clearly labeled "Pending Approval" until CSM approves

---

### 3.3 Account Health

**Purpose:** Per-account intelligence hub with continuous health scoring.

**Required components:**
- Account header: ARR, renewal date, CSM owner, health score (0–100), health tier
- Signal heatmap: Adoption, Sentiment, Support, Engagement, Renewal Risk — each scored
- Account timeline: Chronological log of meetings, tickets, signals, actions
- Open risks panel: AI-identified risks with severity and recommended action
- Expansion signals panel: AI-identified expansion opportunities
- Recent AI actions: History of approved and dismissed agent actions

**Acceptance criteria:**
- Health score visible at all times with last-updated timestamp
- Each signal component linked to source evidence
- Timeline shows last 90 days by default; expandable to full history

---

### 3.4 Feature Impact Intelligence

**Purpose:** Map product updates to impacted customer accounts.

**Input:** Natural language feature description entered by PM, CSM, or product team

**Required outputs:**
- Impacted account list with:
  - Match relevance score (High / Medium / Low)
  - Impact type (Churn Reduction / Adoption Improvement / Expansion Opportunity)
  - Recommended customer message (draft, requires approval)
  - Suggested outreach timing
- Summary of total impacted ARR
- Suggested launch message for each impact tier

**Matching logic (implemented in prototype):**
- "multi-location" → FranchiseWorks, UrbanFit Studios, CloudKitchen Pro
- "RBAC" or "permissions" → FinEdge Capital, NovaHealth, FranchiseWorks
- "integration" → Acme Retail Group, ZenOps Logistics, BrightPath Education
- "analytics" → UrbanFit Studios, FranchiseWorks, FinEdge Capital

**Acceptance criteria:**
- Results returned in < 5 seconds
- Match precision: ≥ 80% of High matches rated relevant by CSM on test set
- Total ARR impact calculated and displayed
- All outreach drafts labeled as pending approval

---

### 3.5 QBR Generator

**Purpose:** Generate account-specific QBR briefs that CSMs can review, edit, and deliver.

**Input:** Account selection (from dropdown of managed accounts)

**Required output sections:**
1. Executive Summary
2. Account Overview (ARR, renewal, primary contacts, products used)
3. Business Goals Recap
4. Adoption Highlights
5. ROI Realized (with supporting metrics where available)
6. Risks and Open Issues
7. Support Ticket Summary
8. Expansion Opportunities
9. Roadmap Alignment
10. Recommended Next Steps

**Acceptance criteria:**
- Full QBR generated in < 15 seconds
- Content is account-specific — not generic filler
- All sections are editable before delivery
- Clear disclaimer: "AI-generated first draft — review before sharing with customer"

---

### 3.6 Agent Actions

**Purpose:** Human-in-the-loop approval workflow for AI-recommended customer-facing actions.

**Action types:**
- Draft outreach email (External — requires approval)
- Schedule executive check-in (External — requires approval)
- Update account health score (Internal — can be auto-approved)
- Log churn risk flag (Internal — can be auto-approved)
- Generate QBR brief (Internal — can be auto-approved)
- Escalate to CS manager (Internal — can be auto-approved)

**Required UI:**
- Action queue with priority (Critical / High / Medium)
- Per-action: Preview, confidence score, reasoning, approve/dismiss
- Dismissal requires reason selection (Not relevant / Already handled / Timing / Other)
- Approved actions logged with timestamp and approver

**Acceptance criteria:**
- No external action executes without explicit approval
- Dismissals captured and used to improve future recommendations
- Action queue clears when all items are resolved

---

## 4. Out of Scope for MVP

- Real CRM integration (Salesforce, HubSpot) — simulated in prototype
- Real product usage analytics integration — simulated
- Real call transcript analysis — simulated
- Mobile application
- Team collaboration features (comments, assignments between CSMs)
- Automated email sending (approval only; no actual email delivery in prototype)
- Multi-language support

---

## 5. Success Criteria for MVP

| Criterion | Target |
|-----------|--------|
| Meeting Intelligence satisfaction | ≥ 4.0 / 5 in user testing |
| QBR generation time reduction | ≥ 70% reduction vs. manual (measured in user testing) |
| Feature impact match precision | ≥ 75% rated relevant |
| Approval workflow ease-of-use | ≥ 4.2 / 5 |
| Overall NPS | ≥ 35 in pilot cohort |
