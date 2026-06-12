# Product Principles — SuccessOS AI

These principles serve as decision filters. When facing product tradeoffs, these govern which direction to go.

---

## 1. Intelligence Over Storage

SuccessOS AI is not a system of record. It is a system of intelligence. Every product decision should be evaluated against: *does this make the intelligence better, or does it just store more data?*

**What this means in practice:**
- Do not build features that require CSMs to manually enter data without AI analysis
- Every data input should produce an output that is more useful than the input
- Reporting should surface insights, not just display raw metrics

---

## 2. Explain Before You Act

AI outputs are only trusted when they are explainable. Every recommendation, risk flag, and health score must show its reasoning — what signals informed it, what confidence level the AI has, and what the AI would have needed to see to reach a different conclusion.

**What this means in practice:**
- Every churn risk flag includes a "Why" section with supporting signals
- Health scores are not opaque numbers — they show the contributing factors
- Recommendations cite the source evidence

---

## 3. Human Approval on the Boundary

Internal workflows (updating health score, logging a risk, flagging an expansion) can be autonomous. External customer-facing actions (sending an email, scheduling a call, sharing a document) require human approval before execution.

**What this means in practice:**
- The product never sends a customer communication without a human clicking Approve
- The approval workflow is designed to be fast (30-second review), not burdensome
- Dismissals are logged and used to improve future recommendations

---

## 4. Trust Is Earned Incrementally

Users do not trust AI on day one. The product earns trust by being right consistently on low-stakes outputs before requesting approval on high-stakes ones. Start with summarization and risk flagging. Expand to recommended actions. Expand to auto-drafted communications only when users are confident in output quality.

**What this means in practice:**
- Phased rollout of autonomous features aligned with demonstrated accuracy
- Confidence scores displayed prominently so users can calibrate their trust
- Easy override and feedback mechanisms to correct AI mistakes

---

## 5. CS Judgment Stays in the Loop

AI is a force multiplier for CSM judgment, not a replacement for it. CSMs have contextual knowledge about customer relationships, organizational politics, and stakeholder dynamics that will never be fully captured in structured data.

**What this means in practice:**
- AI recommendations are inputs to CSM judgment, not decisions
- CSMs can always override scores, dismiss recommendations, and add context
- Product does not penalize overrides — it learns from them

---

## 6. Customer Data Is Sacred

Customer account data, meeting notes, and communications contain sensitive commercial information. The product must maintain the highest standards of data handling, access control, and tenant isolation.

**What this means in practice:**
- Tenant isolation enforced at every layer
- No customer data used for cross-tenant model training
- Clear data retention and deletion policies
- SOC 2 target before enterprise deals close

---

## 7. Narrow Beats Broad

A product that does five CS workflows exceptionally well is more valuable than a product that attempts twenty and does them all adequately. Resist feature expansion until core use cases are proven and trusted.

**What this means in practice:**
- MVP scoped to Meeting Intelligence, Feature Impact, Account Health, and QBR Generation
- Each module must reach 85%+ user satisfaction before the next module is prioritized
- No feature ships without a clear user story and success metric
