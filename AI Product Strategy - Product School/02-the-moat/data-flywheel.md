# Data Flywheel Map — SuccessOS AI

Scored at ground zero (pre-build). Most loops are weak at launch, which is normal. The point of the exercise is to design them in now instead of assuming they appear later.

## Flywheel Loops

| Loop | What It Measures | Score |
|------|------------------|-------|
| Correction | Do users fix AI outputs, and is that signal captured? | 1/5 |
| Preference | Does it learn individual/team preferences over time? | 1/5 |
| Domain Context | Does usage in one area improve quality in others? | 2/5 |
| Network | Does each new user make it better for everyone? | 1/5 |

**Correction (1/5):** The Approve/Dismiss buttons exist, but the clicks go nowhere. No persistence, no retraining. It's the highest-leverage loop and currently captures nothing. Fix: write every decision (account context + recommendation + verdict) to a store from day one, even before there's a retraining pipeline.

**Preference (1/5):** No memory of how individual CSMs work. The settings sliders are global config, not learned behavior. Every session starts from zero.

**Domain Context (2/5):** Strongest loop. Modules already read from a shared account dataset, so signals are connected structurally. But the connections are hardcoded rules, not learned, so nothing actually transfers across accounts yet.

**Network (1/5):** Single-tenant, so one customer's data teaches nothing about another's. The realistic path is anonymized industry benchmarks once we have ~50+ accounts and a consent framework procurement will accept.

**Total: 5/20**
**Weakest loop:** Correction. Highest leverage, easiest to build, captures zero today despite the UI already creating natural correction moments on every click.

## Encroachment Threats

| Attacker | Vector | Time to Threat | Value at Risk |
|----------|--------|----------------|---------------|
| Salesforce / Einstein | Health scoring + churn alerts inside the CRM, no new vendor | 12–18 mo | 60–70% |
| Gainsight / ChurnZero | Already own CS workflow, layering AI on mature data | In market now | 50–60% |
| Gong | Owns call data, expanding into CS workflows | 18–24 mo | 30–40% |

**90-day red team (Salesforce attacks the Correction loop):** They already have 5 years of CSM behavior in the CRM, which is the implicit correction data we're trying to collect from scratch. They ship a "CS Health Summary" card on the Account object, run a beta with customers who are also evaluating us, and convert the Salesforce-native, price-sensitive ones with "same capability, zero new vendor."

**Our defense:** The customers Salesforce can't serve well want transparent reasoning, real human-in-the-loop approval, and cross-system intelligence (Gong + Zendesk + CRM + product analytics in one place). Go deep on those three. The moat isn't the health score, it's the agentic workflow layer their data model was never built for.
