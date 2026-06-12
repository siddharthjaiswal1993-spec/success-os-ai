# Assumptions — SuccessOS AI

Explicit assumptions made in the design and documentation. Noting these allows future iterations to revisit or invalidate them as evidence accumulates.

---

## Product Assumptions

**A1 — CSMs will submit meeting notes into the platform**  
The entire Meeting Intelligence module depends on CSMs actively submitting meeting notes. We assume CSMs are willing to do this if the value return is fast and visible. Risk: if note submission feels like admin work with no visible payoff, adoption will fail. Mitigation: surface AI analysis within 30 seconds of note submission; make the value immediate.

**A2 — Language in CSM meeting notes is reliable**  
We assume CSMs write meeting notes that accurately represent the meeting. Risk: some CSMs may write sanitized notes that omit negative signals, especially if they know the notes feed an AI system. Mitigation: emphasize that the AI is their assistant, not their manager — the goal is to help them, not evaluate them.

**A3 — CS Directors want account visibility, not micromanagement tools**  
We designed the CS Director view around portfolio-level health visibility, not CSM performance scoring. If CS Directors primarily want to use the tool to monitor individual CSM performance, the product design would need to change. Assumption: CS Directors use SuccessOS AI for their own decision-making, not as a surveillance tool.

**A4 — External action approval is the right boundary, not a lower threshold**  
We assumed the approval gate at the customer-facing boundary is correct. An alternative design would require approval for all recommended actions including internal ones. We rejected this as too much friction, but it deserves validation. If high-stakes internal actions (like health score overrides that feed customer portals) turn out to have significant downstream customer impact, the boundary may need to shift.

**A5 — LLM outputs are accurate enough to act on without verification for internal actions**  
We auto-execute internal actions (health score updates, risk flag creation) without requiring human review. This assumes the LLM classification is accurate enough that the cost of occasional errors is low. This assumption should be tested with pilot data before broad deployment.

---

## Technical Assumptions

**A6 — Claude API is the primary LLM**  
Documentation and architecture reference Claude (Anthropic) as the primary LLM. This is a reasonable default, but the AI orchestration layer is designed to be model-agnostic. If a different model performs better on CS-specific tasks or is more cost-effective at scale, the design accommodates switching.

**A7 — CRM as the source of truth for structured account data**  
ARR, renewal dates, and account owner data flow from the CRM (Salesforce or HubSpot). SuccessOS AI does not maintain an independent record of these fields — it reads from the CRM integration. If a customer's CRM data quality is poor, the platform's outputs will be correspondingly poor.

**A8 — Meeting notes are the primary unstructured signal source**  
The design prioritizes language intelligence on meeting notes. It does not include email analysis, Slack message analysis, or direct customer sentiment analysis. These are richer signal sources but introduce significant privacy complexity. We assumed meeting notes are sufficient for MVP and adjacent signal sources can be added post-MVP.

---

## Business Assumptions

**A9 — The CS Director is the right primary buyer**  
We positioned SuccessOS AI as a CS Director purchase, not a VP CS or CEO purchase. This assumes the CS Director has sufficient budget authority and motivational alignment. For companies where the CS function is newer or smaller, the buyer may be a COO or VP of Operations. The messaging should adapt accordingly.

**A10 — Annual contracts are the norm for the ICP**  
Pricing is designed around annual ARR contracts. This assumes the ICP (Series B–D B2B SaaS) is willing to commit annually. Monthly billing is available at a premium, but the primary unit economics model is based on annual. If the market segment prefers monthly or quarterly billing, the CAC payback and LTV calculations need to be revisited.

**A11 — The ICP has ≥10 CSMs**  
Below 10 CSMs, the AI value from signal aggregation and pattern detection is limited — the CS Director can manage their team's accounts manually. The $49/seat price at 5 seats ($245/month) is potentially too low to justify the sales and implementation investment. If we see strong pull from smaller teams, we may need a PLG self-serve tier.

---

## Eval Assumptions

**A12 — Retrospective churn outcomes are available for offline eval**  
The churn classification offline eval requires ground truth: which accounts from the labeled meeting notes actually churned? For the initial eval dataset, we assume we can create synthetic ground truth or use labeled historical data. For production fine-tuning, we need actual outcome data from deployed accounts.

**A13 — F1 ≥ 0.78 is the right threshold for churn classification**  
The 0.78 F1 threshold is an engineering judgment, not empirically derived. It was chosen to balance precision and recall at a level that would be credible to CSMs. The correct threshold depends on how many false positives CSMs can tolerate before they stop trusting the system. This should be validated with pilot users.
