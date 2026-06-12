# Evaluation Strategy — SuccessOS AI

---

## Why Evals Are Central to This Product

SuccessOS AI's outputs are not decorative. A churn risk flag that fires too often becomes noise. A churn risk flag that fires too infrequently misses the customers CS needs to save. A QBR that contains a factual error erodes CSM credibility with a customer they've spent months building trust with.

The eval stack is what separates a trustworthy AI product from one that produces impressive demos but fails in production. This section defines how SuccessOS AI earns and maintains trust through systematic evaluation.

---

## Evaluation Domains

| Domain | What We Evaluate | Primary Method |
|--------|-----------------|----------------|
| Meeting Intelligence | Summarization quality, churn classification accuracy, expansion recall | LLM judge + human rater |
| Churn Risk Classification | Precision and recall on labeled meeting note dataset | F1 score on golden dataset |
| Expansion Signal Detection | Recall of expansion signals in test notes | Human-annotated test set |
| Feature-to-Customer Matching | Precision of account matches against ground truth | Human rater on test features |
| QBR Generation Quality | Completeness, accuracy, usefulness, tone | Human rater panel (rubric) |
| Recommended Actions | Usefulness and relevance | Manager acceptance rate (online) |
| Hallucination Risk | Factual claim verifiability | Automated + human audit |
| Tone and Communication Quality | Appropriateness for customer-facing use | Tone classifier + human review |
| Approval Policy Adherence | Zero external actions without approval | Automated invariant check |
| Explainability Quality | Can users understand why? | User testing |

---

## Offline Evals (Pre-Deployment)

Run before any model or prompt change ships to production:

**Churn Classification:**
- Dataset: 200 labeled meeting notes (100 churn-risk, 100 no churn-risk)
- Metric: F1 score ≥ 0.78 required to ship
- Judge: Ground truth from retrospective churn outcomes (real or synthetic)

**Expansion Detection:**
- Dataset: 100 meeting notes with known expansion signals (human-annotated)
- Metric: Recall ≥ 0.75 required (we prefer to over-detect than miss)
- Judge: Human annotators

**Meeting Summarization:**
- Dataset: 50 meeting notes with human-written reference summaries
- Metric: LLM judge score ≥ 4.0 / 5 on accuracy, relevance, conciseness
- Judge: GPT-4o as judge with structured rubric

**QBR Quality:**
- Dataset: 20 accounts with full data; generate QBR and rate against rubric
- Metric: Average rubric score ≥ 4.0 / 5 across completeness, accuracy, usefulness
- Judge: Human CS expert panel

**Feature Impact Matching:**
- Dataset: 15 feature descriptions with known ground-truth account matches
- Metric: Precision@3 ≥ 0.80 (at least 2 of top 3 matches are correct)
- Judge: CS team review

---

## Online Evals (Post-Deployment)

Continuous monitoring in production:

| Metric | Collection Method | Review Cadence |
|--------|------------------|----------------|
| Agent action acceptance rate | Log every approval/dismissal | Weekly |
| Dismissal reason distribution | Structured reason capture | Weekly |
| Churn flag rate (signal health) | Track ratio of flagged accounts that actually churned | Quarterly |
| QBR satisfaction score | CSM 5-star rating post-generation | Monthly |
| Hallucination incident rate | Weekly audit sample (5% of outputs) | Weekly |
| Confidence calibration | Compare predicted confidence vs. actual accuracy | Monthly |

---

## LLM-as-Judge Protocol

For subjective quality dimensions (summarization, QBR quality, tone), we use an LLM judge with a structured evaluation prompt:

```
You are evaluating an AI-generated [output type] for a Customer Success tool.

Rate the output on the following dimensions (1–5 scale):
- Accuracy: Does the output correctly reflect the input?
- Completeness: Does the output cover all required elements?
- Specificity: Is the output specific to this account/context, not generic?
- Tone: Is the tone appropriate for a professional CS context?
- Actionability: Does the output lead to a clear next action?

For each dimension, provide:
- Score (1–5)
- One-sentence justification
- Specific quote supporting the score

Input: [input text]
Output: [AI-generated output]
Reference (if available): [human reference output]
```

LLM judge scores are validated against human rater scores quarterly. If judge-human correlation drops below 0.75, judge prompt is revised.

---

## Red-Teaming

Quarterly red-team sessions to test system boundaries:

- Adversarial meeting notes designed to confuse the classifier
- Feature descriptions designed to match the wrong accounts
- Notes containing PII that should be stripped from outputs
- Notes in non-English languages
- Notes that explicitly contradict account history
- Attempts to generate customer communications without approval

Red-team findings are prioritized and addressed in the following sprint.
