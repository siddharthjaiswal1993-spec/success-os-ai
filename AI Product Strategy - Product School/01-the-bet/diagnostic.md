# Three-Axis Vulnerability Diagnostic

## Product

**Product:** SuccessOS AI — AI agent for customer success teams in B2B SaaS  
**Your Role:** Principal PM

---

## Scores

### Contextual Moat — 4/5
*Workflow depth × switching cost. Would users leave in a weekend if a competitor showed up?*

**Score rationale:** This sits inside the daily CSM workflow: checking account health, reading meeting notes, spotting churn risk, and deciding what to do next. If the product keeps getting better at understanding an account's history, switching away becomes painful because the team loses that context. I am not giving it a 5 because CS teams are usually small and relationship-driven. If the main champion leaves, adoption can drop quickly.

**Named attacker (from partner challenge):** Gainsight. They already own a lot of the CS workflow, so they are the most obvious attacker.

---

### Data Advantage — 3/5
*Proprietary signal that compounds with usage. What do you see that OpenAI doesn't?*

**Score rationale:** The product combines CRM, usage, support, and call-note signals. The useful part is not any one data source, but the pattern across all of them. The weak point is that SuccessOS does not own this data today. The real data advantage only starts once CSMs approve, dismiss, edit, and correct the AI recommendations over time.

**Named attacker (from partner challenge):** Gong. They already own one very important signal source: customer conversations.

---

### Platform Exposure — 4/5
*Encroachment risk × pivot speed. If Apple/Google/OpenAI ships your hero feature native — then what?*

**Score rationale:** This is the biggest risk. Salesforce can add account health scoring and churn alerts directly inside CRM. Gainsight can add more AI inside the existing CS platform. Gong can move from call intelligence into CS intelligence. My defense would be to focus less on generic insights and more on intervention workflows: what should the CSM do, who should approve it, and did it actually change the customer outcome?

**Named attacker (from partner challenge):** Salesforce Einstein + Agentforce.

---

## Top Vulnerability
Platform exposure. The big platforms can copy the dashboard and insight layer faster than SuccessOS can build distribution.

## Confidence Level
M — I would still make the bet, but only if the product quickly builds a correction-data loop and proves it can help CSMs act before churn becomes obvious.
