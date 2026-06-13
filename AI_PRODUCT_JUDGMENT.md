# AI Product Judgment — SuccessOS AI

---

## Decision 1: Internal/external boundary as the governance rule

**What:** The approval boundary is defined by a single, consistent rule: internal state updates (health score changes, risk flag updates, expansion signal tagging) are AI-autonomous; customer-facing actions (emails, QBR content, Slack messages) require human approval.

**Why:** This boundary is principled — it reflects a clear distinction between two types of outputs with fundamentally different risk profiles. Internal state changes are reversible: if the AI incorrectly updates a health score, a CSM can correct it. Customer-facing outputs are not reversible: a message sent to a customer cannot be unsent.

The boundary also creates a useful product property: the AI learns fast on the internal loop (high-volume, quick feedback) and the CSM maintains full control over the external loop (lower volume, higher stakes). These two goals do not conflict because they apply to different output types.

**What this reflects:** Human-in-the-loop design should specify exactly where humans are required, not just that they are required somewhere. "Human approval for all AI actions" is too conservative (it creates friction on low-stakes updates). "Human approval for customer-facing outputs only" is specific, defensible, and operationally workable.

---

## Decision 2: Dismissal with reason is required, not optional

**What:** When a CSM dismisses an AI-recommended action, the product prompts for a reason with both a free-text field and categorical tags. The reasons are stored and feed into agent calibration.

**Why:** A dismiss button without reason capture produces only one bit of information: "this was not approved." A dismiss button with reason capture produces a training signal: "this was not approved because the timing was wrong," or "the suggested email was too aggressive for this customer relationship."

These two dismissal events look identical in a binary approved/dismissed log but represent completely different feedback. Timing-related dismissals indicate the agent's urgency detection needs calibration. Tone-related dismissals indicate the communication style generation needs adjustment for this account type.

Without structured reason capture, the improvement loop cannot distinguish between these cases.

**What this reflects:** Feedback capture is product design, not just UI design. The quality and structure of rejection feedback determines how fast the AI improves. Designing the dismissal interface to capture useful training signals is a PM responsibility.

---

## Decision 3: Churn F1 threshold set before deployment

**What:** The churn classification model has a minimum F1 threshold of ≥0.78 defined before deployment. The model is not deployed at lower performance, regardless of time pressure.

**Why:** A churn detection model that generates too many false positives trains CSMs to ignore alerts. Once that habituation is established, it is very hard to undo — even if the model improves, CSMs will continue to discount alerts because they learned to discount them when the model was poor.

Setting the threshold before deployment, as a product requirement rather than a data science target, changes the incentive structure: the question is not "can we ship something?" but "does it meet the quality bar required for the workflow to function?"

**What this reflects:** AI deployment thresholds are product decisions, not model decisions. The PM team should own the minimum performance requirements based on the user behaviour and trust dynamics of the specific workflow — not inherit whatever the ML team produces.

---

## Decision 4: Meeting Intelligence as the highest-priority surface

**What:** The Meeting Intelligence workflow (paste meeting notes → structured analysis + follow-up email) is designed to work on day one, with no integration, no data history, and no onboarding configuration.

**Why:** Meeting Intelligence is the only workflow that delivers value immediately. A CSM who pastes meeting notes and receives a structured churn/expansion analysis and a draft follow-up email in 30 seconds has experienced the product's core value in their first session — before the health scores are populated, before the integrations are configured, before the AI has any history of their accounts.

This matters for activation. A product that requires 30 days of data before it is useful loses 80% of trial users before they see value. A product that shows value in the first 5 minutes of use has a fundamentally different activation curve.

**What this reflects:** Landing workflows should be designed for zero-data, zero-history, zero-configuration value delivery. The workflow that requires the least precondition to produce value is the correct entry point — even if it is not the most strategically significant workflow in the platform.
