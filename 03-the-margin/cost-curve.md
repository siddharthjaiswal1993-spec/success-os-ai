# Cost Curve — SuccessOS AI

## Cost Model (Per Seat / Month)

Assumes a typical CSM seat: 30 managed accounts, 20 meeting transcripts/month, 5 QBRs/month, continuous health monitoring.

| Cost Category | Per Seat / Month | Workload Assumption | Notes |
|---------------|-----------------|---------------------|-------|
| **Inference — primary model** | **$0.80** | Meeting analysis, QBR generation, complex churn reasoning | Claude Sonnet-tier. 20 meetings × ~3,000 token input + 600 token output = $0.36. 5 QBRs × ~6,000 input + 2,000 output = $0.24. 10 triggered deep-risk events = $0.20 |
| **Inference — cascading / triage** | **$0.55** | Daily health signal triage, signal classification, routing | Claude Haiku-tier. 30 accounts × 30 days × ~200 token input + 100 output = $0.50. Signal routing (50 events/month) = $0.05 |
| **Infrastructure** | **$1.00** | App compute, vector DB, message queue | App hosting ~$0.40. Vector DB (Pinecone / Weaviate for account embeddings + transcript store) ~$0.50. Webhook / queue infra ~$0.10 |
| **Data / Storage** | **$0.20** | Transcript storage, embeddings, account memory | Meeting transcripts ~$0.10. Embedding vectors ~$0.10. Grows sub-linearly at scale |
| **Human-in-the-loop** | **$0.00** | Approval workflow is a product UX feature, not a labor cost | CSM approve/dismiss actions are in-product. No manual review labor in COGS. Engineering correction loop overhead absorbed in R&D, not COGS |
| **Total AI COGS** | **~$2.55** | | |

---

## Gross Margin Snapshot

| Pricing Tier | Price / Seat / Month | AI COGS | Gross Margin |
|---|---|---|---|
| SMB / PLG entry | $49 | $2.55 | ~95% |
| Mid-market | $99 | $2.55 | ~97% |
| Enterprise (target) | $150–$200 | $2.55 | ~98% |

> AI inference cost is not the margin problem. Support, CS, and infra at low account density is the margin problem. Watch CAC payback and support cost per seat, not inference cost per seat.

---

## What Drives Cost Up

| Driver | Cost Impact | Mitigation |
|---|---|---|
| Long meeting transcripts (60+ min calls) | +$0.15–0.30/event | Chunk and summarize before frontier model call |
| QBR volume above 5/month per CSM | +$0.05 per QBR | Cache account context; reuse embeddings across QBR runs |
| Heavy health monitoring (100+ accounts/CSM) | +$0.30–0.50/seat | Cascade more aggressively — Haiku for stable accounts, Sonnet only on anomaly |
| Frontier model price increase (50%) | +$0.40–0.65/seat | Thin LLM abstraction layer enables provider swap without re-architecture |
| Embedding re-indexing at scale | Infrastructure spike | Incremental indexing on webhook events, not full re-index |

---

## Cascading Strategy

**Triage model (Haiku-tier):**
- Daily account health signal scoring
- Signal classification (churn / expansion / neutral)
- Meeting transcript pre-processing and chunking
- Routing decisions (does this event need frontier analysis?)

**Frontier model (Sonnet-tier):**
- Full meeting intelligence (structured churn/expansion analysis + follow-up draft)
- Complex risk reasoning (why is this account at risk + save plan)
- QBR generation (9-section executive brief)
- Next-best action recommendations requiring synthesis across signals

**Routing rule:** Trigger frontier model when health score drops >10 points in 7 days, sentiment is negative in meeting notes, or CSM explicitly requests deep analysis. All other events go through triage model.

**Expected cascade ratio:** ~80% Haiku / ~20% Sonnet by event volume. Cost breakdown reflects this split.
