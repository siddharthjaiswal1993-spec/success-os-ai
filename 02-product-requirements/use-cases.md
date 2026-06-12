# Use Cases — SuccessOS AI

---

## UC-01: Meeting Notes Analysis

**Actor:** Customer Success Manager  
**Trigger:** CSM has just completed a customer meeting and wants to analyze the notes  
**Pre-condition:** CSM has meeting notes ready in any text format

**Main Flow:**
1. CSM opens Meeting Intelligence module
2. CSM pastes meeting notes into the text field (optionally selects account from dropdown)
3. CSM clicks "Analyze"
4. System returns structured analysis within 8 seconds
5. CSM reviews: summary, sentiment, churn delta, expansion signals, action items
6. CSM reviews recommended next-best actions
7. CSM views draft follow-up email
8. CSM approves or edits the draft email
9. CSM copies approved email to send via their email client
10. Analysis is optionally linked to the account timeline

**Alternative Flow — Churn Risk Detected:**
- At step 5, churn risk delta = "Increased"
- System highlights the triggering phrase(s) from notes
- System adds a suggested "Executive Check-in" action to the Agent Actions queue
- CSM can approve or dismiss the check-in action

**Alternative Flow — Expansion Signal Detected:**
- At step 5, expansion signal = "Identified" with supporting quote
- System adds a suggested "Expansion Outreach" action
- CSM can approve, edit, or dismiss

**Exception — Low Confidence:**
- If AI confidence is below threshold, analysis is returned with "Low confidence" flag
- Automated escalation is suppressed; CSM must manually review

---

## UC-02: Feature Impact Mapping

**Actor:** Product Manager or Customer Success Manager  
**Trigger:** A new product feature is being launched and stakeholders want to know which customers are impacted  
**Pre-condition:** Feature description is available in natural language

**Main Flow:**
1. User opens Feature Impact Intelligence module
2. User types a natural language feature description (e.g., "multi-location benchmarking dashboard")
3. User clicks "Analyze Impact"
4. System returns impacted account list within 5 seconds, showing: account name, ARR, match relevance, impact type
5. User reviews match explanations (why each account was matched)
6. User reviews total impacted ARR calculation
7. User reviews suggested customer outreach message for each tier
8. User approves outreach messages for relevant accounts
9. Approved messages are added to CSM's action queue for delivery

**Exception — No Match:**
- System returns empty match table with explanation
- System suggests broadening or clarifying the feature description

---

## UC-03: QBR Generation

**Actor:** Customer Success Manager  
**Trigger:** Quarterly Business Review is scheduled within the next 2 weeks  
**Pre-condition:** Account has at least one meeting logged and health data in the system

**Main Flow:**
1. CSM opens QBR Generator module
2. CSM selects account from dropdown
3. CSM clicks "Generate QBR"
4. System generates full QBR brief within 15 seconds
5. CSM reviews all 9 sections for accuracy and completeness
6. CSM edits any sections that need personalization or correction
7. CSM copies the final brief to their preferred format (Google Slides, PowerPoint, Word)
8. QBR is marked as "Generated" in account timeline

**Exception — Insufficient Data:**
- Sections with missing data show placeholder: "Insufficient data — please add manually"
- CSM can proceed with partial generation

---

## UC-04: Agent Action Approval

**Actor:** Customer Success Manager  
**Trigger:** AI has generated a recommended action requiring approval  
**Pre-condition:** Agent has identified a signal that warrants a customer-facing action

**Main Flow:**
1. CSM receives notification that an action is pending approval
2. CSM opens Agent Actions queue
3. CSM reviews action: what is recommended, why, confidence score, preview of draft content
4. CSM clicks "Approve"
5. Action is logged as approved with timestamp
6. CSM executes the action manually (sends email, schedules call) using the approved draft

**Alternative Flow — Dismiss:**
1. CSM reviews action
2. CSM clicks "Dismiss"
3. CSM selects reason: Not relevant / Already handled / Timing / Other
4. Dismissal is logged
5. AI incorporates dismissal pattern into future recommendations

---

## UC-05: Portfolio Risk Review

**Actor:** CS Director  
**Trigger:** Start of week; CS Director wants to understand portfolio risk state  
**Pre-condition:** Accounts are loaded with health data

**Main Flow:**
1. CS Director opens Dashboard
2. Reviews KPI strip: at-risk ARR, accounts at critical health
3. Reviews AI Insight Panel: top 3 recommendations for the portfolio
4. Sorts account list by health score (lowest first)
5. Clicks into highest-risk accounts to review detail
6. Reviews open risks and recommended actions per account
7. Delegates actions to CSM owners via internal notes
8. Reviews pending Agent Actions for escalations requiring director attention
