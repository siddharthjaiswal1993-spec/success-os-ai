# Cost Curve & Pricing Strategy — SuccessOS AI

Assumes a typical CSM seat: 30 accounts, ~20 meeting notes/month, 3 QBRs/month, continuous health monitoring. Infra numbers assume 1,000+ seats; early-stage noted separately.

## Cost Model

| Cost Category | Per-User/Month | Notes |
|--------------|----------------|-------|
| Inference (primary model) | $1.00 | Sonnet-tier calls for meeting notes, QBRs, deep risk analysis, feature impact |
| Inference (cascading/triage) | $0.30–0.55 | Haiku-tier daily health scoring, signal classification, note pre-processing |
| Infrastructure | $1.00 at scale | Hosting, vector DB, webhook queue. $3–5 early-stage before amortization |
| Data/storage | $0.20 | Embeddings on new ingestion |
| Human-in-the-loop | $0.00 | Approve/dismiss is product UX, not labor cost |
| **Total AI COGS** | **~$2.75 at scale** | ~$5.75 early-stage. Infra amortization is the early drag, not inference |

## Cascading Strategy

**Triage model:** Haiku-tier / small model for daily scoring, signal classification, and note pre-processing.  
**Frontier model:** Sonnet-tier / stronger model for meeting intelligence, complex risk reasoning, QBRs, and feature impact.  
**Routing rule:** Escalate to frontier when health drops >10 pts in 7 days, sentiment flags negative, or the CSM asks for deep analysis. Everything else stays on triage.  
**Expected cascade ratio:** ~80% triage / ~20% frontier. Frontier is only ~20% of volume but ~65% of inference cost.

## Pricing Model

**Current pricing:** Legacy CS platforms are typically seat-based SaaS, priced as workflow software rather than AI usage.  
**Proposed AI pricing:** Seat-based, billed annually.
**Model:** Seat-based, not usage-based, because CS teams budget by headcount, not consumption.

| Tier | Price | Segment | Core capability |
|------|-------|---------|-----------------|
| Starter | $49 | Series A–B, 5–20 CSMs | Meeting intel (20/mo), dashboard, 3 action types, 5 QBRs/mo |
| Growth | $89 | Series B–D, 20–100 CSMs | Unlimited intel + feature impact + all actions + unlimited QBRs + CRM read/write |
| Enterprise | $149+ | 100+ CSMs | Growth + custom workflows + SSO + fine-tuning at 500+ seats |

**Gross margin:** ~93% early-stage, ~97% at scale. Inference is never the margin problem at any tier.

## Stress Tests

| Scenario | Impact on Margin | Response |
|----------|------------------|----------|
| Inference costs 3x | COGS $2.75 → ~$5.25, margin 97% → ~94% | Swap provider via abstraction layer; pilot open-weight models for triage |
| Heaviest segment doubles | Per-seat COGS ~$5 in that segment | Fair-use cap at Growth, push heavy users to Enterprise |
| Model provider raises prices 50% | COGS → ~$3.53, margin → ~96% | Monitor quarterly, no immediate action |

## Board One-Pager

**Before (traditional SaaS):** CS tools sell dashboards, health scores, and workflow management. Value is tied to visibility and process consistency.

**After (AI-enabled):** SuccessOS AI sells intervention speed: detecting weak churn signals, prioritizing actions, drafting outputs, and learning from outcomes.

**Net margin shift:** AI adds ~$2.75/seat in COGS (3–7% of revenue), while supporting a 2–3× price premium versus basic workflow software. Margins beat legacy tools above ~500 seats, and the correction-data flywheel creates defensibility a pure SaaS dashboard cannot match.
