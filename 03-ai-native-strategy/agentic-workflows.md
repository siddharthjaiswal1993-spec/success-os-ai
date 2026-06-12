# Agentic Workflows — SuccessOS AI

---

## Overview

SuccessOS AI implements six distinct agent workflows. Each workflow is triggered by a specific signal or user action, follows a defined reasoning pattern, and produces an output that is either auto-executed (internal) or routed to human approval (external).

---

## Agent 1: Account Health Monitor

**Trigger:** Continuous / scheduled (daily)  
**Autonomy level:** Level 3 — acts on internal state; no customer-facing output  
**Output:** Updated health score, risk flags, engagement alerts

**Workflow:**
1. Retrieve all account signals from the last 24 hours (meetings, tickets, usage events)
2. Assemble account context from customer memory store
3. Re-score each health component (Adoption, Sentiment, Support, Engagement, Renewal Risk)
4. Compute composite health score and tier
5. Compare to previous score — if delta > 10 points, flag change event
6. If health score drops to Red, create Critical coaching action for CSM
7. Log score update to account timeline
8. Publish updated health scores to dashboard

**Human review:** Score visible to CSM; override always available  
**Auto-escalation:** If score drops below 30 with renewal in < 60 days → escalate to CS Director

---

## Agent 2: Meeting Intelligence Agent

**Trigger:** CSM submits meeting notes  
**Autonomy level:** Level 2 — generates analysis and draft outputs; human approves any external action  
**Output:** Structured analysis, action items, recommended actions, draft email

**Workflow:**
1. Receive meeting notes text
2. Retrieve account context (if account linked)
3. Run sentiment analysis → classify 5-class sentiment
4. Run churn signal detection → identify risk phrases, compute churn delta
5. Run expansion signal detection → identify expansion intent phrases
6. Extract action items
7. Generate recommended next-best actions (≤3) with reasoning
8. Generate draft follow-up email
9. Return all outputs with confidence indicators
10. If churn risk detected: add "Executive Check-in" to Agent Actions queue

**Human review:** Draft email requires approval; recommended actions require approval  
**Quality gate:** If overall confidence < 0.6 → flag all outputs as "Low confidence"

---

## Agent 3: Feature Impact Agent

**Trigger:** User submits feature description  
**Autonomy level:** Level 2 — generates match table and draft messages; human approves outreach  
**Output:** Impacted account list, match reasoning, draft customer messages

**Workflow:**
1. Receive feature description text
2. Extract feature category signals (multi-location, RBAC, integration, analytics, etc.)
3. For each account in portfolio, evaluate match criteria:
   - Does account use products/features relevant to this update?
   - Does account have known pain points this feature addresses?
   - Does account have adoption gaps this feature could close?
4. Classify match relevance (High / Medium / Low) with reasoning
5. Classify impact type per account (Churn Reduction / Adoption Improvement / Expansion Opportunity)
6. Generate suggested customer outreach message per tier (pending approval)
7. Calculate total impacted ARR
8. Return structured match table

**Human review:** All customer outreach messages require CSM approval

---

## Agent 4: Expansion Signal Agent

**Trigger:** Meeting notes analysis completes; ongoing account monitoring  
**Autonomy level:** Level 2 — identifies and surfaces signals; recommends actions  
**Output:** Expansion signal cards with recommended outreach action

**Workflow:**
1. Monitor for expansion intent phrases in meeting notes and call transcripts
2. Monitor for signals: new team mentions, budget conversations, positive usage growth, executive engagement
3. When expansion signal detected, score opportunity (0–100)
4. If score ≥ 60: create expansion outreach action in Agent Actions queue
5. Generate recommended expansion messaging for CSM review

**Human review:** Expansion outreach message requires approval  
**De-duplication:** Does not create duplicate expansion signals for the same account within 14 days

---

## Agent 5: QBR Generation Agent

**Trigger:** CSM requests QBR for a specific account  
**Autonomy level:** Level 1 — generates draft; human reviews and edits before any delivery  
**Output:** Full QBR brief draft (9 sections)

**Workflow:**
1. Receive account selection
2. Retrieve full account context: ARR, renewal, stakeholders, products used, health history
3. Retrieve last 90 days of timeline events: meetings, tickets, usage trends
4. Retrieve current risk flags and expansion signals
5. Generate each QBR section using account-specific context:
   - Executive Summary
   - Account Overview
   - Business Goals Recap
   - Adoption Highlights
   - ROI Realized
   - Risks and Open Issues
   - Support Ticket Summary
   - Expansion Opportunities
   - Recommended Next Steps
6. Return full draft with "AI-generated — review before sharing" disclaimer
7. Flag any sections with insufficient data for manual completion

**Human review:** All sections must be reviewed by CSM before delivery; CSM is responsible for final accuracy

---

## Agent 6: Renewal Risk Agent

**Trigger:** Renewal date within 90 days; health score drops to Red  
**Autonomy level:** Level 3 for internal flags; Level 2 for recommended customer outreach  
**Output:** Renewal risk brief, recommended action sequence, escalation if needed

**Workflow:**
1. Monitor for accounts with renewal date ≤ 90 days
2. Evaluate health score, open risks, recent meeting sentiment
3. If high churn risk detected (score ≥ 70): generate renewal risk brief
4. Generate recommended action sequence:
   - Immediate: executive check-in if no meeting in 30 days
   - 60-day out: renewal discussion initiated
   - 30-day out: renewal terms confirmed; escalation if not confirmed
5. If renewal date < 14 days with no renewal activity logged: auto-escalate to CS Director

**Human review:** All customer-facing actions require approval; internal escalation can be auto-executed

---

## Agent Autonomy Levels (Defined)

| Level | Description | Examples |
|-------|-------------|---------|
| Level 1 | Generate only — outputs are drafts for human use | QBR drafts, email templates |
| Level 2 | Recommend + route — surfaces actions to approval queue | Recommended outreach, escalation suggestions |
| Level 3 | Execute internally — no customer-facing execution | Health score updates, internal risk flags, timeline entries |
| Level 4 | Full automation (not in MVP) | Would require sustained high-accuracy demonstration |
