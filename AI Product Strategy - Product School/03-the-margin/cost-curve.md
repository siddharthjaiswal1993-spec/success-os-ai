# Cost Curve & Pricing Strategy

## Cost Model

Assumes a typical CSM seat: 30 managed accounts, 20 meeting note pastes/month, 3 QBRs/month (quarterly cadence, staggered), continuous health monitoring. Infrastructure numbers assume 1,000+ seats at scale; early-stage (100–500 seats) costs noted separately.

| Cost Category | Per-User/Month | Notes |
|--------------|----------------|-------|
| Inference (primary model) | $1.00 | Claude Sonnet-tier ($3/MTok input, $15/MTok output). Meeting notes: 20 × (2,000 input + 1,200 output) = $0.48. QBRs: 3 × (6,000 input + 2,500 output) = $0.17. Deep risk analysis: 8 triggered events × (4,000 input + 1,500 output) = $0.28. Feature Impact: 4 queries × (2,000 input + 800 output) = $0.07. Total: ~$1.00 |
| Inference (cascading/triage) | $0.55 (upper bound) | Haiku-tier ($0.80/MTok input, $4/MTok output). 30 accounts × 30 days = 900 triage events × (200 input + 100 output) = $0.50. Signal classification (50 events/month) = $0.05. In practice $0.30–0.40 as stable accounts update every 2–3 days, not daily |
| Infrastructure | $1.00 (at 1,000+ seats) | App hosting ~$0.40. Vector DB (account embeddings + transcript store) ~$0.50. Webhook queue infra ~$0.10. Early-stage (100–500 seats): $3–5/seat before fixed costs amortise |
| Data/storage | $0.20 | 20 notes × ~2KB/month + embedding vectors for 30 accounts. Storage cost negligible at this volume; $0.20 covers embedding computation on new data ingestion |
| Human-in-the-loop | $0.00 | Approve/dismiss is a product UX feature, not a labor cost. CSM actions are in-product; no manual review labor in COGS. Engineering overhead for correction loop is R&D, not COGS |
| **Total AI COGS** | **~$2.75 (at scale)** | Early-stage (100–500 seats): ~$5.75/seat before fixed cost amortisation. AI inference is not the margin problem at any tier — infrastructure amortisation is the early-stage drag; CAC payback and CS overhead is the growth-stage drag |

**What drives cost up:**

| Driver | Cost Impact | Mitigation |
|--------|-------------|------------|
| Full call recordings instead of pasted notes | +$0.30–0.60/meeting | Pre-process with Haiku: transcribe + chunk → pass summary to Sonnet, not raw audio tokens |
| QBR volume above 3/month per CSM | +$0.19 per additional QBR | Cache account context embeddings; reuse across QBR runs without re-fetching |
| Heavy accounts (100+ per CSM) | +$0.30–0.50/seat in triage | Cascade more aggressively — Haiku for stable accounts (health score delta < 5%), Sonnet only on anomaly detection |
| Frontier model price increase (50%) | +$0.50/seat | Thin LLM abstraction layer (swap provider without re-architecture) |
| Low seat count (<200 seats) | +$2–4/seat in infrastructure | Fixed cost problem, not a unit cost problem — price accordingly or absorb in early ARR |

## Cascading Strategy

**Triage model:** Claude Haiku-tier — fast, cheap, handles ~80% of event volume
- Daily health signal scoring for stable accounts
- Signal classification: churn risk / expansion / neutral
- Meeting note pre-processing and chunking before frontier call
- Routing decision: does this event need deep analysis?

**Frontier model:** Claude Sonnet-tier — handles ~20% of event volume, ~65% of inference cost
- Full meeting intelligence (structured churn/expansion analysis + follow-up email draft)
- Complex risk reasoning (why is this account at risk + recommended save plan)
- QBR generation (9-section executive brief with account-specific context)
- Feature impact analysis (customer match table + per-account messaging rationale)
- Next-best action recommendations requiring cross-signal synthesis

**Routing rule:** Trigger Sonnet when health score drops >10 points in 7 days, meeting sentiment is flagged negative, CSM manually submits meeting notes, or CSM requests deep analysis. All other events (routine daily scoring, stable account health checks, signal classification) → Haiku.

**Expected cascade ratio:** ~80% Haiku / ~20% Sonnet by event count. By cost: ~35% Haiku / ~65% Sonnet.

## Pricing Model

**Current pricing:** N/A — new product, no legacy pricing to migrate from.

**Proposed AI pricing:**

