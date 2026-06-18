# Three-Axis Vulnerability Diagnostic

**Product:** SuccessOS AI — CS intelligence agent for enterprise SaaS
**Role:** Principal PM

## Scores

### Contextual Moat — 4/5
Lives in the CSM's daily workflow: health monitoring, churn alerts, meeting notes, and intervention planning. The core thesis is not better reporting; it is helping teams intervene before churn becomes visible. Docked a point because CS teams are small and champion turnover can reset adoption.
**Attacker:** Gainsight. Already owns much of the CS workflow.

### Data Advantage — 3/5
We combine CRM, product usage, support, and call signals into a single account view. We do not own those sources today; the long-term advantage comes from correction data and intervention outcomes captured over time.
**Attacker:** Gong. Owns a critical signal source and is expanding into CS.

### Platform Exposure — 4/5
Highest-risk axis. Salesforce can ship health scoring and alerts natively. Our defensible position is customer outcome workflows: prioritizing interventions, coordinating actions, and learning from results across systems.
**Attacker:** Salesforce Einstein + Agentforce.

## Top Vulnerability
Platform exposure. Salesforce, Gainsight, and Gong can all replicate insight surfaces faster than we can build distribution.

## Confidence Level
Medium. Defensible if we create a correction-data flywheel and become the system that converts weak signals into interventions before incumbents close the gap.