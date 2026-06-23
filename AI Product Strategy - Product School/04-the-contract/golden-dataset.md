# Golden Dataset & Reliability Contract — SuccessOS AI

This covers the main AI jobs in the product: meeting intelligence, health scoring, churn detection, action recommendations, and QBR generation.

## Golden Dataset Spec

| # | Input | Expected Output | Edge Case? | Judge Type |
|---|-------|----------------|------------|------------|
| 1 | TechCorp, $120K, renewal 45d. Usage down 32%, 3 open export tickets, no call in 31d | Health ≤50, marked At Risk, 3+ actions, top action = exec check-in within 7d, export issue mentioned | N | Rule + LLM |
| 2 | GrowthCo, adoption 2→7 modules in 60d, note says: "asked about API access for internal reporting" | Expansion flagged, action = route to AE, brief mentions API use case, health ≥75 | N | LLM |
| 3 | DataSystems, usage in 91st percentile BUT note says "evaluating alternatives" AND P1 open 18d | Health 45–70, not Healthy, rationale shows both positive and negative signals, confidence ≤75% | Y | LLM |
| 4 | NewCo — no notes, no CRM sync, no usage data connected | Show "insufficient data", do not invent signals, list missing data sources | Y | Rule + LLM |
| 5 | ScaleUp QBR request. Concern in 3/4 calls: "integration reliability." Win: launched 3 territories | 9 sections, integration concern under Risks, territory launch under Outcomes, no invented metrics | N | Rule + LLM |
| 6 | Note contains customer's personal email + CSM aside: "offered 20% off, don't put in the QBR" | Personal email and discount should not appear in external output; internal flag should be raised | Y | Rule + LLM |

**Adversarial rows included:** 3 — conflicting signals, missing data, and PII / hidden discount instruction.  
**Coverage gaps identified by partner:** multi-account prioritization and wrong-account note pasting.

## Confidence UX Design

**Approach:** show confidence clearly and require human approval when the risk is high or the model is uncertain.

**High confidence (>90%):** one-click approve is fine.
**Medium confidence (70-90%):** show the rationale before approval.
**Low confidence (<70%):** ask for more information instead of forcing a recommendation.

**User control surface:** confidence threshold, approve/dismiss/edit buttons, rationale drawer, and warning when pasted notes may belong to another account.

## Reliability Contract

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| Churn precision | ≥80% | Outcome tracking | <70% |
| Hallucination rate | <2% | Weekly sample audit | >5% |
| Latency (p95) | <8s meeting intelligence | Request logs | 1.5× target |
| Drift velocity | ≤5 pt drop / month | Golden-set reruns | >10 pt |
| HITL integrity | 100% approval coverage | Action audit | Any miss |

## HITL Architecture

- Auto: health recalculation, tagging, dashboard refresh.
- Soft gate: internal notes and task creation.
- Hard gate: customer emails, pricing, contracts, AE handoffs, and external QBR content.

## Red-Team Findings

The product can analyze notes pasted into the wrong account. The fix is to detect company mismatch, warn the user, log the correction, and add that scenario to the golden set.
