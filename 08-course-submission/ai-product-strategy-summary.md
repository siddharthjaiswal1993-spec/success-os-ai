# AI Product Strategy Summary — SuccessOS AI

This document summarizes the AI-specific strategy decisions made in designing SuccessOS AI. It is intended to demonstrate applied AI product thinking.

---

## 1. The Core AI Bet

**Bet:** Language models can extract structured CS intelligence from unstructured meeting notes, replacing the manual interpretation that CSMs currently do mentally but inconsistently.

This bet is specific and falsifiable. It assumes:
- LLMs can reliably distinguish churn-risk language from neutral language in CSM meeting notes
- The structured outputs (risk delta, expansion signals, recommended actions) are accurate enough to be acted on
- Accuracy improves over time as outcome data is captured and used for fine-tuning

---

## 2. The "AI-Native" Distinction

SuccessOS AI is not AI-enhanced — it is AI-native. The distinction:

**AI-enhanced product:** A legacy workflow product that adds an AI layer on top. The AI is a feature. If the AI were removed, the product would still work.

**AI-native product:** A product where the AI layer is the core value delivery mechanism. If the AI were removed, the product would not deliver its core value proposition.

SuccessOS AI is AI-native because:
- The signal-to-action loop is only possible with language understanding (meeting note → signal)
- The QBR generation is only possible with LLMs (account context → structured narrative)
- The feature impact matching requires semantic understanding (feature description → account matching)

A dashboard-only version of SuccessOS AI is just a health scoring tool. The AI is the product.

---

## 3. Agent Autonomy Design

SuccessOS AI's agents operate at L1–L3 autonomy:

| Level | What it means | Which workflows |
|-------|--------------|----------------|
| L1 — Generate | AI produces output; human acts on it independently | Meeting summary, QBR draft (read-only) |
| L2 — Recommend + Route | AI recommends action; human approves or dismisses | All recommended actions |
| L3 — Execute Internal | AI executes internal tasks automatically (health score updates, risk flags) | Account health scoring, risk flag creation, signal logging |
| L4 — Full Automation | Not implemented | Customer-facing communications (never auto-executed) |

**The key design principle:** The boundary between L3 (auto-execute) and requires approval is the customer-facing boundary. Internal state changes are automated. Anything that touches or could be seen by the customer requires human approval. This is not a configurable option.

---

## 4. Confidence Communication Design

**The challenge:** LLMs produce confident-sounding outputs even when uncertain. Displaying AI confidence to users requires intentional design.

**SuccessOS AI's approach:**
1. Confidence level is computed per output (High ≥ 0.80, Medium 0.60–0.79, Low < 0.60)
2. Low-confidence outputs are shown differently: less prominence, more hedging language
3. Users see what triggered the confidence level (supporting quote or lack thereof)
4. Uncertainty is expressed explicitly in output language: "Based on available signals..." not "The customer is at risk"

**What we don't do:**
- Hide confidence levels
- Show exact probability scores (0.73) — people interpret these poorly
- Let the model express high confidence in the UI when underlying model confidence is low

---

## 5. Hallucination Mitigation as Product Design

Hallucination is not just a model problem — it is a product design problem. SuccessOS AI addresses it at four levels:

1. **Prompt design:** Explicit instructions to not fill gaps with assumptions
2. **Grounded generation:** All outputs reference structured account context passed in the prompt, not training data memory
3. **Post-generation validation:** Key facts (ARR, renewal date) cross-checked against account record
4. **Disclaimer architecture:** Every AI output is labeled as AI-generated; CSMs prompted to verify before acting

The combination of these four layers reduces the risk that a CSM acts on a fabricated fact.

---

## 6. The Feedback Loop

SuccessOS AI improves through use. Each interaction generates a training signal:

- Action approved → positive signal for this recommendation type in this context
- Action dismissed (with reason) → labeled negative example
- QBR rated 4/5 vs. 2/5 → quality signal
- Actual churn outcome → ground truth for churn prediction

The feedback loop is not hypothetical — it is built into the product from day one through structured capture. This is what enables the data moat described in `moat-strategy.md`.

---

## 7. Key AI Design Tradeoffs

| Tradeoff | Decision | Rationale |
|----------|----------|-----------|
| Precision vs. Recall for churn detection | Favor recall | Missing a churn risk is worse than a false alarm |
| AI autonomy vs. user trust | Trust first; earn autonomy | Users need to see the AI is right before they trust it to act |
| Speed vs. accuracy | Accuracy first | A slow, accurate recommendation is more valuable than a fast wrong one |
| General model vs. fine-tuned | Start general; fine-tune with labeled data | No labeled data at launch; collect it, then fine-tune |
| Explainability vs. accuracy | Require explainability | CS context requires CSM to understand and validate before acting |
