# Workflow Orchestration — SuccessOS AI

---

## Orchestration Model

SuccessOS AI uses an **event-driven agent orchestration** model. Agent runs are triggered by events (new signal, scheduled refresh, user request) and follow a defined workflow graph.

The orchestration layer handles:
- Agent scheduling and triggering
- Context assembly for each agent run
- LLM prompt construction and API calls
- Output validation and schema enforcement
- Confidence scoring
- Action routing (auto-execute vs. approval queue)
- Outcome capture and feedback logging

---

## Event Taxonomy

| Event | Trigger | Agent Activated |
|-------|---------|----------------|
| Meeting notes submitted | User action | Meeting Intelligence Agent |
| Feature description submitted | User action | Feature Impact Agent |
| QBR generation requested | User action | QBR Generation Agent |
| Daily health refresh | Scheduled (daily 6am) | Account Health Monitor Agent |
| New support ticket received | Integration webhook | Account Health Monitor (support sub-routine) |
| Usage data sync completed | Integration scheduled | Account Health Monitor (adoption sub-routine) |
| Renewal date within 90 days | Scheduled check | Renewal Risk Agent |
| Health score drops >10 points | Agent output event | Renewal Risk Agent + Action Service |
| Action approved | User action | Outcome capture + feedback loop |
| Action dismissed | User action | Outcome capture + feedback loop |

---

## Workflow Execution Pattern

Each agent workflow follows this execution pattern:

```
1. TRIGGER → Agent scheduler receives event

2. CONTEXT ASSEMBLY
   - Load account profile from Account Service
   - Load recent signals (last 90 days) from AccountSignal store
   - Load active risks and expansion signals
   - Load prior AI recommendations (last 30 days)
   - Construct structured context block

3. PROMPT CONSTRUCTION
   - Select prompt template for this agent + task type
   - Inject context block into template
   - Add instruction-level constraints (format, length, tone)

4. LLM CALL
   - Call primary LLM (GPT-4o)
   - If timeout or error: retry once, then fall back to Claude
   - If both fail: log incident; return graceful degradation response

5. OUTPUT PARSING
   - Parse structured JSON from LLM response
   - Validate against output schema (required fields, type checks)
   - If validation fails: log error; return partial result with quality flag

6. CONFIDENCE SCORING
   - Score confidence based on: signal count, signal recency, schema completeness
   - Calibrate against historical accuracy for this agent type
   - Assign final confidence tier (High / Medium / Low)

7. ACTION ROUTING
   - For each output action:
     - If Internal AND confidence ≥ threshold: auto-execute
     - If External OR confidence < threshold: route to approval queue
   - Write action to AgentAction store

8. OUTCOME LOGGING
   - Log all inputs, outputs, confidence scores to audit log
   - Record LLM cost for cost monitoring
```

---

## Prompt Management

| Practice | Implementation |
|----------|---------------|
| Prompt versioning | All prompt templates versioned (v1.0, v1.1, etc.) |
| A/B testing | New prompt versions tested on 20% traffic before full rollout |
| Rollback | Previous version restoreable in < 5 minutes if quality drops |
| Per-agent templates | Each agent has separate prompt file; no shared prompts |
| Context window management | Context blocks are compressed to fit within LLM context limits; least-recent signals dropped first |

---

## Failure Handling

| Failure Type | Response |
|-------------|---------|
| LLM API timeout (>10s) | Retry once; if second attempt fails, return cached result if available; otherwise return graceful error |
| Malformed LLM output | Re-prompt once with "return only valid JSON" instruction; if still malformed, return partial result with flag |
| Context assembly failure (account data unavailable) | Proceed with available data; flag missing context in output |
| Confidence below threshold | Do not auto-execute any actions; surface to approval queue with Low confidence flag |
| All LLM providers unavailable | Queue agent runs for retry; notify admin; UI shows degraded mode banner |

---

## Prototype Implementation Note

In the `/app` prototype, workflow orchestration is simulated:

- Meeting Intelligence uses keyword detection (churn/expansion signal words) to generate mock structured outputs
- Feature Impact uses hardcoded matching rules (multi-location → specific accounts)
- QBR generation uses account context from static mock data to produce templated sections
- Health scores are pre-computed in mock data; no real agent runs execute in the prototype

This is intentional. The prototype demonstrates the UX, workflow design, and output quality concept. Production implementation would replace simulation with the orchestration architecture described here.