| Tier | Price | Target Segment | Core AI Capability |
|------|-------|---------------|-------------------|
| Starter | $49/seat/month (annual) | Series A–B; 5–20 CSMs | Meeting Intelligence (20/seat/month), Health Dashboard, Basic Actions (3 types), QBR Generator (5 accounts/month) |
| Growth | $89/seat/month (annual) | Series B–D; 20–100 CSMs | Unlimited Meeting Intelligence + Feature Impact Agent + all 6 action types + unlimited QBRs + Expansion Signal tracking + CRM read/write |
| Enterprise | $149/seat/month + custom (annual) | 100+ CSMs; late stage / public | Everything in Growth + custom agentic workflows + SAML SSO + fine-tuning at 500+ seats + Platform API |

**Model:** Seat-based — per CSM seat/month, billed annually. Not usage-based; we do not charge per AI call, QBR generated, or analysis run. Pricing is aligned with how CS teams budget (headcount, not consumption). Monthly billing available at 15–20% premium over annual.

**Gross margin by tier:**

| Scale | Price / Seat / Month | AI COGS | Gross Margin |
|-------|---------------------|---------|--------------|
| Early-stage (100–500 seats), blended ~$85 | $85 | $5.75 | ~93% — infra amortisation is the drag, not inference |
| At scale (1,000+ seats), blended ~$85 | $85 | $2.75 | ~97% |
| Enterprise anchor ($149) | $149 | $2.75 | ~98% |

## Stress Tests

| Scenario | Impact on Margin | Response |
|----------|-----------------|----------|
| Inference costs 3× | AI COGS rises from $2.75 → ~$5.25/seat at scale. At $85 blended price, gross margin compresses from ~97% → ~94%. Still viable; not a crisis at this price point | Thin LLM abstraction layer allows provider swap without re-architecture. Evaluate open-weight models (Llama 3, Mistral) for triage-tier replacement. Pass-through surcharge only if cost increase is sustained >6 months |
| Heaviest-use segment doubles (CSMs with 100+ accounts, 40+ notes/month) | Per-seat COGS reaches ~$4.50–$5.00 in this segment. At $89 Growth price, margin compresses to ~94% for these seats | Introduce fair-use cap at Growth tier: >40 meeting analyses/seat/month triggers overage billing at $0.10/analysis. Rebalance cascade ratio — route more stable accounts to Haiku permanently. Heavy users self-select into Enterprise at $149 |
| Model provider raises prices 50% | Primary inference: $1.00 → $1.50. Triage: $0.55 → $0.83. Total COGS: $2.75 → ~$3.53. Gross margin at $85 blended: 97% → ~96% (minimal impact — inference is a small fraction of price) | No immediate action needed. Monitor quarterly. Begin evaluating open-weight model pilots for triage-layer replacement if trend continues |

## Board One-Pager

**Before (traditional SaaS CS tooling):**
- Revenue model: flat seat subscription with no AI sensitivity; $50–100/seat
- COGS: hosting + support headcount only (~5–10% of revenue)
- Gross margin: 85–92% — high, but commoditised; no compounding advantage
- Value delivery: dashboards and workflow tooling — CSMs do all the intelligence work manually
- Differentiation: feature breadth and integrations — easily replicated by incumbents
- Moat: shallow — workflow can be copied; switching cost erodes over time

**After (AI-enabled, signal-to-action model):**
- Revenue model: same seat-based structure; $49–$149/seat — 2–3× premium justified by AI replacing manual CSM labour
- COGS: hosting + inference + vector DB (~3–7% of revenue depending on scale stage)
- Gross margin: 93–97% at scale — AI COGS adds ~$2.75/seat but enables a price point legacy tools can't match on value
- Value delivery: every meeting note processed, every signal detected, every QBR drafted, every action recommended — CSM contributes judgment and approval, not data entry
- Differentiation: outcome-labeled training data, customer memory model, integration depth — compounds with every seat-month of usage
- Moat: deep — 18–24 months for any competitor to replicate labeled data volume at scale; customer memory model cannot be imported

**Net margin shift:**
AI COGS adds ~$2.75–$5.75/seat/month in direct costs that a pure SaaS tool does not carry. At a $49–$149 price point this represents 3–7% of revenue. The offsetting gain: customers pay for outcomes (churn risks caught, QBRs drafted, expansion signals surfaced) not for dashboard access — supporting a 2–3× price premium over legacy tooling and significantly higher retention. Net margin profile is superior to legacy tools once infrastructure costs amortise above ~500 seats, and the data flywheel creates a compounding defensibility that no pure-SaaS CS tool can replicate.
