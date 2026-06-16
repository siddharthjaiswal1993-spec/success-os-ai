# Cost Curve & Pricing — SuccessOS AI

Assumes a typical CSM seat: 30 accounts, ~20 meeting notes/month, 3 QBRs/month, continuous health monitoring. Infra numbers assume 1,000+ seats; early-stage noted separately.

## Cost Model (per seat / month)

| Category | Cost | Notes |
|----------|------|-------|
| Inference (Sonnet-tier) | $1.00 | Meeting notes, QBRs, deep risk analysis, feature impact |
| Inference (Haiku triage) | $0.30–0.55 | Daily health scoring, signal classification, note pre-processing |
| Infrastructure | $1.00 at scale | Hosting, vector DB, webhook queue. $3–5 early-stage before amortization |
| Data / storage | $0.20 | Embeddings on new ingestion |
| Human-in-the-loop | $0.00 | Approve/dismiss is product UX, not labor cost |
| **Total COGS** | **~$2.75 at scale** | ~$5.75 early-stage. Infra amortization is the early drag, not inference |

## Cascading
- **Haiku (~80% of events):** daily scoring for stable accounts, signal classification, note pre-processing before the frontier call.
- **Sonnet (~20% of events, ~65% of cost):** full meeting intelligence, complex risk reasoning, QBR generation, feature impact.
- **Routing rule:** escalate to Sonnet when health drops >10 pts in 7 days, sentiment flags negative, or the CSM submits notes / asks for deep analysis. Everything else stays on Haiku.

## Pricing (seat-based, billed annually)

| Tier | Price | Segment | Core capability |
|------|-------|---------|-----------------|
| Starter | $49 | Series A–B, 5–20 CSMs | Meeting intel (20/mo), dashboard, 3 action types, 5 QBRs/mo |
| Growth | $89 | Series B–D, 20–100 CSMs | Unlimited intel + feature impact + all actions + unlimited QBRs + CRM read/write |
| Enterprise | $149+ | 100+ CSMs | Growth + custom workflows + SSO + fine-tuning at 500+ seats |

Seat-based, not usage-based, because that's how CS teams budget (headcount, not consumption).

**Gross margin:** ~93% early-stage (infra is the drag), ~97% at scale. Inference is never the margin problem at any tier.

## Stress Tests

| Scenario | Impact | Response |
|----------|--------|----------|
| Inference cost 3× | COGS $2.75 → ~$5.25, margin 97% → ~94% | Swap provider via abstraction layer; pilot open-weight models for triage |
| Heaviest users double | Per-seat COGS ~$5 in that segment | Fair-use cap at Growth, push heavy users to Enterprise |
| Provider raises 50% | COGS → ~$3.53, margin → ~96% | Monitor quarterly, no immediate action |

## Board One-Liner
Same seat-based model as legacy CS tools, but AI replaces manual CSM work, which justifies a 2–3× price premium. AI adds ~$2.75/seat in COGS (3–7% of revenue), and customers pay for outcomes rather than dashboard access. Margins beat legacy tools above ~500 seats, and the data flywheel compounds a defensibility no pure-SaaS tool can match.
