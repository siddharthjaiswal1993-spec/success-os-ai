# Human-in-the-Loop Design — SuccessOS AI

---

## Why HITL Is Not Optional

Customer Success workflows involve:

1. **Revenue risk** — recommending the wrong action on a $500K renewal has real consequences
2. **Relationship capital** — a poorly timed or wrongly framed customer email can damage trust that took months to build
3. **Contextual judgment** — AI does not know that a customer's executive sponsor just left, or that the account team has agreed to a workaround not logged in the system
4. **Legal exposure** — customer communications can be used in disputes; accuracy and tone matter

For these reasons, human approval on customer-facing actions is not a constraint imposed on the product — it is a core design principle.

---

## The Boundary: Internal vs. External

| Action Type | Examples | Approval Required? |
|-------------|---------|-------------------|
| Internal state update | Update health score, log risk flag, add timeline entry | No (auto-executed) |
| Internal escalation | Notify CS director, create coaching task | No (auto-executed) |
| Draft generation | Generate QBR, draft email | No (auto-generated; not sent) |
| External communication — low risk | Automated product update notification | Optional (configurable by admin) |
| External communication — medium risk | Follow-up email, scheduling a call | Yes — CSM approval required |
| External communication — high risk | Renewal discussion, escalation to executive | Yes — CS Director approval required |

---

## The Approval Workflow UX Design

Approval UX must be **fast** (target: 30 seconds per action) and **informative** (CSM can make a confident decision without additional research).

Each action in the approval queue shows:

1. **What:** Plain-language description of the recommended action
2. **Why:** The signal(s) that triggered the recommendation, with direct quotes where applicable
3. **Confidence:** AI confidence level (High/Medium/Low) with explanation
4. **Preview:** Draft of the exact content that would be sent/executed
5. **Context:** Last account health score, renewal date, last meeting date
6. **Controls:** Approve / Edit + Approve / Dismiss (with reason)

---

## Dismissal Design

Dismissals are as important as approvals for system learning. Dismissal UX:

- **One-click dismiss** with required reason:
  - Not relevant to this account right now
  - Already handled outside the platform
  - Wrong timing
  - Content quality is insufficient
  - Other (free text)

- **Learning signal:** Dismissal reason is logged against the action type and account context
- **Pattern escalation:** If the same action type is dismissed 3× in 30 days → surfaced to admin for agent configuration review
- **Reputation:** Agent recommendation acceptance rate is visible to CS Director (per action type, per agent)

---

## Trust Escalation Model

Trust in autonomous AI actions is earned incrementally:

**Stage 1 (Default — Supervised):**
All agent actions, including internal state updates, are visible to CSM before execution. CSM can pause any action.

**Stage 2 (Verified):**
Internal actions execute automatically. External actions require approval. This is the default production mode.

**Stage 3 (Trusted):**
Low-risk, high-accuracy external actions (e.g., product update notifications to accounts that have opted in) execute automatically. All high-risk external actions still require approval. Admin-configurable.

**Not available:**
Full automation of renewal communications, executive outreach, or any communication involving pricing, commitments, or dispute context. These always require human review.

---

## Failure Modes and Safeguards

| Failure Mode | Safeguard |
|-------------|-----------|
| AI recommends inappropriate customer communication | Tone classifier runs before action is surfaced; action blocked if tone risk detected |
| AI generates factually wrong content | "AI-generated — verify before sending" disclaimer on all drafts; fact fields cross-checked against account data |
| CSM approves without reading carefully | Quick review UX designed to surface the most risk-relevant element prominently; no single-click approval (requires explicit review of preview) |
| Approval queue becomes overwhelming (decision fatigue) | Action queue is prioritized; Critical actions shown first; low-confidence actions filtered out by default |
| Action approved but context has changed since generation | Stale action detection: actions older than 7 days without approval are flagged as "Context may have changed — please re-review" |
