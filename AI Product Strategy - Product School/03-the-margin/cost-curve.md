# Cost Curve & Pricing Strategy — SuccessOS AI

Assumption for this exercise: one CSM seat manages about 30 accounts, reviews around 20 meeting notes per month, and creates 3 QBRs per month. These are directional numbers, not a full finance model.

## Cost Model

| Cost Category | Per-User/Month | Notes |
|--------------|----------------|-------|
| Inference (primary model) | ~$1.00 | Meeting notes, QBRs, deeper risk analysis, feature impact |
| Inference (cascading/triage) | ~$0.30–0.55 | Daily health scoring, signal classification, note pre-processing |
| Infrastructure | ~$1.00 at scale | Hosting, database, vector search, queues. Higher in early stage |
| Data/storage | ~$0.20 | Embeddings and stored account context |
| Human-in-the-loop | $0.00 | Approval happens inside the CSM workflow |
| **Total AI COGS** | **~$2.75 at scale** | Early stage may be closer to ~$5.75 per seat |

## Cascading Strategy

**Triage model:** Cheaper model for daily scoring, signal classification, and basic summaries.  
**Frontier model:** Stronger model for meeting intelligence, QBRs, feature impact, and complex churn reasoning.  
**Routing rule:** Use the stronger model only when health drops sharply, sentiment is negative, renewal is close, or the CSM asks for deeper analysis.  
**Expected cascade ratio:** Around 80% triage / 20% frontier.

## Pricing Model

**Current pricing:** CS platforms are usually sold as seat-based workflow software.  
**Proposed AI pricing:** Seat-based annual pricing with tier limits.  
**Model:** Seat-based, because CS teams usually budget by headcount, not token usage.

| Tier | Price | Segment | Core capability |
|------|-------|---------|-----------------|
| Starter | $49 | Series A–B, 5–20 CSMs | Meeting intel, dashboard, limited QBRs, basic actions |
| Growth | $89 | Series B–D, 20–100 CSMs | Unlimited core workflows, feature impact, CRM read/write |
| Enterprise | $149+ | 100+ CSMs | Custom workflows, SSO, governance, advanced tuning |

**Gross margin:** Roughly 93% early-stage and 97% at scale. The main point is that inference cost is manageable if routing is designed properly.

## Stress Tests

| Scenario | Impact on Margin | Response |
|----------|------------------|----------|
| Inference costs 3x | COGS increases from ~$2.75 to about ~$5.25 | Move more low-risk tasks to cheaper models |
| Heaviest segment doubles | Heavy users may cost closer to ~$5/seat | Add fair-use rules and move heavy teams to Enterprise |
| Model provider raises prices 50% | COGS increases to about ~$3.53 | Monitor, but no urgent change needed |

## Board One-Pager

**Before (traditional SaaS):** CS tools mainly sell dashboards, health scores, playbooks, and workflow management.

**After (AI-enabled):** SuccessOS AI should help CSMs detect risk, understand the reason, draft next steps, and learn from approvals or edits.

**Net margin shift:** AI adds only a few dollars of cost per seat. The margin works if the product uses model routing and does not send every task to the most expensive model.
