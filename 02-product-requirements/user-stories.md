# User Stories — SuccessOS AI

---

## Meeting Intelligence

```
As a Customer Success Manager,
I want to paste my meeting notes and receive a structured analysis,
So that I can understand churn risk, expansion signals, and next actions without manually reviewing every word.

Acceptance Criteria:
- Notes of 100–2,000 words are accepted
- Analysis returns within 8 seconds
- Output includes: summary, sentiment, churn delta, expansion signal, action items,
  recommended next actions, and draft follow-up email
- Churn delta includes the specific phrases that triggered the flag
- Draft email is labeled "Pending Approval" and cannot be sent without explicit approval
```

```
As a CS Director,
I want to review the AI's reasoning for a churn risk flag,
So that I can trust or override the assessment before escalating to my CRO.

Acceptance Criteria:
- Each churn risk flag links to the specific signal that triggered it
- Confidence level (High / Medium / Low) is visible
- I can override the flag with a one-click dismiss and reason
- Override is logged and attributed to me
```

---

## Feature Impact Intelligence

```
As a Product Manager,
I want to enter a feature description and see which customer accounts it impacts,
So that I can brief the CS team on launch outreach priorities before release.

Acceptance Criteria:
- Feature description accepts natural language (no structured input required)
- Results show impacted accounts with relevance score and impact type
- Total impacted ARR is calculated and displayed
- Recommended customer message draft is available for each account tier
- All message drafts require CSM approval before delivery
```

```
As a Customer Success Manager,
I want to see which upcoming product updates are relevant to my accounts,
So that I can proactively reach out rather than waiting for customers to ask.

Acceptance Criteria:
- Feature impact results are filterable by my accounts
- I can see why each account was matched (what attribute triggered the match)
- I can approve and personalize the suggested outreach message
```

---

## Account Health

```
As a CSM,
I want to see a real-time health score for each of my accounts with supporting evidence,
So that I can prioritize which accounts need my attention today.

Acceptance Criteria:
- Health score displayed as a number (0–100) and tier (Red/Yellow/Green)
- Score includes component breakdown: Adoption, Sentiment, Support, Engagement, Renewal Risk
- Each component links to the signals that informed it
- Last-updated timestamp visible
- I can view the last 90 days of account activity on a timeline
```

```
As a CS Director,
I want to see my full portfolio sorted by churn risk,
So that I can identify which accounts my team needs to address this week.

Acceptance Criteria:
- Portfolio view shows all accounts with health tier and ARR
- Sortable by: health score, renewal date, ARR, churn risk level
- Filter by: CSM owner, health tier, renewal month
- AI insight panel shows top 3 portfolio-level recommendations
```

---

## QBR Generator

```
As a CSM,
I want to generate a first-draft QBR for any of my accounts in under 60 seconds,
So that I can spend my preparation time on personalization and delivery, not from-scratch writing.

Acceptance Criteria:
- QBR generated in < 15 seconds for any account in the system
- Output includes all 9 required sections (see PRD)
- Content is account-specific (uses account name, ARR, renewal date, actual risk signals)
- Output is fully editable before sharing
- Clear disclaimer: "AI-generated first draft — review before sharing with customer"
- QBR can be copied to clipboard or exported
```

---

## Agent Actions

```
As a CSM,
I want to review and approve or dismiss AI-recommended actions,
So that I maintain control over customer communications while benefiting from AI prioritization.

Acceptance Criteria:
- All external-facing actions require explicit Approve click before execution
- Each action shows: what it recommends, why, confidence score, and preview
- Dismiss requires reason selection
- Approved actions are logged with timestamp
- Dismissed actions are logged with reason
- Action queue is empty-able (all items resolved)
```

```
As a CS Director,
I want to see the acceptance rate of AI recommendations across my team,
So that I can understand where the AI is helpful vs. where it needs improvement.

Acceptance Criteria:
- Aggregated acceptance rate visible in settings / analytics view
- Dismissal reasons grouped and summarized
- I can flag recurring dismissal patterns to the AI governance dashboard
```

---

## Dashboard

```
As a CS Director,
I want to see portfolio-level KPIs and AI insights on my landing page,
So that I start every day knowing where my team's attention is most needed.

Acceptance Criteria:
- Dashboard shows: Total ARR, accounts at risk (count + ARR), expansion opportunities (count + ARR)
- AI Insight Panel shows 3 AI-generated recommendations for the portfolio today
- Each insight is linked to the account it references
- Dashboard loads in < 2 seconds
- Insights refresh on page load (or on demand)
```
