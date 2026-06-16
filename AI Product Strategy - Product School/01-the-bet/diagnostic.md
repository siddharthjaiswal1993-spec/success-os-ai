# Three-Axis Vulnerability Diagnostic

**Product:** SuccessOS AI — CS intelligence agent for enterprise SaaS
**Role:** Principal PM

## Scores

### Contextual Moat — 4/5
Lives in the CSM's daily workflow: health monitoring, churn alerts, meeting notes. Over time it learns account-specific context, so switching means losing that and starting over. Docked a point because CS teams are small and opinionated, so one champion leaving can stall adoption.
**Attacker:** Gainsight. Already owns the CSM workflow; just needs to layer AI on top.

### Data Advantage — 3/5
We synthesize CRM + product usage + call data, which no single source has on its own. But we don't own any of those sources, and the real edge (cross-customer churn patterns) only shows up at scale.
**Attacker:** Gong. Owns the call data and is already moving into CS.

### Platform Exposure — 4/5
Highest-risk axis. Salesforce/Einstein can ship health scoring and churn alerts natively inside the CRM with zero integration friction. Our defensible move is to go deeper on autonomous action, not just insights.
**Attacker:** Salesforce Einstein + Agentforce.

## Top Vulnerability
Platform exposure. Salesforce, Gainsight, and Gong can each ship CS intelligence inside tools customers already pay for, potentially commoditizing us before we reach the scale our data advantage needs.

## Confidence Level
Medium. Defensible if we lock in workflow depth and predictive accuracy in the next 12–18 months. After that the window closes fast.
