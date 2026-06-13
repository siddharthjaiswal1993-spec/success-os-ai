# Outcome Model — SuccessOS AI

---

## The Value Hypothesis

SuccessOS AI creates value by improving the quality and speed of CS team decision-making on account health, churn risk, and expansion opportunities. Better-informed CSMs take faster, more targeted interventions. Earlier detection means cheaper saves. Systematic expansion identification means more expansion revenue from the same book of business.

---

## Business Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Gross Revenue Retention | +5–8 percentage points vs. baseline | The primary CS outcome |
| Expansion ARR per CSM | +20% | Systematic expansion identification drives NDE (net dollar expansion) |
| CSM account capacity | +25% accounts per CSM without quality drop | AI augmentation enables leverage |
| Time to churn detection | 30+ days earlier than baseline | Earlier detection = cheaper, higher-success interventions |

---

## Product Quality Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Agent action acceptance rate | >65% | Accepted recommendations signal trust |
| Churn signal precision | >70% (flagged accounts churn at >70% of baseline rate) | False positives cause alert fatigue |
| Meeting intelligence usefulness | >80% of analyses rated useful by CSM reviewer | The most-used surface must be reliably valuable |
| QBR draft acceptance rate | >75% used with minor edits | Generated QBR content must require minimal rework |

---

## AI Quality Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Churn classification F1 | ≥0.78 on validation set | The primary AI performance threshold |
| Confidence calibration | Stated confidence bands match actual outcome rates | Miscalibrated confidence destroys trust over time |
| Feature-to-customer matching precision | >80% relevance on manual review sample | Incorrect matches create CSM credibility risk |
| Rejection capture rate | >70% of dismissals include a structured reason | Rejection data is the training signal; capture rate determines learning speed |

---

## The Metric That Matters Most

**Early churn detection rate — specifically, what fraction of accounts that churned were flagged ≥30 days before renewal.**

This metric directly answers "is the product saving revenue?" Accounts flagged early get interventions. Accounts not flagged get nothing. The delta between intervention success rate on early-flagged vs. late-detected accounts is the product's financial ROI.

---

## Build / Maintain / Improve / Kill

**Build** — The cross-customer pattern detection engine. Single-account signals are already captured; patterns across the customer base (e.g., "accounts that switch CS contacts in month 4 churn at 2× the average rate") require cross-account learning.

**Maintain** — The signal-to-action loop and the approval workflow. These are the core product architecture.

**Improve** — The Meeting Intelligence output quality. Better structured extraction from unstructured notes — specifically, more reliable churn vs. expansion signal classification — directly improves the daily CSM workflow.

**Kill** — Any automation of customer-facing outputs without human approval. The boundary is principled and should not move.

---

*Independent product exploration. Uses synthetic examples, mock data, and public category-level assumptions.*
