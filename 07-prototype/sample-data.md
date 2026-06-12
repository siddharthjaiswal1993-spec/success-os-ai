# Sample Data — SuccessOS AI Prototype

The 8 sample accounts represent a realistic CS portfolio at a mid-market B2B SaaS company.

---

## Account Overview

| Account | Industry | ARR | Health | Renewal (Days) | CSM | Tier |
|---------|---------|-----|--------|----------------|-----|------|
| Acme Retail Group | Retail Operations | $380,000 | 62 | 75 | Maya Chen | Growth |
| NovaHealth | Healthcare Technology | $290,000 | 82 | 140 | Raj Patel | Growth |
| BrightPath Education | EdTech | $175,000 | 71 | 95 | Maya Chen | Starter |
| UrbanFit Studios | Health & Fitness | $220,000 | 55 | 55 | Jordan Lee | Growth |
| FinEdge Capital | Financial Services | $410,000 | 88 | 200 | Raj Patel | Enterprise |
| CloudKitchen Pro | Food & Beverage | $145,000 | 44 | 30 | Jordan Lee | Starter |
| FranchiseWorks | Franchise Management | $380,000 | 48 | 65 | Sam Torres | Growth |
| ZenOps Logistics | Logistics & Operations | $120,000 | 74 | 180 | Sam Torres | Starter |

**Portfolio total ARR:** $2,120,000  
**Portfolio average health score:** 65.5  
**Accounts renewing in 90 days:** 5 (Acme, BrightPath, UrbanFit, CloudKitchen, FranchiseWorks)

---

## Account Detail — Sample Meeting Notes & Signals

### Acme Retail Group

**Health history (12 weeks):** 78 → 75 → 71 → 69 → 65 → 66 → 63 → 62 → 62 → 60 → 63 → 62

**Meeting note (3 weeks ago):**
> "Check-in with Priya Sharma. Adoption is lower than expected in the analytics module — only about 30% of managers are logging in weekly. She mentioned they have a lot of new store managers who haven't been trained yet. Also said they're expanding to 5 new retail locations next quarter and will need to onboard new store leads."

*Detected signals:*
- Churn Risk: Increased (adoption below target — "only about 30% of managers are logging in")
- Expansion Signal: Identified (5 new retail locations)

**Recommended Action:** Adoption Recovery Plan + Expansion Proposal Prep (sequence: fix adoption first)

---

### NovaHealth

**Health history (12 weeks):** 71 → 73 → 74 → 76 → 78 → 79 → 80 → 81 → 82 → 82 → 83 → 82

**Meeting note (1 week ago):**
> "Quarterly check-in with Kavya Subramaniam (Clinical Operations). She's very happy — said the clinical staff have been using the scheduling module daily and the error rate for double-bookings is down 40%. Regional VP is interested in rolling out to 3 more hospital sites. Finance team has budget approved for Q1. She said it's been a great partnership."

*Detected signals:*
- Churn Risk: Stable / Decreased
- Expansion Signal: Identified (3 hospital sites, Q1 budget)

**Recommended Action:** Expansion Proposal Prep (target Q1 budget cycle)

---

### CloudKitchen Pro (At Risk)

**Health history (12 weeks):** 72 → 71 → 69 → 66 → 62 → 59 → 55 → 52 → 49 → 47 → 45 → 44

**Meeting note (2 weeks ago):**
> "Check-in with Marcus Webb. He opened by saying their team is stretched and they haven't had time to adopt the platform properly. Mentioned they haven't seen the ROI they expected. He said he's not sure whether they'll renew at this price point — they might look for something simpler."

*Detected signals:*
- Churn Risk: Increased, High confidence ("not sure whether they'll renew," "look for something simpler")
- Expansion Signal: None

**Meeting note (1 week ago):**
> "Follow-up call with Marcus. He seemed more open but said his team is barely using it — maybe 2 of the 8 modules. He asked if there was a simpler onboarding path for new kitchen staff."

*Detected signals:*
- Churn Risk: Increased, Medium confidence ("barely using it")
- Note: Second consecutive negative meeting

**Pending Recommended Actions:**
1. Executive Check-in (Critical priority — renewal 30 days)
2. Adoption Recovery — guided onboarding for kitchen staff
3. Retention offer: 60-day extended trial on two underused modules

---

### FranchiseWorks (At Risk)

**Health history (12 weeks):** 72 → 70 → 65 → 62 → 60 → 58 → 55 → 52 → 50 → 49 → 48 → 48

**Meeting note (1 week ago):**
> "Monthly review with Jordan Kim (Regional Operations Manager). He opened by noting that franchise adoption is really inconsistent — some locations are 90%+ active, others barely log in at all. Their IT team has had an open ticket about API response times for 3 weeks with no resolution. He also mentioned that their CEO is interested in expanding to 3 more regions and that this platform would be part of that plan. Budget for regional expansion is in the Q3 plan."

*Detected signals:*
- Churn Risk: Increased (adoption inconsistency, unresolved API ticket)
- Expansion Signal: Identified (3 new regions, Q3 budget)

**Pending Recommended Actions:**
1. Support Escalation — API performance ticket needs resolution (Critical)
2. Adoption Recovery — targeted activation plan for underperforming franchise locations
3. Expansion Conversation — regional expansion proposal after health issues are addressed

---

## Feature Impact Data

The Feature Impact agent uses these matching rules in the prototype:

| Feature Keyword | High Match | Medium Match |
|----------------|-----------|-------------|
| multi-location, location, franchise | FranchiseWorks, UrbanFit Studios | CloudKitchen Pro, Acme Retail Group |
| RBAC, permission, access control | FinEdge Capital, NovaHealth | FranchiseWorks |
| analytics, reporting, dashboard | UrbanFit Studios, FranchiseWorks | FinEdge Capital, Acme Retail Group |
| integration, API, sync | Acme Retail Group, ZenOps Logistics | BrightPath Education |
| onboarding, training, adoption | CloudKitchen Pro, BrightPath Education | UrbanFit Studios |
