# Evaluation Datasets — SuccessOS AI

Sample eval cases for each AI output type. These represent the variety of inputs the system must handle correctly.

---

## Meeting Intelligence Eval Cases

### EVAL-MI-001 — Churn Risk Signal (Clear)
**Input:**
```
Spoke with Jordan at FranchiseWorks today. He opened by saying they've been having a lot 
of issues with the multi-location rollout and that his team is losing confidence. He 
mentioned that their IT team has been complaining for weeks about the API response times 
and nobody has resolved the ticket. He said he's not sure if they'll renew unless things 
improve significantly. He also mentioned they had a meeting with a competing vendor last 
week just to "keep options open." Budget review is in Q4.
```

**Expected Output:**
- Sentiment: Negative
- Churn Risk Delta: Increased (High confidence)
- Triggering phrases: "not sure if they'll renew," "meeting with a competing vendor," "losing confidence"
- Expansion Signal: None
- Priority action: Executive Check-in + Support escalation on open API ticket

**Pass criteria:** Churn delta = Increased; at least 2 triggering phrases identified; no false expansion signal

---

### EVAL-MI-002 — Expansion Signal (Clear)
**Input:**
```
Had a great call with Kavya at NovaHealth today. She said the clinical staff have been 
loving the new scheduling module and their adoption is through the roof. She mentioned 
that their regional VP is interested in rolling this out to 3 more hospital sites and 
asked us to put together a proposal. She also said the finance team is planning to 
include a budget line for expanded licenses in their Q1 budget cycle. She seemed 
genuinely excited.
```

**Expected Output:**
- Sentiment: Very Positive
- Churn Risk Delta: Stable / Decreased (no risk signals)
- Expansion Signal: Identified — "3 more hospital sites," "budget line for expanded licenses"
- Priority action: Expansion proposal prep + follow up before Q1 budget cycle

**Pass criteria:** Expansion signal detected; no false churn flag; both expansion phrases cited

---

### EVAL-MI-003 — Mixed Signals (Churn + Expansion)
**Input:**
```
Long call with Priya at Acme Retail Group. Her team has been struggling with the 
analytics module — adoption is low and she's getting pressure from her VP about ROI. 
That said, they're expanding to 5 new retail locations next quarter and she specifically 
asked if we support multi-location benchmarking. She said the budget is there but the 
current team is overwhelmed and needs a better onboarding experience for new sites.
```

**Expected Output:**
- Sentiment: Cautious
- Churn Risk Delta: Increased (analytics ROI pressure)
- Expansion Signal: Identified (5 new locations, multi-location benchmarking)
- Priority action: Adoption recovery plan + expansion proposal (in that order — fix the current problem before upselling)

**Pass criteria:** Both signals identified; churn shown first due to severity; actions are sequenced correctly

---

### EVAL-MI-004 — No Signals (Routine Meeting)
**Input:**
```
Quarterly check-in with Sam at ZenOps Logistics. Things are generally going well. 
Their team is using the core platform daily and the operations coordinator mentioned 
that route optimization has been a big time saver. No support issues. Renewal is 
coming up in 6 months. Sam seemed happy and said they'd continue.
```

**Expected Output:**
- Sentiment: Positive
- Churn Risk Delta: Stable (no risk signals)
- Expansion Signal: None detected
- Priority action: Log positive sentiment; no immediate action required

**Pass criteria:** No false positive churn or expansion signals; action = routine follow-up only

---

## Feature Impact Eval Cases

### EVAL-FI-001 — Multi-Location Feature
**Feature input:** "Launching multi-location benchmarking dashboard — allows managers to compare performance metrics across all locations from a single view"

**Expected matched accounts:**
- FranchiseWorks (High — 18 franchise locations; core use case)
- UrbanFit Studios (High — multi-location fitness chain)
- CloudKitchen Pro (Medium — multiple kitchen sites)
- Acme Retail Group (Medium — 5 new retail locations mentioned in recent meeting)

**Pass criteria:** FranchiseWorks and UrbanFit in top 2; CloudKitchen in results; NovaHealth and BrightPath not in results

---

### EVAL-FI-002 — RBAC and Permissions
**Feature input:** "New role-based access control (RBAC) system — enterprise admins can now define granular permissions by role, department, and data sensitivity level"

**Expected matched accounts:**
- FinEdge Capital (High — financial services compliance requirements)
- NovaHealth (High — healthcare data sensitivity; HIPAA considerations)
- FranchiseWorks (Medium — multi-location = multiple admin levels)
- ZenOps Logistics (Low — logistics operations data sensitivity)

**Pass criteria:** FinEdge and NovaHealth in top 2 with High relevance; correct impact type = "Churn Reduction" for compliance-driven matches

---

### EVAL-FI-003 — Analytics Upgrade
**Feature input:** "Enhanced analytics suite — new executive dashboard with pipeline analytics, cohort analysis, and customizable reporting for leadership teams"

**Expected matched accounts:**
- UrbanFit Studios (High — fitness performance metrics across locations)
- FranchiseWorks (High — franchise performance comparison)
- FinEdge Capital (Medium — financial analytics and executive reporting)
- Acme Retail Group (Medium — retail operations analytics)

**Pass criteria:** UrbanFit and FranchiseWorks in top 2; impact type correctly identified as "Expansion Opportunity" for accounts already using analytics

---

## QBR Generation Eval Cases

### EVAL-QBR-001 — High-Risk Account (FranchiseWorks)

**Account context:**
- ARR: $380,000 | Renewal: Aug 15, 2026 (65 days)
- Health: 48/100 (Red) | 30d delta: -12 points
- Risks: API performance issues (Critical), franchise adoption inconsistency (High)
- Expansion: Regional expansion conversation in progress

**Expected QBR quality:**
- Executive summary acknowledges health challenges honestly; does not sugarcoat
- Risk section is detailed with specific open issues cited
- Expansion section presents the regional opportunity without overpromising
- Next steps include a concrete remediation plan for API performance
- Tone is professional, not defensive

**Pass criteria:** All 9 sections present; Executive Summary references actual health score; Risk section cites specific issues; no generic filler content

---

### EVAL-QBR-002 — Expansion-Ready Account (NovaHealth)

**Account context:**
- ARR: $290,000 | Renewal: Oct 30, 2026 (140 days)
- Health: 82/100 (Green)
- Expansion: 3 additional hospital sites under discussion; Q1 budget approved

**Expected QBR quality:**
- Executive Summary leads with positive business outcomes, not features
- Expansion Opportunities section is specific about the 3-site expansion
- Recommended Next Steps include a clear ask: proposal for expanded deployment
- Tone is confident and forward-looking

**Pass criteria:** Expansion opportunity section is specific; proposal ask in Next Steps; no unnecessary risk language for a healthy account
