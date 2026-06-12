# Edge Cases and Failure Modes — SuccessOS AI

---

## Meeting Intelligence Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Notes are very short (< 50 words) | Return a low-confidence summary; show warning: "Notes are brief — analysis quality may be limited. Add more context for better results." |
| Notes contain no actionable signals | Return summary with sentiment; churn delta = Stable; no expansion signal. Do not invent signals. |
| Notes contain multiple competing signals (churn risk AND expansion signals) | Surface both; order by severity (churn risk shown first); explain the contradiction |
| Notes are in a language other than English | If language detected, return: "Notes appear to be in [language]. English-language analysis is currently supported. Please provide notes in English." |
| Notes reference a real customer name or PII that should not be in the analysis output | Strip PII from outputs; log a governance alert |
| CSM pastes a document with HTML or markdown formatting | Strip formatting; analyze plain text content |
| AI confidence on churn classification is below threshold (< 0.6) | Show "Low confidence" flag; do not escalate automatically; present as advisory only |
| Meeting notes reference a product feature that does not exist | Acknowledge the customer mention; do not validate or fabricate product context |

---

## Feature Impact Intelligence Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Feature description is very generic ("improve performance") | Return: "Feature description is too generic to identify specific impacted accounts. Please add context about: who benefits, what workflow is affected, what data or config it touches." |
| Feature matches zero accounts | Return empty match table with message: "No accounts match this feature profile based on current account data." Do not force a match. |
| Feature matches all accounts | Return all accounts; flag that "this is a broad-impact feature affecting your full portfolio" |
| Feature description contains customer-confidential information accidentally pasted | Warn user; do not store or use in outputs |
| Two features entered with conflicting descriptions | Treat as separate analysis requests; do not merge |

---

## Account Health Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Account has no meetings logged in 60+ days | Flag as engagement risk; include in health score degradation |
| Support ticket count is unusually high (>10 open) | Flag as critical support risk; surface in health score; recommend escalation |
| Account ARR changes significantly (>20% up or down) | Log a timeline event; do not automatically change recommended actions until CSM confirms reason |
| CSM is reassigned (account ownership changes) | Flag as onboarding transition risk; recommend introduction action |
| Renewal date is within 30 days with no renewal activity logged | Auto-escalate to High Churn Risk; create coaching action for CSM manager |
| Health score is manually overridden by CSM | Log the override; keep AI score visible as reference; honor manual score in displays until next AI update |

---

## QBR Generator Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Account has very limited data (new customer, few signals) | Generate QBR with available data; clearly flag sections with "Insufficient data — please add manually" |
| Account has conflicting signals (high adoption but high churn risk) | Surface the contradiction explicitly in the Executive Summary section |
| QBR is generated for an account the user does not own | Show a warning if account is outside user's portfolio; allow with confirmation |
| Output contains factual error (wrong ARR, wrong renewal date) | Clear disclaimer on generated QBR; all factual fields should be validated by CSM before delivery |

---

## Agent Actions Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| CSM approves an external action but the customer contact email is missing | Block execution; prompt CSM to add contact details |
| CSM dismisses the same recommendation 3+ times | Stop generating that recommendation type for that account; flag for agent configuration review |
| An action is in the queue for >7 days with no response | Escalate to CS manager with notification |
| Multiple conflicting actions are recommended for the same account simultaneously | Show as a bundle; let CSM resolve the priority before approving |
| Action is approved but execution environment is unavailable (integration offline) | Queue the action; notify CSM; do not mark as completed until confirmed delivered |

---

## AI Output Quality Failure Modes

| Failure Mode | Detection Method | Response |
|-------------|-----------------|----------|
| Hallucinated customer fact (e.g., wrong product usage) | Automated fact-check against account data; human audit sample | Block output; flag for review; log incident |
| Overconfident low-quality recommendation | Confidence calibration monitoring | Show "Low confidence" warning; require explicit CSM confirmation |
| Biased churn prediction (same risk score regardless of input) | Score distribution monitoring | Trigger model review; suspend automated escalation |
| Customer-facing draft contains inappropriate tone | Tone classifier on all drafts | Flag; require CSM to re-approve after revision |
| QBR contains confidential data from a different account | Tenant isolation check on all outputs | Block; log security incident; alert admin |

---

## Graceful Degradation Requirements

The product must continue to provide partial value when AI components are unavailable:

| Component Unavailable | Fallback Behavior |
|----------------------|------------------|
| Meeting Intelligence AI | Show form-based note capture; disable analysis; notify user |
| Health Score AI | Show last known score with staleness indicator; allow manual override |
| QBR Generator AI | Show template with blank sections; allow manual fill |
| Feature Impact AI | Show account list with manual tagging |
| All AI services | Core account list, timeline, and manual data entry remain available |
