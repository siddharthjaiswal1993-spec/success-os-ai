# Functional Requirements — SuccessOS AI

---

## FR-1: Account Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | System shall maintain a list of customer accounts with fields: name, ARR, renewal date, health score, CSM owner, health tier, products used | P0 |
| FR-1.2 | System shall compute a composite account health score (0–100) from component signals: adoption, sentiment, support, engagement, renewal risk | P0 |
| FR-1.3 | System shall classify accounts into health tiers: Red (<40), Yellow (40–69), Green (≥70) | P0 |
| FR-1.4 | System shall maintain a chronological account activity timeline | P0 |
| FR-1.5 | System shall allow CSMs to manually override the AI health score with a reason | P1 |
| FR-1.6 | System shall flag accounts with no logged activity in >30 days as engagement risk | P1 |
| FR-1.7 | System shall support account filtering by: health tier, renewal month, CSM owner, ARR range | P0 |
| FR-1.8 | System shall display open churn risks and expansion signals per account | P0 |

---

## FR-2: Meeting Intelligence

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | System shall accept free-text meeting notes (minimum 50 words) and return structured analysis | P0 |
| FR-2.2 | Analysis shall include: meeting summary, sentiment classification, churn risk delta, expansion signal detection, action items | P0 |
| FR-2.3 | Analysis shall include ≤3 recommended next-best actions with reasoning | P0 |
| FR-2.4 | System shall generate a draft follow-up email for human review | P0 |
| FR-2.5 | All generated draft emails shall be labeled "Pending Approval" until CSM explicitly approves | P0 |
| FR-2.6 | System shall display confidence level (High/Medium/Low) for churn risk assessment | P0 |
| FR-2.7 | System shall identify specific phrases from notes that triggered churn risk or expansion flags | P1 |
| FR-2.8 | Analysis shall complete within 8 seconds for notes up to 1,000 words | P0 |
| FR-2.9 | System shall handle notes with conflicting signals (both churn and expansion) by surfacing both | P1 |

---

## FR-3: Feature Impact Intelligence

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | System shall accept natural language feature description and return impacted account list | P1 |
| FR-3.2 | Each matched account shall display: account name, match relevance (High/Medium/Low), impact type, ARR | P1 |
| FR-3.3 | System shall calculate total ARR impacted by the feature across matched accounts | P1 |
| FR-3.4 | System shall generate a suggested customer outreach message for each matched account (pending approval) | P1 |
| FR-3.5 | System shall explain why each account was matched (what attribute triggered the match) | P1 |
| FR-3.6 | System shall return results within 5 seconds | P1 |
| FR-3.7 | Matching shall support at minimum: multi-location, RBAC/permissions, integration, analytics feature categories | P1 |

---

## FR-4: QBR Generator

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | System shall generate a structured QBR brief for any account in the system | P1 |
| FR-4.2 | QBR shall include all 9 required sections as defined in PRD | P1 |
| FR-4.3 | QBR content shall be account-specific — referencing actual account data, ARR, signals, and risks | P1 |
| FR-4.4 | QBR shall be fully editable by CSM before sharing | P1 |
| FR-4.5 | QBR shall be generated within 15 seconds | P1 |
| FR-4.6 | QBR shall include a visible disclaimer: "AI-generated first draft — review before sharing with customer" | P0 |
| FR-4.7 | System shall allow QBR to be copied or exported | P2 |

---

## FR-5: Agent Actions and Approval Workflow

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-5.1 | System shall generate recommended next-best actions from account signals | P1 |
| FR-5.2 | Actions shall be classified as Internal (can be auto-approved) or External (requires human approval) | P0 |
| FR-5.3 | External actions shall require explicit CSM approval before any execution | P0 |
| FR-5.4 | Each action shall show: recommended action, reasoning, confidence score, preview of output | P1 |
| FR-5.5 | Dismissal shall require reason selection from predefined options | P1 |
| FR-5.6 | All approvals and dismissals shall be logged with timestamp and user | P0 |
| FR-5.7 | Actions pending for >7 days shall be auto-escalated with notification | P2 |
| FR-5.8 | System shall surface dismissal patterns to governance dashboard | P2 |

---

## FR-6: Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-6.1 | Dashboard shall show portfolio-level KPIs: total ARR, at-risk count, at-risk ARR, expansion opportunities | P0 |
| FR-6.2 | Dashboard shall show account list with sortable columns | P0 |
| FR-6.3 | Dashboard shall include AI Insight Panel with ≥3 portfolio-level recommendations | P0 |
| FR-6.4 | Each AI insight shall include reasoning and link to the referenced account | P0 |
| FR-6.5 | Dashboard shall load within 2 seconds | P0 |

---

## FR-7: Settings and Governance

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-7.1 | Admin shall be able to configure agent mode: Full Automation / Supervised / Approval Required for All | P2 |
| FR-7.2 | Admin shall be able to set confidence threshold below which actions are not auto-approved | P2 |
| FR-7.3 | Admin shall be able to enable/disable each agent action type | P2 |
| FR-7.4 | System shall log all AI actions and approvals in an immutable audit log | P1 |
| FR-7.5 | Admin shall be able to view AI action acceptance rates and dismissal patterns | P2 |
