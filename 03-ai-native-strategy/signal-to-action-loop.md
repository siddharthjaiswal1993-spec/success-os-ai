# Signal-to-Action Loop — SuccessOS AI

---

## The Full Loop

```
Customer Signal
     ↓
Signal Ingestion & Normalization
     ↓
Context Assembly (Account Memory + Recent History)
     ↓
AI Interpretation & Classification
     ↓
Risk / Opportunity Scoring
     ↓
Recommendation Generation
     ↓
Approval Routing (Internal auto-approve / External → Human)
     ↓
Workflow Execution (or Draft Delivery)
     ↓
Outcome Signal Capture (accepted, dismissed, overridden)
     ↓
Learning Feedback → Improves Future Interpretation
```

---

## Step-by-Step Breakdown

### 1. Signal Ingestion

Signals enter the system from multiple sources:

| Signal Type | Source | Ingestion Method |
|-------------|--------|-----------------|
| Meeting notes | CSM paste (prototype) / Gong transcript (production) | Text input → NLP pipeline |
| Support tickets | Zendesk / Intercom integration | Webhook / polling |
| Product usage | Mixpanel / Amplitude / Pendo | API sync |
| Renewal timeline | CRM | Scheduled sync |
| Stakeholder changes | CRM / manual | Event trigger |
| Feature updates | Product roadmap input | Manual input / integration |

**In the prototype:** Meeting notes and feature descriptions are user-pasted. Account signals (health, tickets, usage) are loaded from mock data.

---

### 2. Context Assembly

Before AI analysis runs, the system assembles account context:

- Account profile: ARR, renewal date, products used, CSM owner
- Historical signals: last 90 days of meetings, tickets, health changes
- Existing risk flags: open risks and their status
- Prior recommendations: what has been approved, dismissed, or acted on
- Customer memory: recurring themes, known blockers, stakeholder map

This context is passed to the AI agent as structured retrieval augmentation — the model is not reasoning from generic training data; it is reasoning about a specific customer.

---

### 3. AI Interpretation

For each signal type, a specialized interpretation step runs:

**Meeting notes:**
- Sentiment classification (5-class: Very Positive → Very Negative)
- Churn risk pattern detection (blockers, delays, adoption drops, renewal concerns)
- Expansion signal detection (expansion intent, budget conversations, new team mentions)
- Action item extraction
- Stakeholder tone assessment

**Support tickets:**
- Severity classification
- Pattern detection (same issue recurring across tickets)
- Escalation signal detection

**Usage data:**
- Adoption trend (improving / stable / declining)
- Feature adoption gaps (high-value features unused by account)
- Power user identification

---

### 4. Risk and Opportunity Scoring

After interpretation, the system scores each account across two axes:

**Churn Risk Score (0–100):**
- Weighted inputs: sentiment trend (30%), support ticket volume and severity (20%), adoption trend (25%), renewal proximity (15%), engagement depth (10%)
- Score ≥ 70 → High Churn Risk (Red)
- Score 40–69 → Medium Risk (Yellow)
- Score < 40 → Healthy (Green)

**Expansion Opportunity Score (0–100):**
- Weighted inputs: expansion signal in recent meetings, budget conversations mentioned, stakeholder broadening, feature adoption headroom
- Score ≥ 60 → Active expansion opportunity surfaced to Agent Actions

---

### 5. Recommendation Generation

Based on scores and context, the recommendation engine generates:

- Recommended action (what to do)
- Action type (Internal / External)
- Priority (Critical / High / Medium)
- Reasoning (what signals triggered this recommendation)
- Draft output (email draft, QBR section, call agenda)
- Confidence score

---

### 6. Approval Routing

```
Is the action customer-facing (External)?
    YES → Route to Human Approval Queue
    NO  → Execute automatically (if admin config permits)
```

For External actions, the CSM sees:
- Action summary
- Reasoning
- Draft preview
- Approve / Edit + Approve / Dismiss

---

### 7. Outcome Capture

Every approved, dismissed, or overridden recommendation is captured:

| Outcome | Signal Captured |
|---------|----------------|
| Approved | Action type, account, confidence score, CSM who approved |
| Dismissed | Action type, account, dismiss reason, CSM who dismissed |
| Overridden (manual edit before approval) | What was changed; original vs. final output |
| Action executed → positive outcome (no churn) | Implicit positive signal associated with recommendation type |

---

### 8. Learning Feedback

Captured outcomes feed back into:

1. **Recommendation calibration:** Dismiss patterns reduce future recommendations of the same type for similar accounts
2. **Confidence recalibration:** If High confidence recommendations are frequently dismissed, confidence model is re-evaluated
3. **Prompt improvement:** Recurring dismissal reasons inform prompt revision in the AI pipeline
4. **Golden dataset expansion:** Approved outputs with positive outcomes can be added to the eval golden dataset

*In the prototype: approve/dismiss state is local and does not persist across sessions. Production implementation would require persistent feedback storage and a retraining pipeline.*
