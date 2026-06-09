# Kill Switch Audit — SuccessOS AI

> Assessed at ground zero (pre-build). Primary vendor assumed: OpenAI (GPT-4o) — the default choice for most AI product builders today.
> Honest framing: at ground zero, almost every AI-native startup is locked. The question is whether you design toward portability from day one or discover the lock-in during a pricing negotiation.

---

## Vendor Dependency Assessment

| Dimension | Current State | Risk Level | 48-Hour Action |
|-----------|--------------|------------|----------------|
| **Provider** | Single provider (OpenAI GPT-4o). No fallback model configured. All LLM calls go to one endpoint. | High | None — no fallback exists. A pricing change or outage stops the product cold. |
| **Abstraction** | No abstraction layer. At ground zero the prototype has no backend — LLM calls would be direct API calls hardcoded to one provider's SDK. Switching providers means rewriting every prompt call. | High | Document all LLM call sites before writing more code. That list becomes the migration checklist if you ever need it. |
| **Routing** | No routing logic. Every task — churn risk scoring, meeting summarization, QBR generation, action recommendations — hits the same model regardless of complexity or cost. A simple sentiment label costs the same as a full QBR brief. | Medium | Categorize tasks by complexity now. Simple classification tasks are candidates for a cheaper or local model later. |
| **Eval** | No evaluation framework exists. There is no baseline, no golden test set, no way to detect if a model update degrades churn prediction accuracy or QBR quality. If OpenAI silently changes GPT-4o behavior, you will not know until a CSM complains. | High | Define 10 example inputs and expected outputs for each module now, before you build. These become your eval set. |

---

## Portability Score: **Locked**

At ground zero, SuccessOS AI is fully locked to its primary LLM vendor. There is no abstraction layer, no provider-agnostic interface, no routing logic, and no evaluation framework to measure the cost of switching. This is the normal starting point for an AI-native prototype — but it becomes a serious commercial risk the moment a customer's procurement team asks "what happens if OpenAI raises prices or gets acquired?"

The path from Locked → Partial → Ready looks like this:

- **Locked (now):** Direct API calls, single provider, no evals, no fallback
- **Partial (3–6 months):** LLM abstraction layer in place (e.g. LiteLLM or a thin internal wrapper), eval set defined for 2–3 core modules, at least one alternative provider tested
- **Ready (12+ months):** Multi-provider routing live, task-level model selection by cost/latency/quality, continuous eval pipeline running in CI, documented runbook for switching primary provider in under 48 hours

---

## If OpenAI doubles pricing tomorrow:

**Immediate reality:** The product cannot function without absorbing the full cost increase or shutting off LLM-dependent features. There is no lever to pull because there is no abstraction layer and no alternative provider configured.

**48-hour response (honest):** Nothing productive happens in 48 hours at ground zero. You would spend those 48 hours assessing which features are most LLM-dependent and which can be temporarily rule-based — not actually switching anything.

**What you should build before this matters:**
1. A single internal wrapper function that all LLM calls go through — even if it only supports one provider at first. The interface is the investment; adding providers later is cheap once the interface exists.
2. Task classification by cost tier. Meeting summarization and QBR generation are high-value, high-cost tasks worth paying full price for. Churn risk scoring from structured account data is a classification task that a cheaper model or even a fine-tuned smaller model could handle at a fraction of the cost.
3. Cost monitoring from day one. Know your per-account LLM cost before you sign your first enterprise customer. Gross margin math depends on it. (See Module 3 — The Margin.)

**Realistic 48-hour response once you have an abstraction layer:**
Reroute Meeting Intelligence and QBR generation to Anthropic Claude (comparable quality, separate pricing). Reroute churn risk scoring and action recommendations to a cheaper model (GPT-4o-mini or Claude Haiku). Full switch of all modules: 2–4 weeks of prompt re-validation.

---

## If OpenAI ships a competing CS Intelligence product:

**How likely is this?** Medium likelihood, long timeline. OpenAI's current motion is horizontal platform (ChatGPT Enterprise, API) not vertical SaaS. But their Operator program and GPT Actions point toward workflow automation that overlaps with Agent Actions and Meeting Intelligence. A partnership with Salesforce or Gainsight using OpenAI models underneath is the more realistic near-term threat than OpenAI building a CS product directly.

**What they can replicate immediately:**
- Meeting note summarization and sentiment detection — this is a commodity LLM task
- Churn risk classification from structured data — straightforward with any capable model
- QBR draft generation — prompt engineering, not a moat

**What is defensible that they cannot replicate:**
- **The workflow layer.** The human-in-the-loop approval design, the distinction between internal and external actions, the confidence-threshold system — these are product design decisions, not model capabilities. OpenAI does not build workflow products.
- **The CS domain model.** The structured account data schema, the signal taxonomy (adoption trend + ticket count + sentiment + renewal proximity + ARR), and the way those signals are weighted is institutional knowledge about Customer Success work that has to be built and validated with real CSMs. A generic LLM product does not have it.
- **Customer data and correction signals.** If you have been collecting approved/dismissed action data for 18 months, you have labeled training data that no new entrant can replicate quickly. This is why building the Correction loop (see data-flywheel.md) from day one matters — it is the asset that makes switching to SuccessOS AI's trained model meaningful.
- **Trust with CS teams.** Enterprise CS leaders do not adopt new AI tools casually. The relationships, the implementation track record, and the CS-specific vocabulary built into the product are defensible in ways that a generic AI feature is not.

**The honest conclusion:** At ground zero, almost nothing is defensible against a well-resourced competitor who decides to enter this space. The moat is built over 12–24 months through the flywheel loops, the workflow depth, and the customer relationships — not through the prototype. The kill switch audit is most useful as a design prompt: build toward portability and data ownership from the first line of production code, not as an afterthought.
