# Presentation Outline — SuccessOS AI

Structure for a 15-minute project presentation or portfolio walkthrough.

---

## Slide Structure

### Slide 1 — Title
**SuccessOS AI**  
*AI-Native Customer Success Intelligence*  
[Your name] | [Date]

---

### Slide 2 — The Problem (2 minutes)

**Headline:** The best CSMs have something the rest don't: pattern recognition at scale.

**Key points:**
- The average CSM manages 25–50 accounts. They know which ones need attention today. They have no system to tell them about the ones that will need attention next month.
- Meeting notes contain the most important signals — but they're unread after they're written
- QBR prep takes 3–5 hours per CSM per quarter. Most of that time is spent formatting, not thinking.
- The gap between identifying a churn risk and acting on it is measured in months for most teams

**Anchor:** The problem is not that CS teams are lazy. It's that they have more signals than any human can process consistently.

---

### Slide 3 — The Bet (1.5 minutes)

**Headline:** LLMs can do what CSMs struggle to do at scale — read between the lines.

**Key points:**
- Meeting notes are language. Language models read language.
- For the first time, you can process every meeting note, detect the risk language, and flag the right accounts — before the CSM has to ask "wait, how is [account] doing?"
- This is not a feature addition to an existing CS tool. This is a different architecture.

**The specific bet:** The AI can reliably extract structured CS intelligence from unstructured CSM meeting notes, with enough accuracy to trust and act on the outputs.

---

### Slide 4 — The Product (2 minutes)

**Headline:** The signal-to-action loop.

**Visual:** Signal → Ingestion → Context Assembly → Interpretation → Risk/Opportunity Scoring → Recommendation → Human Approval → Execution → Learning

**Key points:**
- Every CSM meeting note enters the loop
- The AI interprets, scores, and recommends — the human approves and executes
- The loop is closed: every outcome is captured and feeds back into the model

**Non-obvious point:** The human approval step is not a limitation — it's a feature. It's where trust is built, and it's where the training data is captured.

---

### Slide 5 — Product Modules (1.5 minutes)

| Module | What It Does | Why It Matters |
|--------|-------------|----------------|
| Meeting Intelligence | Reads notes, detects signals | Converts every meeting into a structured CS event |
| Account Health Monitor | Scores accounts continuously | No account falls through the cracks |
| Recommended Actions | What to do next + draft content | Zero to first draft in seconds |
| QBR Generator | Full QBR in 8 seconds | Turns 4-hour prep into 15-minute review |
| Feature Impact Agent | Maps new features to accounts | Targeted CS outreach instead of mass emails |

---

### Slide 6 — AI Design Decisions (2 minutes)

**Headline:** Three AI design decisions that define the product.

1. **Human-in-the-loop at the customer boundary**  
   Internal actions are automated. Customer-facing actions always require CSM approval. Enforced at the API level, not just the UI.

2. **Explainability is not optional**  
   Every recommendation shows its evidence. CSMs see the quote that triggered the flag. They're approving something they can verify, not a black box.

3. **Confidence expression is designed**  
   High/Medium/Low confidence shown on all outputs. Low-confidence outputs are surfaced differently. Uncertainty is expressed in language, not hidden.

---

### Slide 7 — Trust and Safety Architecture (1.5 minutes)

**Headline:** Trust is built through systems, not promises.

**Key design choices:**
- Approval policy enforced at API layer
- Hallucination mitigation: context grounding + schema validation + fact cross-checking
- Eval stack: F1 ≥ 0.78 for churn classification; weekly production audit; quarterly red-team
- Confidence calibration: compare predicted confidence vs. actual acceptance rate over time

**The principle:** An AI system that says "trust me" earns no trust. A system that shows its work and is consistently right earns it.

---

### Slide 8 — The Moat (1.5 minutes)

**Headline:** The moat isn't the features. It's the data that accumulates.

**Five moat layers:**
1. Customer memory — account history that can't be imported
2. Outcome-labeled training data — churn/expansion outcomes linked to signals
3. Integration depth — switching cost built through workflow embedding
4. CS workflow adoption — CS team operates around the platform
5. Accuracy track record — trust earned through repeated validation

**Key point:** A competitor can copy the feature set in months. They cannot copy 3 years of outcome-labeled customer data.

---

### Slide 9 — Business Model (1 minute)

**Revenue:** $49–$149/CSM/seat/month, annual contracts  
**ICP:** B2B SaaS, $5M–$100M ARR, 10–150 CSM headcount  
**GTM:** Sales-assisted with product-led pilot; land with CS Director champion  
**Unit economics:** ACS ~$85K, GM ~80%, CAC payback ~4 months

**ROI for customers:**  
$380K annual value (base scenario, 25-seat team) against $26K annual cost = 14x ROI

---

### Slide 10 — Prototype Demo (1 minute)

[Demo the prototype or walk through 3 screenshots]

- Dashboard → At-risk accounts
- CloudKitchen Pro → Risk flags → Approve action
- Feature Impact → Multi-location benchmarking → Matched accounts

---

### Slide 11 — Key Learnings (1 minute)

**What I would do differently:**

1. **Start with a tighter eval spec** — I defined the eval dimensions and metrics in documentation, but the eval datasets need to be built alongside the product, not after.

2. **The autonomy boundary question deserves more product time** — The approval policy table was a useful artifact. Working through more edge cases earlier would have tightened the system design.

3. **CS Director vs. CSM tension is real** — The CS Director wants visibility and trend data; the CSM wants to reduce work. Designing for both is harder than designing for one. Features that help the director but add friction for the CSM will fail.

**What worked well:**

1. **Signal-to-action as the organizing principle** — This frame made every product decision easier to evaluate. If it doesn't advance the loop, it doesn't belong in the MVP.

2. **The approval workflow design** — Designing the dismiss-with-reason flow as a first-class experience, not an afterthought, created the feedback loop architecture that makes the product improvable.

---

### Slide 12 — Next Steps / Q&A

- Q3 2026: MVP with real LLM integration and CRM sync
- Q4 2026: Multi-CSM collaboration and coaching layer
- Q1 2027: Outcome-labeled fine-tuning and advanced signal ingestion
- Q2 2027: Agentic automation for internal workflows

**Questions?**
