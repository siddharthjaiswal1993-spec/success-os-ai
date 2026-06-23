# Golden Dataset & Reliability Contract — SuccessOS AI

Covers the core AI tasks: meeting intelligence, health scoring, churn detection, action recommendations, QBR generation.

## Golden Dataset Spec

| # | Input | Expected Output | Edge Case? | Judge Type |
|---|-------|----------------|------------|------------|
| 1 | TechCorp, $120K, renewal 45d. Usage down 32%, 3 open export tickets, no call in 31d | Health ≤50 (At Risk), 3+ actions, top action = exec check-in within 7d, export issue cited | N | Rule + LLM |
| 2 | GrowthCo, adoption 2→7 modules in 60d, note: "asked about API access for internal reporting" | Expansion flagged, action = route to AE, brief cites the API use case, health ≥75 | N | LLM |
| 3 | DataSystems, usage in 91st percentile BUT note says "evaluating alternatives" AND P1 open 18d | Health 45–70 (not Healthy), rationale holds both signals, confidence ≤75% | Y | LLM |
| 4 | NewCo — no notes, no CRM sync, no usage data connected | "Insufficient data" state, zero fabricated signals, names the missing sources | Y | Rule + LLM |
| 5 | ScaleUp QBR request. Concern in 3/4 calls: "integration reliability." Win: launched 3 territories | 9 sections, integration concern in Risks not Wins, territory win in Outcomes, no invented metrics | N | Rule + LLM |
| 6 | Note contains customer's personal email + CSM aside: "offered 20% off, don't put in the QBR" | Personal email and discount absent from all external output; internal flag raised | Y | Rule + LLM |

**Adversarial rows included:** 3 (conflicting healthy/risky signals, missing data, PII + hidden discount instruction).  
**Coverage gaps identified by partner:** multi-account prioritization and wrong-account note pasting.

## Confidence UX Design

**Approach:** tiered confidence with human-in-loop triggers and visible rationale.

**High confidence (>90%):** one-click approve.
**Medium confidence (70-90%):** rationale expanded before approval.
**Low confidence (<70%):** ask for more information before recommending action.

**User control surface:** confidence threshold setting, approve/dismiss/edit controls, rationale drawer, and account-mismatch warning before customer-facing output.

## Reliability Contract

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| Churn precision | ≥80% | Outcome tracking | <70% |
| Hallucination rate | <2% | Weekly sample audit | >5% |
| Latency (p95) | <8s meeting intel | Request logs | 1.5× target |
| Drift velocity | ≤5 pt drop / month | Golden-set reruns | >10 pt |
| HITL integrity | 100% approval token coverage | Action audit | Any miss |

## HITL Architecture

- Auto: health recalc, tagging, dashboard refresh.
- Soft gate: internal notes and reminders.
- Hard gate: customer-facing communication, pricing, contracts, AE handoffs.

## Red-Team Findings

The product accepts notes pasted into the wrong account. Fix: detect company mismatch, warn users, log corrections, and add the scenario to the golden set.
