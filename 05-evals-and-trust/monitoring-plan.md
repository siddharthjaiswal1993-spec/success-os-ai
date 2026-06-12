# Monitoring Plan — SuccessOS AI

---

## Monitoring Philosophy

AI systems degrade quietly. Unlike a broken API that returns an error, a model that drifts in quality continues to return outputs — just worse ones. The monitoring plan is designed to catch degradation before it becomes a user trust problem.

---

## Production Monitoring Dashboard

The CS Operations team reviews this dashboard weekly. Product team reviews it monthly.

### Real-Time Metrics (Updated Continuously)

| Metric | Description | Alert Threshold |
|--------|-------------|----------------|
| Agent action queue depth | Number of pending actions awaiting approval | > 50 pending across all tenants |
| External action approval rate | % of External actions approved (vs. dismissed) | < 50% or > 95% (both indicate miscalibration) |
| QBR generation success rate | % of QBR generation requests completing without error | < 98% |
| Meeting analysis latency (p95) | 95th percentile time to complete meeting analysis | > 8 seconds |
| API error rate | 5xx errors on AI processing endpoints | > 1% |

### Weekly Metrics (Reviewed Every Monday)

| Metric | How Collected | Target |
|--------|--------------|--------|
| Churn flag rate | % of accounts flagged for churn risk this week | Baseline ±20% (alert on large swings) |
| Dismissal reason distribution | Breakdown of dismissal reasons across all dismissed actions | "Incorrect recommendation" < 25% |
| Confidence calibration | Avg confidence of accepted actions vs. dismissed actions | Accepted avg > dismissed avg |
| Hallucination audit results | % of sampled outputs with unverifiable factual claims | < 2% |
| New risk flags created | Count of new Critical/High risk flags | Track week-over-week trend |

### Monthly Metrics (Reviewed First Week of Each Month)

| Metric | How Collected | Target |
|--------|--------------|--------|
| QBR satisfaction score | Post-generation CSM rating (1–5) | ≥ 4.0 avg |
| Feature match precision | Sample review of 20 recent feature impact analyses | ≥ 80% relevant matches |
| CSM time saved (self-reported) | Monthly survey to CSMs | ≥ 2 hours/week reported saved |
| Accounts with health score updated | % of active accounts with health score updated in last 30d | ≥ 80% |
| Action loop completion rate | % of recommended actions that result in an outcome log | ≥ 60% |

### Quarterly Metrics (Reviewed Every Quarter)

| Metric | How Collected | Target |
|--------|--------------|--------|
| Churn prediction accuracy | Retrospective: predicted churn vs. actual churn outcomes | Recall ≥ 0.78 |
| Expansion signal accuracy | Retrospective: flagged expansion opportunities vs. actual expansion | Precision ≥ 0.65 |
| Red-team results | Dedicated red-team session | Zero critical vulnerabilities found |
| LLM judge–human rater correlation | Sample of 50 outputs rated by both judge and human | r ≥ 0.75 |

---

## Alert Routing

| Alert Severity | Trigger | Who Gets It | Response Time |
|---------------|---------|-------------|---------------|
| P1 — Critical | External action executed without approval | CS Director + Product Lead | Immediate (PagerDuty) |
| P1 — Critical | API error rate > 5% | Engineering Lead | Immediate |
| P2 — High | Acceptance rate drops > 15% week-over-week | Product Lead | Within 24 hours |
| P2 — High | Hallucination audit: > 2% unverifiable claims | Product Lead + Model owner | Within 24 hours |
| P3 — Medium | Queue depth > 50 pending | CS Operations | Within 48 hours |
| P3 — Medium | QBR satisfaction score drops to < 3.5 | Product Lead | Within 48 hours |
| P4 — Low | Churn flag rate outside ±20% baseline | CS Operations | Within 1 week |

---

## Incident Response Protocol

When a P1 or P2 alert fires:

1. **Within 4 hours:** Acknowledge, assess scope (which tenants affected, how many outputs affected)
2. **Within 8 hours:** Determine root cause (model drift, prompt issue, data issue, code bug)
3. **Within 24 hours:** Hotfix deployed or rollback to previous model version
4. **Within 72 hours:** Post-incident review written; corrective action documented
5. **Within 1 sprint:** Corrective action implemented and tested; regression case added to eval suite

---

## Feedback Capture for Model Improvement

Every user interaction that signals quality becomes a training signal:

| Signal | Captured How | Used For |
|--------|-------------|---------|
| Action approved | Approval click + timestamp | Positive training example |
| Action dismissed + reason | Structured dismissal form | Negative example + reason category |
| QBR rating (1–5) | Post-generation star rating | QBR quality training signal |
| CSM edits to QBR before approval | Edit diff captured | Improvement training data |
| Override: manual health score change | Override event + new score | Signal weighting calibration |
| Feature match marked irrelevant | Relevance feedback on match card | Feature matching fine-tuning |

Feedback data is reviewed quarterly for model update decisions. Volume threshold before fine-tuning: ≥ 500 labeled examples per output type.
