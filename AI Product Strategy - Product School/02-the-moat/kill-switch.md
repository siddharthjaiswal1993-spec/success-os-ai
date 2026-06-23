# Kill Switch Audit — SuccessOS AI

Assumption: the first version depends on one primary LLM provider. For a prototype, that is fine. The risk starts when every important workflow depends on the same provider with no fallback.

## Vendor Dependency Assessment

| Dimension | Current State | Risk Level | 48-Hour Action |
|-----------|---------------|------------|----------------|
| **Provider** | Single primary provider; no fallback | H | Pause new AI surfaces and test one backup provider on meeting notes + QBR prompts |
| **Abstraction** | No wrapper; calls are tied to one SDK | H | Put all LLM calls behind one simple wrapper |
| **Routing** | No routing by task complexity | M | Separate cheap triage tasks from deeper reasoning tasks |
| **Eval** | No baseline eval set yet | H | Create a 20-row test set for churn, QBRs, and customer-facing drafts |

## Portability Score

Locked. This is acceptable for a prototype, but not for a product sold to enterprise CS teams. There is no fallback, no routing, and no eval set to check whether another model performs well enough.

Path out:
- **Now → Partial (3–6 mo):** one wrapper, one alternative model tested, and evals for 2–3 core workflows.
- **Partial → Ready (12+ mo):** multi-provider routing, task-level model choice, evals in CI, and a documented switch plan.

## If primary vendor doubles pricing tomorrow:

In the current prototype, there is no clean 48-hour fix because there is no abstraction layer. The practical response is to first add a wrapper, then move lower-risk tasks like signal classification and health scoring to a cheaper model.

Once that exists, the likely split is: QBR and meeting intelligence on a stronger model, churn scoring and triage on a cheaper model, with evals run before any switch.

## If primary vendor ships a competing CS product:

A model provider can copy the generic AI tasks: summarizing notes, classifying churn risk, drafting emails, and generating QBR sections.

The defensible parts are not model features. They are the CS workflow design, the approval model, the signal taxonomy, the account context, and the correction data collected from real CSM decisions.
