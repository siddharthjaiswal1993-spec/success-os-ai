# Cost Curve — SuccessOS AI

## Cost Model (Per Seat / Month)

Assumes a typical CSM seat: 30 managed accounts, 20 meeting note pastes/month, 3 QBRs/month (quarterly cadence, staggered), continuous health monitoring.

**Scale assumption for infrastructure: 1,000+ seats. See footnote for early-stage costs.**

| Cost Category | Per Seat / Month | Workload Assumption | How the number is built |
|---|---|---|---|
| **Inference — primary model** | **$1.00** | Meeting intelligence, QBR generation, deep risk analysis, feature impact queries | Meeting notes: 20 × 2,000 token input + 1,200 token output (structured analysis + follow-up email draft) = $0.48. QBRs: 3 × 6,000 input + 2,500 output (9-section brief) = $0.17. Deep risk: 8 triggered events × 4,000 input + 1,500 output = $0.28. Feature Impact: 4 queries × 2,000 input + 800 output = $0.07. Total: ~$1.00 at Claude Sonnet-tier pricing ($3/MTok input, $15/MTok output) |
| **Inference — cascading / triage** | **$0.55** *(upper bound)* | Daily health signal scoring, signal classification, routing decisions | 30 accounts × 30 days = 900 triage events × 200 token input + 100 token output at Haiku-tier ($0.80/MTok input, $4/MTok output) = $0.50. Signal classification (50 events/month) = $0.05. Upper bound: real product is event-driven, not daily batch — stable accounts update every 2–3 days, cutting this to $0.30–0.40 in practice |
| **Infrastructure** | **$1.00** *(at 1,000+ seats)* | App compute, vector DB, webhook queue | App hosting ~$0.40. Vector DB (Pinecone/Weaviate — account embeddings + transcript store) ~$0.50. Queue infra ~$0.10. **Early-stage warning: at 100–500 seats this is $3–5/seat before fixed costs amortise** |
| **Data / Storage** | **$0.20** | Meeting note store, embedding vectors, account memory | 20 notes × ~2KB/month + embedding vectors for 30 accounts. Storage cost is negligible at this volume; $0.20 accounts for embedding computation on new data ingestion |
| **Human-in-the-loop** | **$0.00** | Approve/dismiss is a product UX feature, not a labor cost | CSM actions are in-product. No manual review labor in COGS. Engineering overhead for correction loop is R&D, not COGS |
| **Total AI COGS** | **~$2.75** *(at scale)* | | Early-stage (100–500 seats): **~$5.75/seat** before fixed cost amortisation |

---

## What Changed From v1

| Item | v1 | v2 | Why |
|---|---|---|---|
| Primary model | $0.80 | $1.00 | Output tokens for meeting intelligence were underestimated (600 → 1,200); Feature Impact module was missing entirely; QBR frequency corrected from 5 to 3/month (QBRs are quarterly, not monthly) |
| Infrastructure | $1.00 (unlabelled) | $1.00 at scale / $3–5 early-stage | Original number was only valid at 1,000+ seats — misleading without that context |
| Total | $2.55 | $2.75 | Net of above |

---

## Gross Margin Snapshot

| Scale | Price / Seat / Month | AI COGS | Gross Margin |
|---|---|---|---|
| Early-stage (100–500 seats) | $150 | $5.75 | ~96% — still strong, but infra is the drag |
| At scale (1,000+ seats) | $150 | $2.75 | ~98% |
| Mid-market entry | $99 | $2.75 | ~97% |

> AI inference is not the margin problem at any tier. The margin problem at early stage is infrastructure cost per seat before you hit amortisation scale. The margin problem at growth stage is CAC payback and CS/support overhead per account, not tokens per seat.

---

## What Drives Cost Up

| Driver | Cost Impact | Mitigation |
|---|---|---|
| Full call recordings instead of pasted notes | +$0.30–0.60/meeting | Pre-process with Haiku: transcribe + chunk → pass summary to Sonnet, not raw audio tokens |
| QBR volume above 3/month per CSM | +$0.19 per additional QBR | Cache account context embeddings; reuse across QBR runs without re-fetching |
| Heavy accounts (100+ per CSM) | +$0.30–0.50/seat in triage | Cascade more aggressively — Haiku for stable accounts (health score variance < 5%), Sonnet only on anomaly detection |
| Frontier model price increase (50%) | +$0.50/seat | Thin LLM abstraction layer (swap provider without re-architecture) |
| Low seat count (<200 seats) | +$2–4/seat in infrastructure | Fixed cost problem, not a unit cost problem — price accordingly or absorb in early ARR |

---

## Cascading Strategy

**Triage model (Haiku-tier) — ~80% of event volume:**
- Daily health signal scoring for stable accounts
- Signal classification: churn / expansion / neutral
- Meeting note pre-processing and chunking before frontier call
- Routing decision: does this event need deep analysis?

**Frontier model (Sonnet-tier) — ~20% of event volume, ~65% of inference cost:**
- Full meeting intelligence (structured analysis + follow-up email draft)
- Complex risk reasoning (why is this account at risk + recommended save plan)
- QBR generation (9-section executive brief)
- Feature impact analysis (customer match table + messaging)
- Next-best action recommendations requiring cross-signal synthesis

**Routing rule:** Trigger frontier model when health score drops >10 points in 7 days, meeting sentiment is negative, CSM pastes meeting notes, or CSM explicitly requests deep analysis. All other events → triage model.

**Expected cascade ratio:** ~80% Haiku / ~20% Sonnet by event count. By cost: ~35% Haiku / ~65% Sonnet.
