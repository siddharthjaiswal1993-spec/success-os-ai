# Quality Rubrics — SuccessOS AI

Used by human raters to evaluate AI output quality. Each dimension scored 1–5.

---

## Rubric 1: Meeting Intelligence — Churn Risk Analysis

| Score | Criteria |
|-------|---------|
| 5 — Excellent | Risk correctly classified; all triggering phrases identified with direct quotes; context factors mentioned; confidence level appropriate; actionable recommendation included |
| 4 — Good | Risk correctly classified; at least one triggering phrase cited; minor gap in context or confidence calibration |
| 3 — Adequate | Risk classification correct but no supporting evidence cited; OR evidence cited but classification is ambiguous |
| 2 — Poor | Risk misclassified (false positive or false negative) OR supporting evidence is fabricated or distorted |
| 1 — Fail | Risk classification is wrong AND harmful (flags high churn for a healthy account, or misses clear churn language) |

**Minimum acceptable score: 3**  
**Target average score: ≥ 4.0**

---

## Rubric 2: Meeting Intelligence — Expansion Signal Detection

| Score | Criteria |
|-------|---------|
| 5 — Excellent | Expansion signal correctly identified with supporting quote; opportunity type classified; recommended action is timing-appropriate and specific |
| 4 — Good | Signal correctly identified; quote cited; minor gap in opportunity typing or action specificity |
| 3 — Adequate | Signal identified but no supporting quote; OR quote cited but signal type is ambiguous |
| 2 — Poor | False positive expansion signal (no expansion language present) OR clear expansion signal missed |
| 1 — Fail | Expansion signal detection directly contradicted by input content |

---

## Rubric 3: QBR Generation Quality

| Dimension | Score 5 | Score 3 | Score 1 |
|-----------|---------|---------|---------|
| Completeness | All 9 sections present and substantive | 7–8 sections present; 1–2 have minimal content | < 6 sections; major gaps |
| Accuracy | All factual references correct (ARR, dates, signals) | Minor factual errors that CSM would catch | Significant factual errors that could embarrass CSM with customer |
| Specificity | Every section references account-specific data | Mix of specific and generic filler | Majority generic content with name/date substitution only |
| Tone | Professional, customer-appropriate, not defensive | Mostly appropriate; occasional awkward phrasing | Inappropriate tone (aggressive, dismissive, or overly salesy) |
| Actionability | Next Steps section contains specific, prioritized actions | Next steps are present but vague | No next steps or next steps are placeholders |

**Target average score: ≥ 4.0 across all dimensions**

---

## Rubric 4: Feature Impact Matching

| Score | Criteria |
|-------|---------|
| 5 — Excellent | Correct accounts matched; match reasoning is specific and accurate; impact type correctly classified; irrelevant accounts not matched |
| 4 — Good | Correct accounts matched; reasoning is present but could be more specific; 0–1 accounts missing from expected match list |
| 3 — Adequate | Core accounts matched but 2+ expected accounts missing; OR reasoning is generic (not account-specific) |
| 2 — Poor | Significant accounts missing from match list; OR clearly irrelevant accounts included with High relevance |
| 1 — Fail | Match results are fundamentally wrong — wrong accounts, wrong reasoning, wrong impact types |

---

## Rubric 5: Recommended Actions Usefulness

| Score | Criteria |
|-------|---------|
| 5 — Excellent | Action is specific, timely, and addresses the highest-priority signal; reasoning is clear; confidence level is accurate |
| 4 — Good | Action is relevant and useful; could be more specific or timely; confidence level is reasonable |
| 3 — Adequate | Action is generically appropriate but not tailored to account context; OR action is specific but has wrong priority |
| 2 — Poor | Action is not relevant to current account state; OR recommendation contradicts account context |
| 1 — Fail | Action is harmful if executed (e.g., recommends expansion outreach to an account in active churn risk) |

---

## Rubric 6: Draft Customer Communication Quality

| Dimension | Score 5 | Score 3 | Score 1 |
|-----------|---------|---------|---------|
| Tone | Professional, warm, clear; appropriate for relationship stage | Mostly appropriate; 1–2 awkward phrases | Inappropriate (too formal, too casual, defensive, or salesy) |
| Accuracy | All statements verifiable against account context | Minor statement that could be misinterpreted | Statement that is factually wrong or could create customer complaint |
| Clarity | Action items are clear; next steps are specific | Message is understandable but somewhat vague | Message is confusing or has no clear ask |
| Personalization | References specific context from the account; does not feel templated | Some personalization but with generic elements | Clearly a template with only name/date substituted |
| Length | Appropriate length for context (usually 100–200 words) | Slightly too long or short | Grossly disproportionate — wall of text or single sentence |

**Target average score: ≥ 4.2 — higher standard because this reaches the customer**
