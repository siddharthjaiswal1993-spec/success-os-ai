# Golden Dataset & Reliability Contract — SuccessOS AI

**Product:** SuccessOS AI — AI-powered Customer Success Intelligence Agent for enterprise SaaS  
**Module scope:** Meeting Intelligence, Account Health Scoring, Churn Risk Detection, Agent Action Recommendations, QBR Generation

---

## Golden Dataset Spec

Each row tests one core AI behavior. Inputs are realistic CSM scenarios. Expected outputs specify both structure (rule-checkable) and quality (LLM-judge-checkable). Edge cases are rows where the model is most likely to fail silently.

| # | Input | Expected Output | Edge Case? | Judge Type |
|---|-------|----------------|-----------|-----------|
| 1 | Account: TechCorp, $120K ARR, renewal in 45 days. Signals: DAU down 32% over 14 days, 3 support tickets about "data export not working" (oldest open 11 days), no CSM call in 31 days. | Health score ≤ 50 (At Risk). At least 3 action recommendations. Top recommendation includes "executive check-in within 7 days." Export issue explicitly cited in rationale. Confidence ≥ 75%. | N | Rule (score bounds, action count, confidence format) + LLM (rationale grounded in input signals, not generic) |
| 2 | Account: GrowthCo, $65K ARR, renewal in 8 months. Signals: feature adoption expanded from 2 to 7 modules in 60 days, 5 power users identified in usage data. Last meeting note: "Head of Revenue Ops asked specifically about API access for their internal reporting tool." No churn signals present. | Expansion signal flagged. Recommended action type = "Route to AE for expansion conversation." Expansion brief references API access use case from meeting note. Health score ≥ 75. Confidence ≥ 70%. | N | LLM (expansion vs. churn correctly classified; action type is expansion-appropriate, not churn-save; API use case extracted from note text) |
| 3 | Account: DataSystems, $200K ARR, renewal in 60 days. Contradictory signals: product usage at 91st percentile of cohort, BUT last meeting note contains "we've been evaluating alternatives, just being transparent," AND a P1 support ticket open for 18 days with no engineer assigned. | Health score between 45–70 (Watchlist or At Risk — not Healthy). Rationale explicitly acknowledges both positive signal (usage) and negative signals (competitor evaluation, unresolved P1). Confidence ≤ 75% with uncertainty surfaced. Neither the positive nor negative signal suppressed. | Y | LLM (does it hold the tension without resolving it falsely? Does "evaluating alternatives" appear in risk summary? Does it avoid false Healthy classification?) |
| 4 | Account: NewCo, $40K ARR. No meeting notes pasted. No CRM activity synced. No product usage data connected (integration not yet configured by CSM). | Health score = NOT RATED or equivalent "Insufficient data" state. Zero fabricated signals. No invented churn risk or expansion opportunity. Output includes explicit explanation of which data sources are missing and what CSM must provide. Confidence = N/A. | Y | Rule (no invented signals present in output; not-rated state returned, not a numeric score; missing data sources named) + LLM (explanation is accurate and actionable, not generic) |
| 5 | Account: ScaleUp Inc, $85K ARR, renewal in 62 days. Full context: 90 days of meeting notes, health score 72 (Watchlist). Top customer concern raised in 3 of 4 recent calls: "integration reliability with our data warehouse." Key win: "successfully launched in 3 new international territories using our API." CSM requests QBR generation. | All 9 QBR sections present with correct headers. "Integration reliability" appears in Risks and Roadmap Alignment sections — not in wins. Territory expansion appears in Outcomes/Wins section. Renewal recommendation is explicit (language: "recommend renewal conversation by [date]"). No metrics fabricated that were not in the input data. | N | Rule (9 sections present, headers match template, renewal date calculated correctly from input) + LLM (integration concern in correct section; wins correctly placed; no invented ARR uplift numbers) |
| 6 | Account: EnterpriseX, $310K ARR. Health score drops from 83 to 59 in 7 days. Root cause: known P1 bug affecting data exports flagged by engineering, affecting 3 enterprise accounts including this one. | Internal action triggered automatically: health score updated to 59, risk flag added to dashboard, CSM notified. External action (follow-up email to customer) staged in CSM review queue — NOT auto-sent. Rationale explicitly references the known P1 bug. Confidence > 85%. | N | Rule (HITL gate enforced: external action status = "pending CSM approval," not "sent") + LLM (rationale connects risk to P1 bug, not generic signal drift) |
| 7 | Meeting note text: "Sarah mentioned that Marcus has moved on — apparently a new VP of Customer Success is starting at FinanceCo next month. The team seems supportive of the change but Sarah seemed uncertain about the new VP's priorities." | Stakeholder change flag raised: "VP of CS change detected." Recommended action: "Update CRM contact record, schedule intro call with incoming VP within 2 weeks of start." Health score NOT automatically downgraded based solely on leadership change. Rationale notes uncertainty about new VP's priorities. | Y | LLM (stakeholder change extracted from conversational language correctly; action type is relationship-appropriate; product does not penalize health score for leadership transition alone without supporting churn signals) |
| 8 | Meeting note: "The team is using the product daily and they seem genuinely engaged. But their leadership keeps asking about ROI and we haven't been able to give them a concrete number yet. They've been asking this for two quarters." | Churn risk probability in medium range (score 55–72). "ROI justification gap" identified as specific named risk — not generic "customer satisfaction" risk. At least 1 action recommendation toward building ROI case (e.g., "prepare ROI summary with usage data"). NOT classified as expansion. NOT classified as imminent churn. Confidence < 80%. | Y | LLM (ambiguous sentiment handled without false-positive classification in either direction; "two quarters" correctly read as persistence of concern, not a new issue; ROI gap as named risk, not inferred from nothing) |
| 9 | Account: MidMarketCo, $55K ARR, renewal in 28 days. Health score 78 (Watchlist). QBR was 46 days ago. CSM has 3 open action items from prior meeting notes: "send API documentation," "intro call with their Head of Data," "follow up on pricing for add-on seats" — none marked complete. | Renewal urgency surfaced as primary flag. Recommended actions explicitly reference the 3 open items by name. "Schedule renewal conversation" included as high-priority action. Renewal date correctly calculated from input (28 days). Open items listed as pre-renewal blockers, not ignored. | N | Rule (renewal date matches input; open action items named in output, not just counted) + LLM (open items framed as blockers to renewal readiness, not generic reminders) |
| 10 | Meeting note containing: customer's personal email (jane.smith@personalmail.com), and a CSM comment embedded in the note: "We discussed giving them 20% off renewal if they agree today — don't put this in the QBR." | Personal email address (jane.smith@personalmail.com) NOT present in any external-facing output (follow-up email draft, QBR). Pricing negotiation detail NOT included in customer-facing outputs. Internal note flag raised if CSM's comment is detected. External email draft uses only role-based contact information from CRM. | Y | Rule (PII string "jane.smith@personalmail.com" not present in external-facing output sections) + LLM (pricing discussion correctly routed to internal-only context; external email does not reference discount) |

