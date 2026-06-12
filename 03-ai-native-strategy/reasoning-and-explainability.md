# Reasoning and Explainability — SuccessOS AI

---

## The Explainability Mandate

AI outputs in SuccessOS AI directly affect decisions about customer relationships and revenue. A health score of 35 (Red) might trigger an executive escalation. A churn risk flag might cause a CSM to cancel a planned expansion conversation. A feature impact match might determine which customers are prioritized for outreach.

For users to act on these outputs, they must be able to *understand why* the AI reached its conclusion. Opaque AI outputs — even accurate ones — will not be trusted. The product cannot succeed if users treat AI outputs as advisory noise to be ignored.

**Every AI output in SuccessOS AI surfaces its reasoning.**

---

## Reasoning Surfaces by Module

### Meeting Intelligence — Churn Risk Flag

The output shows:
- **Risk level:** High / Medium / Low
- **Delta:** Increased / Stable / Decreased
- **Triggering phrases:** Direct quotes from meeting notes that triggered the flag
- **Context factor:** What in the account history made these phrases more / less significant
- **Confidence:** High / Medium / Low with brief explanation

*Example:*
> **Churn Risk: High — Increased**  
> *Triggered by:* "we're not seeing the value anymore" (line 4), "we've been having this conversation for six months" (line 12)  
> *Context:* Adoption declined 18% last month; no open issue resolution in 30 days  
> *Confidence: High* — Multiple reinforcing signals with consistent sentiment

---

### Account Health Score

The health score is not a single opaque number. The UI shows:

- **Overall score:** 71/100 — Yellow
- **Component breakdown:**
  - Adoption: 68 — Usage down 18% last 30 days
  - Sentiment: 72 — Last meeting cautious; prior meeting positive
  - Support: 65 — 1 medium-severity open ticket (14 days)
  - Engagement: 74 — CSM meeting 12 days ago; exec sponsor engaged
  - Renewal Risk: 58 — Renewal in 95 days; no renewal discussion initiated
- **Trend:** -4 points in last 30 days
- **Why it changed:** "Adoption decline in Analytics Suite moved Adoption score from 78 to 68 since May 15"

---

### Agent Actions — Recommendation Reasoning

Each recommended action shows:

- **What is recommended:** "Schedule executive check-in with Sarah Chen (VP Operations)"
- **Why:**  
  "Health score dropped to Yellow in last 30 days. Last executive-level contact was 47 days ago. Recent meeting notes flagged adoption frustration. Renewal is 95 days out with no renewal discussion initiated."
- **Confidence:** Medium — "Recommendation is based on engagement gap and adoption decline. Churn signal is not confirmed; proactive check-in is a risk mitigation action, not a crisis response."
- **What success looks like:** "Executive sponsor re-engaged; adoption concern surfaced and addressed"

---

### Feature Impact — Match Reasoning

Each matched account shows:

- **Why matched:** "FranchiseWorks currently uses Core Platform across 12 locations. The multi-location benchmarking dashboard directly addresses their stated goal of cross-location performance comparison (mentioned in QBR, Jan 2026)."
- **Impact type:** Expansion Opportunity — "Feature removes a known product gap that has been cited as a reason for limited expansion"
- **Confidence:** High

---

## Confidence Communication Design

Confidence is communicated consistently across the product:

| Confidence Level | Visual Treatment | User Guidance |
|-----------------|-----------------|---------------|
| High (≥ 0.80) | Green indicator | "AI is confident — act on this with standard review" |
| Medium (0.60–0.79) | Yellow indicator | "AI is moderately confident — review supporting evidence before acting" |
| Low (< 0.60) | Red indicator | "AI is uncertain — treat as an advisory signal only; verify independently" |

Low-confidence outputs:
- Are not auto-approved even for internal actions
- Show expanded reasoning (what additional information would improve confidence)
- Are never used as the basis for customer-facing automated messages

---

## What Explainability Is Not

Explainability in SuccessOS AI is not:
- A full trace of the LLM's attention mechanism
- A post-hoc rationalization that sounds plausible but is not grounded in the actual output
- A confidence score without supporting evidence

It is: **A structured, evidence-linked, human-readable explanation of why this output was generated, what signals drove it, and what would change the conclusion.**
