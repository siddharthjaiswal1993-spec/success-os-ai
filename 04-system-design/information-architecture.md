# Information Architecture — SuccessOS AI

---

## Navigation Structure

```
SuccessOS AI
├── Dashboard (/)
│   ├── Portfolio KPI Strip
│   ├── Account List (sortable / filterable)
│   └── AI Insight Panel
│
├── Accounts (/accounts)
│   ├── Account List View
│   └── Account Detail (/accounts/:id)
│       ├── Account Header (health score, ARR, renewal, CSM)
│       ├── Health Component Breakdown
│       ├── Active Risks Panel
│       ├── Expansion Signals Panel
│       ├── Activity Timeline (last 90 days)
│       └── Recent AI Actions
│
├── Meeting Intelligence (/meeting-intel)
│   ├── Note Input Area
│   ├── Account Linker (optional)
│   └── Analysis Output
│       ├── Summary + Sentiment
│       ├── Churn Risk Delta
│       ├── Expansion Signal
│       ├── Action Items
│       ├── Recommended Next Actions
│       └── Draft Follow-Up Email (pending approval)
│
├── Feature Impact (/feature-impact)
│   ├── Feature Description Input
│   └── Impact Analysis Output
│       ├── Summary Card (total ARR, match count)
│       ├── Impacted Accounts Table
│       └── Per-Account Draft Message (pending approval)
│
├── Agent Actions (/agent-actions)
│   ├── Action Queue (Critical → High → Medium)
│   └── Per-Action View
│       ├── Action Summary
│       ├── Reasoning + Evidence
│       ├── Confidence Indicator
│       ├── Draft Preview
│       └── Approve / Dismiss Controls
│
├── QBR Generator (/qbr)
│   ├── Account Selector
│   └── Generated QBR
│       ├── 9 Sections (editable)
│       ├── Disclaimer Banner
│       └── Copy / Export Controls
│
└── Settings (/settings)
    ├── Agent Configuration
    │   ├── Autonomy Mode (Supervised / Verified / Trusted)
    │   └── Per-Action-Type Toggles
    ├── Confidence Thresholds
    ├── Integration Status
    └── Team & Permissions
```

---

## Page Hierarchy and Content Priority

### Dashboard
**Primary job:** "Where does my team need to act today?"

Priority order:
1. Accounts at critical health (Red) — most urgent
2. Renewals due in <30 days with Yellow/Red health — high urgency
3. AI Insight Panel — proactive intelligence
4. Portfolio KPIs — context

---

### Account Detail
**Primary job:** "Everything I need to know about this account in one place."

Priority order:
1. Health score + tier (always visible — headline metric)
2. Active risks (what is going wrong right now)
3. Expansion signals (what opportunity exists)
4. Timeline (recent context)
5. AI actions history (what has been done)

---

### Meeting Intelligence
**Primary job:** "Turn my notes into intelligence and actions in 30 seconds."

UX flow:
1. Paste notes → large, prominent text area
2. One-click Analyze
3. Results display immediately below without page reload
4. Draft email is last item — requires deliberate scroll + approval action

---

### Agent Actions
**Primary job:** "Review, approve, or dismiss AI recommendations quickly."

UX principles:
- Default view shows Critical and High priority only
- Each action card is self-contained — no need to navigate away
- Approve and Dismiss are equally prominent (no dark-pattern incentive to approve)
- Dismissal reason is required but fast (dropdown, not free text)

---

## Content Hierarchy Rules

1. **AI-generated content is labeled.** Always. "AI-generated" label on every AI output, with confidence indicator.
2. **Human-required actions are explicit.** "Pending Approval" badges on all drafts. No ambiguity about what requires action.
3. **Evidence is always accessible.** Every AI conclusion links to the supporting signal. No unexplained scores.
4. **No information buried.** Critical health alerts appear in the header of account detail pages — not only in a sub-panel.
5. **Editable always.** Every AI output can be edited by the CSM. The product never locks users into AI-generated content.
