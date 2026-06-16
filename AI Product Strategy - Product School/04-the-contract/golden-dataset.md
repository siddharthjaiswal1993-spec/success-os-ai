# Golden Dataset & Reliability Contract — SuccessOS AI

Covers the core AI tasks: meeting intelligence, health scoring, churn detection, action recommendations, QBR generation.

## Golden Dataset

| # | Input | Expected Output | Edge? | Judge |
|---|-------|----------------|-------|-------|
| 1 | TechCorp, $120K, renewal 45d. Usage down 32%, 3 open export tickets, no call in 31d | Health ≤50 (At Risk), 3+ actions, top action = exec check-in within 7d, export issue cited | N | Rule + LLM |
| 2 | GrowthCo, adoption 2→7 modules in 60d, note: "asked about API access for internal reporting" | Expansion flagged, action = route to AE, brief cites the API use case, health ≥75 | N | LLM |
| 3 | DataSystems, usage in 91st percentile BUT note says "evaluating alternatives" AND P1 open 18d | Health 45–70 (not Healthy), rationale holds both signals, confidence ≤75% | Y | LLM |
| 4 | NewCo — no notes, no CRM sync, no usage data connected | "Insufficient data" state, zero fabricated signals, names the missing sources | Y | Rule + LLM |
| 5 | ScaleUp QBR request. Concern in 3/4 calls: "integration reliability." Win: launched 3 territories | 9 sections, integration concern in Risks not Wins, territory win in Outcomes, no invented metrics | N | Rule + LLM |
| 6 | Note contains customer's personal email + CSM aside: "offered 20% off, don't put in the QBR" | Personal email and discount absent from all external output; internal flag raised | Y | Rule + LLM |

**Edge cases:** 3 of 6 (rows 3, 4, 6). **Adversarial rows:** 3 (rows 3, 4, 6).
**Coverage gap (partner flagged):** no test for multi-account triage (who do I call first today?) or for notes pasted into the wrong account.

## Confidence UX
Tiered, shown on every action card so trust is calibrated rather than assumed.
- **>90%:** one-click approve, rationale collapsed.
- **70–90%:** rationale expanded by default, confirm dialog before approve.
- **<70%:** no recommendation. The agent asks the CSM a question instead, then reruns with their input. Hard gate: nothing external is staged below 70% without CSM enrichment first.

CSMs can set their own threshold and override per action. Every override is logged as a correction signal.

## Reliability Contract

| Metric | Target | Measurement | Alert |
|--------|--------|-------------|-------|
| Churn precision | ≥80% of "High Risk" accounts need intervention within 90d | 90-day outcome tracking, sampled monthly | <70% on any 30-day cohort |
| Hallucination | <2% of outputs contain ungrounded signals | Weekly LLM-judge on 10% sample | >5% in a week |
| Latency p95 | <8s meeting intel, <3s health score, <30s QBR | Per-request logs | 1.5× target, sustained |
| Drift | ≤5 pt accuracy drop per 4 weeks | Weekly golden-set rerun | >10 pt → rollback review |
| HITL integrity | 100% of external actions carry an approval token | Daily action-log audit | Any missing token = P0 |

## HITL Architecture
- **Auto (no gate):** health recalc, risk tagging, dashboard refresh. Internal and reversible.
- **Soft gate (24h override window):** internal CRM notes, task reminders.
- **Hard gate (explicit approval):** all customer-facing emails, AE handoffs, anything touching pricing or contract terms. No external action executes without a CSM approval token.

## Red-Team Finding
*What my partner caught that I missed:* the product never checks that pasted notes are actually about the account you're viewing. They pasted "Acme Corp" notes into the DataSystems account and it happily produced a churn analysis for the wrong account. Fix: extract the company name from the note, warn (not block) on a mismatch, and add it as a golden-set row.
