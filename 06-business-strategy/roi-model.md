# ROI Model — SuccessOS AI

---

## ROI Framework

Customer ROI comes from three sources:

1. **Churn prevention value** — accounts saved that would otherwise have churned
2. **CSM time savings** — hours recaptured from admin work, redirected to customer engagement
3. **Expansion acceleration** — expansion opportunities identified and acted on sooner

---

## Input Variables (Customize Per Customer)

| Variable | Default Value | Notes |
|----------|--------------|-------|
| Number of CSMs | 25 | Adjust to actual team size |
| Average account ARR | $50,000 | Average across the book |
| Total managed accounts | 250 | (25 CSMs × 10 accounts) |
| Annual churn rate (current) | 12% | Industry average B2B SaaS |
| Expected churn risk improvement | 2 percentage points | Conservative estimate |
| Average hours/week on admin (QBR, notes, reports) | 6 hours | From CSM survey data |
| Expected admin time reduction | 40% | Based on pilot data |
| Fully loaded CSM cost per hour | $75 | ($120K total comp / 1,600 hours) |
| SuccessOS AI annual cost | $26,700 | 25 seats × $89/mo × 12 months |

---

## ROI Calculation

### Value Stream 1: Churn Prevention

```
Total ARR at risk = 250 accounts × $50,000 avg ARR = $12,500,000
Current churn rate = 12% → Annual churn = $1,500,000
Churn rate improvement = 2pp → New churn rate = 10%
New annual churn = $1,250,000
Annual ARR retained = $1,500,000 - $1,250,000 = $250,000
```

**Conservative scenario (1pp improvement):** $125,000 retained ARR/year  
**Base scenario (2pp improvement):** $250,000 retained ARR/year  
**Optimistic scenario (3pp improvement):** $375,000 retained ARR/year

---

### Value Stream 2: CSM Time Savings

```
Admin time saved = 25 CSMs × 6 hours/week × 40% reduction = 60 hours/week saved
Annual hours saved = 60 × 50 weeks = 3,000 hours/year
Value at $75/hour = $225,000/year in time recaptured
```

These hours can be redirected to:
- More proactive customer conversations
- Expansion outreach
- Onboarding new accounts faster

Even if only 50% of recaptured time translates to productive activity: **$112,500 in productivity value/year**

---

### Value Stream 3: Expansion Acceleration

Conservative assumption: SuccessOS AI surfaces 3–5 expansion opportunities per quarter that would have been missed or delayed by 1 quarter.

```
Average expansion deal: $15,000 ARR (30% uplift on $50K base)
Opportunities surfaced: 4/quarter × 4 quarters = 16/year
Conversion rate: 30%
Expansion deals closed: ~5 per year
Incremental ARR: 5 × $15,000 = $75,000/year
```

---

### Total Annual ROI (Base Scenario)

| Value Stream | Annual Value |
|-------------|-------------|
| Churn prevention (2pp improvement) | $250,000 |
| CSM time savings (50% productive) | $112,500 |
| Expansion acceleration | $75,000 |
| **Total Annual Value** | **$437,500** |
| SuccessOS AI Annual Cost | $26,700 |
| **Net Annual Value** | **$410,800** |
| **ROI** | **15.4x** |
| **Payback Period** | **~3 weeks** |

---

## Sensitivity Analysis

| Scenario | Churn Improvement | Admin Savings Used | Annual Value | ROI |
|----------|------------------|--------------------|-------------|-----|
| Conservative | 1pp | 25% of time | ~$168,000 | 6.3x |
| Base | 2pp | 50% of time | ~$437,000 | 15.4x |
| Optimistic | 3pp | 75% of time | ~$708,000 | 25.5x |

Even in the most conservative scenario, ROI exceeds 6x within the first year.

---

## Time-to-Value Milestones

| Milestone | Expected Timeline | Indicator |
|-----------|-----------------|-----------|
| First meeting analysis live | Week 1 | CSM submits first meeting notes |
| First churn risk flag acted on | Week 2–3 | CSM approves first recommended action |
| First QBR generated | Week 3–4 | CSM uses QBR draft for a real account |
| First documented churn save | Month 1–3 | Account health recovered after AI-flagged intervention |
| Full team adoption | Month 2–4 | > 70% of CSMs using platform weekly |
| ROI report (Pilot review) | Month 3 | Review against baseline: hours saved, flags acted on |

---

## How to Use This Model

1. Replace the default values with the customer's actual numbers from their CRM or CS reporting
2. Present the base scenario in the sales process; let the customer adjust variables
3. Agree on pilot success criteria that map to these value streams (typically: 1 documented churn save, measurable hours saved per CSM)
4. At 90-day check-in: compare actual pilot outcomes against ROI model projections