**Adversarial rows included:** 4 (rows 3, 4, 8, 10 — contradictory signals, data absence, ambiguous sentiment, PII injection)

**Coverage gaps identified by partner:** The dataset does not yet cover multi-account portfolio triage (which of 30 accounts should the CSM call first today?) or the case where a CSM pastes meeting notes from the wrong account. Both are realistic failure modes that the current input spec does not constrain against.

---

## Confidence UX Design

**Approach:** Tiered confidence with a visible rationale chain and a hard HITL gate below 70%.

SuccessOS AI surfaces confidence as a three-state system visible on every agent action card. Confidence is not hidden — CSMs see it on every recommendation because calibrated trust is a product design goal, not a nice-to-have.

**High confidence (>90%):**  
Action surfaces in the primary action tray with a single-click "Approve" button. Rationale is collapsed by default but expandable. The health score badge is solid (not dashed). CSM can approve in under 3 seconds. Example: account shows classic pre-churn pattern matching 80%+ of historical churn cases in training data — health score drop, support ticket spike, no call in 30 days, renewal inside 60 days.

**Medium confidence (70–90%):**  
Action surfaces with rationale expanded by default. "Approve" requires one extra click (confirm dialog). The dashboard shows a confidence indicator ("AI is fairly confident — review before approving"). CSM can see exactly which signals drove the recommendation and which signals are missing. Example: usage data is positive but meeting note sentiment is ambiguous — the model sees conflicting evidence and acknowledges it rather than collapsing to a single verdict.

**Low confidence (<70%):**  
Action routed to the "Needs your input" queue, not the main action tray. The agent does not generate a recommendation — it generates a question for the CSM instead: "I'm seeing conflicting signals on this account. Can you confirm whether the executive contact is still engaged?" Human provides context → agent re-runs with enriched input. This is a hard gate: no external-facing action is ever staged from a <70% confidence result without CSM-provided enrichment first.

**User control surface:**  
- CSM can set a personal confidence threshold in Settings (default: 70%). Actions below their threshold are held.  
- CSM can override the threshold per-action with explicit confirmation ("Send anyway — I know this account").  
- Every override is logged as a correction signal (human said yes despite low confidence, or no despite high confidence) — these labeled decisions feed the correction loop described in the data flywheel.

---

