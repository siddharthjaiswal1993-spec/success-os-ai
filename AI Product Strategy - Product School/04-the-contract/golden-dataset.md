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

**Coverage gap:** multi-account prioritization and wrong-account note pasting.

## Confidence UX
- >90%: one-click approve.
- 70–90%: rationale expanded.
- <70%: ask for more information before recommending action.

## Reliability Contract

| Metric | Target | Measurement | Alert |
|--------|--------|-------------|-------|
| Churn precision | ≥80% | Outcome tracking | <70% |
| Hallucination | <2% | Weekly sample audit | >5% |
| Latency p95 | <8s meeting intel | Request logs | 1.5× target |
| Drift | ≤5 pt drop / month | Golden-set reruns | >10 pt |
| HITL integrity | 100% approval token coverage | Action audit | Any miss |

## HITL Architecture
- Auto: health recalc, tagging, dashboard refresh.
- Soft gate: internal notes and reminders.
- Hard gate: customer-facing communication, pricing, contracts, AE handoffs.

## Red-Team Finding
The product accepts notes pasted into the wrong account. Fix: detect company mismatch, warn users, log corrections, and add the scenario to the golden set.