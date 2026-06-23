# Data Flywheel Map — SuccessOS AI

> Score each loop 1-5. Your weakest loop is where competitors attack first.
> Scored as an early prototype, not as a mature platform.

## Flywheel Loops

| Loop | What It Measures | Score 1 | Score 5 | Score |
|------|------------------|---------|---------|-------|
| **Correction** | Do users fix AI outputs? Is that signal captured and reused? | No capture | Automated retraining | 1/5 |
| **Preference** | Does the product learn individual/team preferences over time? | Stateless | Deep personalization | 1/5 |
| **Domain Context** | Does usage in one area improve quality in adjacent areas? | Siloed | Cross-domain transfer | 2/5 |
| **Network** | Does each new user/team make it better for everyone? | Isolated | Strong network effects | 1/5 |

### Correction Loop — 1/5
**What you capture today:** The UI has approve/dismiss actions, but the signal is not stored in a real feedback system.
**How it compounds:** If every approval, edit, and dismissal is saved with account context, it can become training data for better recommendations.

### Preference Loop — 1/5
**What you capture today:** The product does not remember how a specific CSM or CS leader likes to work.
**How it compounds:** Over time it should learn preferred action types, escalation style, and which accounts a manager cares about most.

### Domain Context Loop — 2/5
**What you capture today:** The product connects account data, notes, tickets, and usage in the UI, but the relationships are mostly hardcoded.
**How it compounds:** Meeting notes, usage drops, support issues, and renewal outcomes should improve the next recommendation instead of staying as separate signals.

### Network Loop — 1/5
**What you capture today:** One customer does not improve the product for another customer today.
**How it compounds:** The realistic future version is anonymized benchmarks, not raw customer data sharing.

**Total Flywheel Score: 5/20**
**Weakest Loop:** Correction.
**Fix for weakest loop:** Store every approve/dismiss/edit action with account, recommendation, decision, timestamp, and final outcome.

---

## Encroachment Threat Assessment

| Threat | Attacker | Vector | Time-to-threat | % of value at risk |
|--------|----------|--------|----------------|--------------------|
| Platform Encroachment | Salesforce / Einstein | Native CRM intelligence and workflow automation | 12–18 mo | 60–70% |
| Vertical Competitor | Gainsight / ChurnZero | AI inside existing CS workflows | Already in market | 50–60% |
| Adjacent Expansion | Gong | Call intelligence moving into CS workflows | 18–24 mo | 30–40% |

---

## 90-Day Encroachment Plan

*Partner plan: Salesforce launches churn insights inside the CRM.*

**Attacker:** Salesforce / Einstein

**Attack vector (target the weakest loop):** Use existing CRM data and distribution to make CS intelligence feel like a native feature instead of a new tool.

**Weeks 1-4 — what they ship:** Account health summary, churn-risk alert, and renewal-risk reason directly on the Salesforce account page.

**Weeks 5-8 — how they poach users:** Bundle it into existing Salesforce contracts and tell teams they do not need another CS AI platform.

**Weeks 9-12 — why users don't come back:** It is good enough, already in the workflow, and has no extra onboarding or procurement.

**Your defense:** SuccessOS cannot win by only being a better dashboard. The defense has to be better intervention workflows, stronger human approval, cross-system context, and correction data from real CSM decisions.
