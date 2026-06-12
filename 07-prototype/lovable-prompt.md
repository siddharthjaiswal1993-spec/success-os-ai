# Lovable Prototype Prompt — SuccessOS AI

Use this prompt to generate the SuccessOS AI prototype in Lovable (lovable.dev).

---

## Prompt

```
Build a React web app called "SuccessOS AI" — an AI-native Customer Success Intelligence platform.

## Core concept
SuccessOS AI helps Customer Success Managers (CSMs) and CS Directors manage their customer portfolio using AI-generated signals, recommendations, and automated workflows. The platform reads meeting notes submitted by CSMs, detects churn risk and expansion signals, scores account health, generates QBR drafts, and recommends next actions — always with human approval before anything reaches the customer.

## Stack and styling
- React 18, TypeScript, Tailwind CSS
- Clean, professional dark sidebar with slate-900 background
- Main content area: white/gray-50 background
- Primary accent color: emerald-600 (#059669) for positive signals, rose-600 (#e11d48) for risk signals, blue-600 (#2563eb) for actions
- Font: system-ui / Inter
- No external icon packages unless necessary

## Pages / Routes

### 1. Dashboard (/)
Header: "Account Portfolio" with a search bar and filters (All / At Risk / Healthy / Expanding)
Display 8 account cards in a responsive grid. Each card shows:
- Company name and logo placeholder (gradient avatar with initials)
- Health score (0-100) with color coding: ≥75 green, 55-74 yellow, 40-54 orange, <40 red
- ARR
- Days until renewal
- Number of open risk flags
- Number of expansion signals
- A sparkline trend (last 6 weeks)
- "View Account" button

Include a summary stats bar at the top:
- Total accounts: 8
- At Risk: 2
- Expanding: 3
- Avg health: 67
- Total ARR: $2.1M

### 2. Account Detail (/account/:id)
Full-page view for a single account. Four tabs:

**Overview tab:**
- Health score ring gauge (large, colored)
- ARR, renewal date, CSM owner, tier
- Last meeting date
- Trend chart: 12-week health score line chart
- Key risks summary (count + top risk)
- Key expansion signals summary

**Timeline tab:**
Meeting and signal history in reverse chronological order. Each entry is a card with:
- Date, type (Meeting / Risk Flag / Expansion Signal / Action)
- Content: meeting summary OR signal description
- For meetings: churn risk delta (Increased / Decreased / Stable) + confidence level
- For signals: supporting quote from meeting notes
- Color-coded left border (blue = meeting, red = risk, green = expansion, yellow = action)

**Actions tab:**
Pending recommended actions (approve or dismiss). Each action card shows:
- Action type (e.g., "Executive Check-in", "Expansion Proposal Prep")
- Recommended by: AI
- Rationale: the signal that triggered this recommendation
- Confidence: High / Medium / Low
- Draft content (if applicable — e.g., draft email subject + body)
- Two buttons: [Approve] (emerald) and [Dismiss] (ghost, gray)
- On Dismiss: show a dropdown to select reason (Incorrect recommendation / Timing not right / Already handled / Other)
Completed actions below with status badge.

**QBR tab:**
- [Generate QBR] button at the top
- After generation: display a structured QBR document with sections:
  - Executive Summary
  - Health Score Trend (chart)
  - Key Risks and Mitigation Plans
  - Expansion Opportunities
  - Feature Adoption Highlights
  - Recommended Next Steps
  - Renewal Discussion Points
- Show "AI-generated draft — review before sharing with customer" disclaimer
- Show [Mark as reviewed] checkbox + [Download PDF] button (no actual PDF — just show the button)

### 3. Feature Impact (/feature-impact)
A tool for CS teams to understand which accounts a new product feature affects.

- Text area input: "Describe the new feature..."
- [Analyze Impact] button
- After submission: show a list of matched accounts with:
  - Account name
  - Relevance level: High / Medium / Low (color coded)
  - Impact type: Expansion Opportunity / Churn Risk Reduction / Adoption Boost
  - Reasoning: 1-2 sentence explanation of why this account matches

### 4. Navigation sidebar
Left sidebar (dark slate-900) with:
- Logo: "SuccessOS" with a small sparkle icon
- Nav items: Dashboard, Feature Impact, Settings (placeholder)
- Bottom: user avatar + name "Raj Mehta" with role "CS Director"

## Sample Data

### Accounts (hardcoded in state):
1. Acme Retail Group | ARR: $380K | Health: 62 | Renewal: 75 days | Risks: 1 | Expansion: 1
2. NovaHealth | ARR: $290K | Health: 82 | Renewal: 140 days | Risks: 0 | Expansion: 2
3. BrightPath Education | ARR: $175K | Health: 71 | Renewal: 95 days | Risks: 1 | Expansion: 1
4. UrbanFit Studios | ARR: $220K | Health: 55 | Renewal: 55 days | Risks: 2 | Expansion: 1
5. FinEdge Capital | ARR: $410K | Health: 88 | Renewal: 200 days | Risks: 0 | Expansion: 1
6. CloudKitchen Pro | ARR: $145K | Health: 44 | Renewal: 30 days | Risks: 3 | Expansion: 0
7. FranchiseWorks | ARR: $380K | Health: 48 | Renewal: 65 days | Risks: 2 | Expansion: 1
8. ZenOps Logistics | ARR: $120K | Health: 74 | Renewal: 180 days | Risks: 0 | Expansion: 1

### For each account, create 2-3 timeline entries (meetings + signals).
### For CloudKitchen Pro and FranchiseWorks, include 2-3 pending recommended actions (they are the At Risk accounts).

## Feature Impact tool behavior:
When the user submits any text, match against these rules:
- If input contains "multi-location" or "location" or "franchise" → match FranchiseWorks (High), UrbanFit Studios (High), CloudKitchen Pro (Medium), Acme Retail Group (Low)
- If input contains "RBAC" or "permission" or "access control" → match FinEdge Capital (High), NovaHealth (High), FranchiseWorks (Medium)
- If input contains "analytics" or "reporting" or "dashboard" → match UrbanFit Studios (High), FranchiseWorks (High), FinEdge Capital (Medium), Acme Retail Group (Medium)
- If input contains "integration" or "API" or "sync" → match Acme Retail Group (High), ZenOps Logistics (High), BrightPath Education (Medium)
- Default (no keyword match): show all accounts at Medium relevance

## Interaction requirements:
- Dashboard filters actually filter the displayed accounts
- Clicking "View Account" navigates to account detail
- Tab switching on account detail works correctly
- Dismiss action shows reason dropdown and removes the action from pending
- Approve action marks it as completed with a checkmark
- Feature Impact: clicking Analyze shows results with a brief loading state (500ms)
- QBR Generate: brief loading state (1000ms) then shows the full QBR document
```
