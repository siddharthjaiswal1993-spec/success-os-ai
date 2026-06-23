# Kill Switch Audit — SuccessOS AI

Assessed at ground zero. Assumed primary vendor: OpenAI (GPT-4o). At this stage almost every AI startup is locked in. The real question is whether you design for portability now or find out during a pricing negotiation.

## Vendor Dependency Assessment

| Dimension | Current State | Risk Level | 48-Hour Action |
|-----------|---------------|------------|----------------|
| **Provider** | Single provider: OpenAI; no fallback configured | H | Freeze new AI surface expansion and test Claude on meeting intelligence + QBR prompts |
| **Abstraction** | None. Direct API calls hardcoded to one SDK | H | Create one thin LLM wrapper all calls must go through |
| **Routing** | None. Every task hits the same model regardless of complexity | M | Separate cheap triage tasks from frontier reasoning tasks |
| **Eval** | No baseline, no golden set, no way to catch quality drift | H | Build a 20-row smoke-test set for churn, QBR, and customer-facing drafts |

## Portability Score

Locked. No abstraction, no routing, no evals, no fallback. Normal for a prototype, but it becomes a real risk the moment procurement asks "what happens if OpenAI raises prices or gets acquired?"

Path out:
- **Now → Partial (3–6 mo):** one wrapper all LLM calls go through, an eval set for 2–3 core modules, one alternative provider tested.
- **Partial → Ready (12+ mo):** multi-provider routing, task-level model selection, eval running in CI, and a documented <48hr switch runbook.

## If OpenAI doubles pricing tomorrow:

Honestly, nothing useful happens in 48 hours today, because there's no abstraction layer to reroute through. What to build before it matters: (1) one wrapper function every call goes through, (2) task tiering so cheap tasks like churn scoring can move to a smaller model, (3) per-account cost monitoring from day one.

Once the wrapper exists, the real response is: reroute meeting intelligence and QBRs to Claude, churn scoring to a cheaper model, and re-validate prompts over 2–4 weeks.

## If OpenAI ships a competing CS product:

Medium likelihood, long timeline. Their motion is horizontal (API, ChatGPT Enterprise), not vertical SaaS. A Salesforce or Gainsight partnership running OpenAI underneath is the more realistic near-term threat.

What they could copy fast: note summarization, churn classification, QBR drafts. All commodity LLM tasks.

What's defensible: the workflow layer (HITL approval, internal vs. external actions), the CS domain model (the signal taxonomy and how it's weighted), and 18 months of labeled correction data a new entrant can't backfill. None of that is a model capability, so a generic LLM product doesn't get it for free.
