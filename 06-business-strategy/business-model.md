# Business Model — SuccessOS AI

---

## Revenue Model

**Primary Revenue:** Subscription SaaS — annual contracts with monthly billing available at a premium. Per-seat pricing based on CSM headcount.

**Secondary Revenue (Year 2+):**
- Professional services: implementation, custom integration, data migration
- Expansion: upsell to higher tiers as AI usage matures
- Platform fees: API access for customers who want to embed signals into their own BI tools (enterprise tier)

---

## Pricing Architecture

| Tier | Price | Target Segment |
|------|-------|---------------|
| Starter | $49/CSM seat/month | 5–20 CSM teams; Series A–B |
| Growth | $89/CSM seat/month | 20–100 CSM teams; Series B–D |
| Enterprise | $149/CSM seat/month + custom | 100+ CSM teams; late stage / public |

Annual contracts provide 15–20% discount over monthly.

See `pricing-strategy.md` for full tier details.

---

## Unit Economics Model

**Assumptions (Year 2 steady state):**
- Average contract size (ACS): $85K ARR
- Average CSM team size: ~25 seats
- Average selling price per seat: ~$85/mo (blended across tiers)
- Sales-assisted motion (direct)
- Sales cycle: 45–75 days

**Customer Acquisition Cost (CAC):**
- Sales rep quota capacity: $1.2M ARR / year
- Average deal size: $85K
- Deals per rep: ~14/year
- Estimated CAC: $18K–$25K per customer

**Gross Margin:**
- LLM API costs: ~$1.50–3.00/active seat/month at target usage
- Infrastructure: ~$2–4/seat/month
- Gross margin target: ~80% at scale

**CAC Payback:**
- ACS $85K × 80% GM = $68K gross profit/year
- CAC $22K → Payback ~4 months (annual contract)

**LTV:CAC (target):** ≥ 4:1 at Year 3

---

## Growth Levers

**1. Land and Expand**
Initial contracts are often 10–20 seat pilot deployments. Expansion to full CSM team after 90-day ROI validation. Expansion revenue is high-margin (no incremental CAC).

**2. Renewal Rate as a Leading Indicator**
A platform that demonstrably improves customer churn prevention for its own users has strong NRR. Target: NRR ≥ 120% by Year 2 through expansion.

**3. Product-Led Signals for Sales**
CSMs who champion the product become advocates for expansion. Top CSM users are the internal sales motions for upgrading teams.

**4. Data Network Effect**
More accounts using the platform → more labeled outcomes (churns, expansions) → better models → better predictions → stronger retention. This flywheel compounds over time.

**5. Integration Depth**
Deep integrations (CRM, ticketing, product analytics) increase switching costs and create data dependency that makes cancellation expensive.

---

## Key Risks to Business Model

| Risk | Mitigation |
|------|-----------|
| LLM API cost escalation | Monitor cost per active seat; optimize prompt efficiency; evaluate open-weight models for cost-sensitive use cases |
| Long enterprise sales cycles | Invest in self-serve trial for Starter tier; let product-led growth shorten the cycle |
| Low adoption post-sale | Structured onboarding program; 90-day activation milestone; CSM success team |
| Bundling by CRM vendors | Build integration depth that makes SuccessOS AI complementary rather than competitive |
| Customer data portability concerns | Clear data policy; customer-owned data model; export on request |
