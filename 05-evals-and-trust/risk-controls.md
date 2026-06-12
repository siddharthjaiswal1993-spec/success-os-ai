# Risk Controls — SuccessOS AI

---

## Risk Control Framework

Each identified risk has: a description, likelihood × impact rating, primary control, secondary control, and detection mechanism.

---

## Risk Register

### RISK-01 — Churn Prediction False Negatives (Missing Real Churn)

**Description:** AI fails to flag a customer who is genuinely at churn risk. CSM does not intervene. Customer churns.

**Likelihood × Impact:** Medium × High = High Risk

**Primary Control:**
- Eval threshold: F1 score ≥ 0.78 (tuned to favor recall over precision — catching a real risk matters more than avoiding false alarms)
- Recall threshold in particular: ≥ 0.82 on test set

**Secondary Control:**
- Manual override: CSMs can set any account to "Watch" status regardless of AI score
- Renewal proximity alert: All accounts within 90 days of renewal get a human review regardless of health score

**Detection:**
- Quarterly retrospective: compare AI churn predictions against actual churn outcomes. Track false negative rate.
- Alert if > 15% of churned accounts had health score ≥ 70 in the 60 days prior to churn

---

### RISK-02 — Churn Prediction False Positives (Noise)

**Description:** AI over-flags healthy accounts as churn risk. CSMs spend time on unnecessary interventions and lose trust in the system.

**Likelihood × Impact:** Medium × Medium = Medium Risk

**Primary Control:**
- Minimum confidence threshold for churn flag: ≥ 0.65
- Low-confidence flags shown as "Monitor" not "At Risk"
- Precision threshold in offline eval: ≥ 0.75 required to ship

**Secondary Control:**
- Structured dismissal feedback: "Incorrect — account is healthy" reason captured
- If same account flagged incorrectly 3× in 90 days, suppress flagging and route to model review

**Detection:**
- Weekly: dismissal reason distribution — if "Incorrect churn flag" > 20% of dismissals, escalate to model review

---

### RISK-03 — QBR Factual Error

**Description:** AI-generated QBR contains an incorrect fact (wrong ARR, wrong renewal date, fabricated signal) and CSM sends it to customer without noticing.

**Likelihood × Impact:** Low × High = High Risk

**Primary Control:**
- Automated fact-checking: ARR, renewal date, health score cross-checked against account record before QBR is presented to CSM
- Fields that fail cross-check are highlighted: "AI could not verify this value — please confirm"

**Secondary Control:**
- QBR disclaimer: "AI-generated first draft. Review all facts before sharing with customer."
- QBR cannot be marked "Ready to deliver" without CSM explicitly checking the "I have reviewed for accuracy" checkbox

**Detection:**
- Post-delivery survey: CSMs asked "Did you find any errors in this QBR?" (binary, after delivery)
- Weekly audit of 5% of generated QBRs against account records

---

### RISK-04 — Expansion Outreach on Unhealthy Account

**Description:** AI recommends expansion outreach for an account that also has active churn risk signals. CSM follows up with upsell, which damages the relationship.

**Likelihood × Impact:** Low × High = High Risk

**Primary Control:**
- Business rule: No expansion outreach action is recommended for any account with churn risk = High or health score < 55
- If expansion signal exists but account is unhealthy: surface the expansion signal, but recommended action = "Address health risks first" (no outreach recommendation)

**Secondary Control:**
- CSM can see both signals simultaneously — expansion signal is visible but contextualized with the health status

**Detection:**
- Audit: any account where expansion outreach action was taken while health score < 55 at the time

---

### RISK-05 — Customer-Facing Action Without Approval

**Description:** An agent executes a customer-facing action (email, meeting invite, communication) without CSM approval. This violates the core trust invariant of the product.

**Likelihood × Impact:** Very Low × Very High = High Risk (by severity)

**Primary Control:**
- API-level enforcement: External action endpoints reject requests with missing `approved_by` field
- Agent classification layer: Every action classified as Internal or External before routing; External path always goes to approval queue

**Secondary Control:**
- Weekly automated compliance check: pull all external action execution logs; verify every record has valid `approved_by` with user ID
- Any violation: immediate alert to CS Director and Product team

**Detection:**
- Automated invariant check runs weekly
- If violation detected: incident created, root cause analysis required, fix required before next release

---

### RISK-06 — PII Leakage in AI Outputs

**Description:** AI output includes personal information (customer contact details, personal identifiers) in generated content that should not be visible to other parties.

**Likelihood × Impact:** Low × High = High Risk

**Primary Control:**
- PII scrubbing pass on all AI inputs: emails, phone numbers, personal identifiers removed before passed to LLM
- PII scrubbing pass on all AI outputs: secondary scan before outputs are stored or displayed

**Secondary Control:**
- Tenant isolation enforced at data layer: account data is never co-mingled in the same LLM context window
- No cross-account references generated

**Detection:**
- Monthly scan of stored AI outputs for PII patterns
- Red-team exercise quarterly: submit meeting notes with embedded PII and verify it does not appear in output

---

### RISK-07 — Model Drift

**Description:** LLM provider updates the underlying model, changing the behavior of outputs without a code change. Quality degrades silently.

**Likelihood × Impact:** Medium × Medium = Medium Risk

**Primary Control:**
- Pin to specific model version (e.g., `claude-sonnet-4-6` not `claude-latest`)
- Version upgrades require regression test suite to pass before switching

**Secondary Control:**
- Weekly quality monitoring: if acceptance rate or QBR rating drops by > 10% week-over-week, trigger model review

**Detection:**
- Automated weekly dashboard: acceptance rate, QBR score, churn flag precision — with alerts on drop