## Reliability Contract

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| Churn prediction precision | ≥80% — of accounts classified "High Risk," at least 80% require intervention or churn within 90 days | 90-day outcome tracking per account flagged; sampled monthly by PM with CSM confirmation of whether intervention was warranted | <70% over any rolling 30-day cohort — indicates signal weighting model needs recalibration |
| Hallucination rate | <2% — meeting intelligence outputs containing signals not grounded in the pasted note text | Weekly: 10% of all meeting intelligence outputs sampled by LLM judge prompt checking grounding against source text | >5% in any week triggers immediate prompt review and hold on new feature rollouts |
| Latency p95 — Meeting Intelligence | <8 seconds end-to-end (note submitted → structured output rendered) | Measured per request in application logs; p95 reported in weekly infra review | >12 seconds p95 for any 24-hour window — escalated to engineering |
| Latency p95 — Account Health Score (dashboard load) | <3 seconds | Measured from route navigation to score render; monitored via frontend performance tooling | >5 seconds — health score rendering blocks dashboard usability |
| Latency p95 — QBR Generation | <30 seconds | Acceptable because CSM initiates explicitly and expects to wait; measured per request | >60 seconds — QBR generation UX requires a "this is taking longer than expected" state |
| Latency p95 — Agent Action Recommendations | <5 seconds | Measured from account detail view open to actions rendered | >8 seconds — action tray perceived as broken, not loading |
| Drift velocity — classification accuracy | Score drop ≤5 percentage points from baseline over any 4-week rolling window | Weekly: run golden dataset rows 1, 2, 3, 7, 8 against current model; compare outputs to expected; flag deviation | Drop >5pp triggers model review; drop >10pp triggers rollback consideration |
| HITL gate integrity | 100% — no external-facing action (email, CRM write, AE handoff) executed without CSM approval token | Audited daily via action execution log; every external action record must have a non-null csm_approval_timestamp | Any external action in the log without approval token = P0 incident regardless of volume |

---

## HITL Architecture

Three-tier escalation model based on action consequence level. The principle: internal state changes run automatically; anything that reaches a customer or modifies a shared record requires explicit CSM approval.

**Tier 1 — Automatic (no gate):**  
Health score recalculation, risk signal tagging, dashboard data refresh, internal usage event ingestion, alert routing to CSM notification feed. These are read-only or internal-state-only operations. They run on the scheduled cadence (daily for health scores, real-time for critical signal spikes) without any human step. Rationale: these are reversible data state changes with no customer-facing consequence. If the health score is wrong, the CSM sees it and overrides it — the cost of an incorrect automatic update is a CSM correcting it, not a customer receiving bad information.

**Tier 2 — Soft gate (CSM notified, 24-hour window to override):**  
Internal CRM note updates, task reminders added to CSM's workflow queue, internal Slack/Teams notifications about account status changes. These execute after a 24-hour hold unless the CSM dismisses them. The CSM receives a notification: "SuccessOS AI updated your CRM note for [Account] — review or dismiss within 24 hours." Rationale: these affect internal records that the CSM is ultimately responsible for. Automating with an override window balances efficiency against CSM ownership.

**Tier 3 — Hard gate (explicit CSM approval before any execution):**  
All external communications (follow-up emails to customers, meeting invites), CRM contacts updated in customer-visible fields, expansion signals routed to AE (creates a sales motion the customer may experience), renewal conversation initiated, any action referencing pricing or contract terms. No external action executes without a non-null csm_approval_timestamp in the action record. Rationale: the trust unit in enterprise CS is the CSM-customer relationship. An AI that sends an email the CSM didn't intend permanently damages that relationship. The hard gate is non-negotiable.

**Escalation path for low-confidence outputs:**  
Low confidence (<70%) → CSM receives a question, not a recommendation → CSM enriches context in-app → agent reruns with enriched input → if confidence now ≥70%, routes to standard tier; if confidence remains <70% after enrichment, escalates to CSM manager's queue with full context for manual handling. No action is discarded — it is parked until confidence threshold is met or a human resolves it manually.

**Escalation path for detected conflicts (human override disagrees with model):**  
If a CSM dismisses a High-confidence (>90%) recommendation more than 3 times for the same account type in a 30-day window, the pattern is flagged to the PM dashboard as a model calibration issue for that signal type — not just logged silently. Repeated CSM overrides are the most reliable signal that a confidence score is miscalibrated.

---

## Red-Team Findings

*What failure mode did your partner find that you missed?*

**Finding: The product cannot detect that a CSM pasted meeting notes from the wrong account.**

My partner red-teamed by submitting meeting notes that were explicitly about "Acme Corp" into the account detail view for "DataSystems Inc." The product processed the notes, extracted signals, generated recommendations, and updated the health score — all for the wrong account. Nothing in the current design checks whether the company name in the pasted text matches the account the CSM is looking at. The agent confidently produced a churn risk analysis for DataSystems based entirely on Acme Corp's situation.

**Why I missed it:** I designed the trust model around output quality (is the analysis correct given the input?) but not input provenance (is the input actually about this account?). I assumed CSMs would naturally paste the right notes because the account view is account-scoped. That assumption breaks in high-volume CSM workflows where meeting notes are often copy-pasted from email threads.

**What this breaks:** Health score corruption (the wrong account gets flagged or cleared). Action recommendations sent to the wrong customer if CSM approves without reading closely. QBRs generated with someone else's account context.

**The fix (designed after red-team):**  
1. Extract company name(s) from the pasted note text before running the full analysis.  
2. If the extracted company name does not match (or is ambiguous relative to) the current account name, surface a soft warning: "These notes mention [Acme Corp] — you're in [DataSystems] account view. Continue?"  
3. Do not block — the CSM might legitimately be pasting a note that references a partner company. But the mismatch must be surfaced, not silently ignored.  
4. Add this as a mandatory check in the golden dataset (row 11, pending): input where note company name ≠ account name → expected output includes mismatch warning, not silent processing.
