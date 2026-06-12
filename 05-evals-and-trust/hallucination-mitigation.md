# Hallucination Mitigation — SuccessOS AI

---

## The Hallucination Risk in CS AI

Hallucination in a general knowledge context is embarrassing. Hallucination in a Customer Success context is damaging:

- A QBR that states a customer's ARR incorrectly undermines CSM credibility
- A churn risk explanation that cites a meeting that didn't happen erodes user trust in the system
- A follow-up email draft that references a commitment the company never made creates legal exposure
- A feature impact match that identifies an account for the wrong reason leads to misaligned outreach

Hallucination mitigation is treated as a first-class product concern, not an afterthought.

---

## Types of Hallucination Risk

| Type | Description | Example |
|------|-------------|---------|
| Factual fabrication | AI states a fact that is not in the source material | "Your team completed all 12 certification modules" — when only 6 were completed |
| Source distortion | AI misattributes a quote or signal to the wrong source | "You mentioned pricing concerns in your last meeting" — when this was from two meetings ago |
| Confident error | AI expresses high confidence in an incorrect conclusion | Churn risk = High confidence, when the meeting was actually positive |
| Cross-account contamination | AI uses context from a different account | "Similar to your experience at [other customer name]..." |
| Future-state confusion | AI presents a future plan as a current fact | States that a feature "supports multi-location" when it is on the roadmap, not shipped |

---

## Mitigation Design

### 1. Context Grounding — Only Reason on What We Know
LLM prompts are constructed with explicit instructions:

```
Only make claims that are directly supported by the account context provided below.
Do not infer facts that are not stated in the context.
If a required piece of information is not available, say "Insufficient data" — do not fill gaps with assumptions.
```

Account context is passed as a structured block — the model is reasoning about what is explicitly provided, not retrieving from training data.

---

### 2. Schema Validation — Check Every Output Field
All AI outputs are parsed against a strict schema:

- Required fields must be present
- Numeric fields must be in valid range
- Confidence fields must be within 0.0–1.0
- Lists must contain valid enum values

If any field fails validation, the output is flagged and the field is returned as null with a "validation failed" indicator rather than showing a potentially wrong value.

---

### 3. Fact Cross-Checking — Account Data vs. AI Output
For outputs containing account-specific facts (ARR, renewal date, health score), an automated post-processing step cross-checks:

- QBR ARR → matches account record
- QBR renewal date → matches account record
- Risk description cites a specific signal → signal exists in account timeline
- Churn flag quote → quote exists in submitted meeting notes

If cross-check fails: output is flagged; specific field is highlighted with "AI could not verify — please confirm"

---

### 4. Explicit Uncertainty Expression
Prompts instruct the model to express uncertainty rather than fill gaps:

```
If you are uncertain about a fact, say so explicitly. Use phrases like:
- "Based on the last meeting notes available..."
- "Assuming adoption data is current..."
- "This information was not available in the account context"
Do NOT make up facts to fill gaps.
```

---

### 5. Disclaimer Architecture
Every AI-generated output carries a visible disclaimer:
- Meeting analysis: "AI-generated analysis based on submitted notes. Verify interpretations before acting."
- QBR: "AI-generated first draft. Review all facts before sharing with customer."
- Health score: "AI-computed score. Last updated [timestamp]. Override available."

Disclaimers are not hidden or small-print. They are visible at the top of the output.

---

### 6. Production Monitoring — Weekly Audit Sample
Every week, 5% of all AI outputs are reviewed by a human auditor:

- Sample selection: random across all output types
- Review criteria: any factual claim that cannot be verified against source data
- Threshold: > 2% unverifiable claims triggers a model review

Auditors are provided with:
- The original input (meeting notes / feature description / account context)
- The AI output
- The account data record for comparison

Results are tracked over time. Any upward trend in unverifiable claims triggers a prompt revision review before the next release.
