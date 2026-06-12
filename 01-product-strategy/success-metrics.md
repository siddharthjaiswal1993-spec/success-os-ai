# Success Metrics — SuccessOS AI

---

## North Star Metric

**Accounts with AI-informed action taken in the past 30 days** — the percentage of accounts in the platform where a CSM has acted on an AI recommendation (approved a workflow, used a QBR output, acted on a churn risk flag) within the trailing 30 days.

**Why this metric:**
- It measures whether AI intelligence is actually driving behavior, not just being generated
- It is a leading indicator of retention outcomes (accounts with active AI-informed management have lower churn rates)
- It captures both quality (recommendations must be good enough to act on) and adoption (CSMs must use the outputs)

**Target trajectory:**
- Month 3: 30% of accounts have AI-informed action
- Month 6: 50%
- Month 12: 65%+

---

## Product Health Metrics

| Metric | Definition | Target | Frequency |
|--------|-----------|--------|-----------|
| Meeting Intelligence adoption | % of meetings with notes pasted into the platform | ≥ 60% of logged meetings | Monthly |
| Recommendation acceptance rate | % of AI-recommended actions approved (not dismissed) | ≥ 55% | Weekly |
| QBR generation utilization | % of quarterly QBRs generated using the platform | ≥ 70% | Quarterly |
| Churn flag accuracy | % of accounts flagged as high churn risk that actually churned | ≥ 65% precision | Quarterly |
| Feature impact match precision | % of feature-to-customer matches rated relevant by CSM | ≥ 80% | Monthly |

---

## Business Outcome Metrics

| Metric | Baseline (Pre-Platform) | Target (12 Months Post-Deployment) |
|--------|------------------------|-----------------------------------|
| Gross revenue churn rate | Company-reported baseline | –2 to –4 percentage points |
| CSM accounts-per-head | Company baseline | +20–30% increase |
| QBR preparation time | 3–5 hours per account | < 60 minutes per account |
| Expansion pipeline identified by CS | Company baseline | +25% expansion pipeline attributed to CS-sourced signals |
| Churn detected ≥30 days before renewal | Company baseline | 80%+ of churned accounts flagged ≥30 days prior |

---

## AI Quality Metrics

| Metric | Target | Evaluation Method |
|--------|--------|------------------|
| Meeting note summarization quality | ≥ 4.2 / 5 CSM satisfaction | Post-analysis rating |
| Churn risk classification accuracy | ≥ 0.78 F1 (balanced precision/recall) | Retrospective on churned accounts |
| Expansion signal recall | ≥ 75% of expansion conversations flagged | Human-annotated test set |
| QBR quality score | ≥ 4.0 / 5 executive review rating | CSM post-submission rating |
| Hallucination rate | < 3% of outputs contain unverifiable factual claims | Weekly sample audit |
| Approval policy adherence | 100% — no customer communications sent without approval | Automated check in workflow |

---

## Retention Metrics

| Metric | Target |
|--------|--------|
| Day 30 activation (AI action taken) | ≥ 60% of new users |
| Week 12 retention (WAU / Registered) | ≥ 70% |
| Feature stickiness (DAU/MAU) | ≥ 35% |
| NPS (CSM users) | ≥ 40 at 6 months |
| Customer renewal rate (platform customers) | ≥ 90% |

---

## Counter-Metrics (What Not to Optimize For)

| Metric | Why We Avoid It |
|--------|----------------|
| Number of AI recommendations generated | Optimizing this leads to recommendation spam; acceptance rate drops |
| Number of QBRs generated | Means nothing without quality and usage |
| Features shipped | Premature expansion before core quality is achieved |
| Health score coverage | Health scores with poor accuracy are worse than no health score |
