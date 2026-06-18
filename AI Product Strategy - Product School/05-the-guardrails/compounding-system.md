# Compounding System Design — SuccessOS AI

Guardrails for the core AI surfaces: health scoring, churn alerts, meeting intelligence, action recommendations, QBRs, and customer-ready drafts.

## Feedback Loops

| Loop | Input | Output | Compounds? | Status |
|------|-------|--------|-----------|--------|
| CSM correction | Approve, dismiss, edit, threshold override | Better recommendations and confidence calibration | Y | missing |
| Outcome tracking | Renewal, expansion, churn, save-plan result | More accurate risk and expansion weighting | Y | missing |
| Account context | CRM, product usage, support tickets, call notes | Stronger account memory and fewer generic outputs | Y | active, but hardcoded |

**Broken loop identified by partner:** pasted notes can belong to the wrong account, and the system still produces analysis.

**Fix plan:** extract account/company names from notes, warn on mismatch, log the correction, and add it to the golden dataset.

## Context Connectivity

Knowledge flows through a shared account model: CRM fields, usage signals, support tickets, meeting notes, health history, and CSM actions. The current prototype connects modules structurally, but not persistently.

Main silo risk: meeting notes and CSM edits are treated as one-time inputs. They should become durable account memory, with source links and timestamps.

## Governance Policy

**Scope:** internal CS intelligence, recommended workflows, draft customer communication, QBR briefs, and CRM updates.

**Autonomy boundaries:**
- Auto: health recalculation, risk tagging, dashboard refresh.
- Soft gate: internal CRM notes and task creation.
- Hard gate: customer emails, AE handoffs, pricing/contract language, and external QBR content.

**Escalation triggers:** confidence <70%, account mismatch, pricing/contract terms, PII, high-risk churn account, or unsupported data.

**Audit cadence:** weekly output sample review; monthly golden-set rerun; quarterly governance review.

**Regulatory exposure (EU AI Act / other):** medium. Mostly decision-support, but renewal/churn recommendations can influence commercial outcomes, so audit logs, explainability, approval records, and data minimization are required.

## Agent Topology

| Agent | Can Do | Cannot Do | Approval |
|------|--------|-----------|----------|
| Signal agent | classify usage, support, sentiment, renewal risk | change customer-facing records alone | none |
| Recommendation agent | propose save plans, tasks, AE handoffs | execute external actions | CSM for external |
| Drafting agent | draft emails, QBRs, follow-ups | send, promise discounts, invent metrics | hard gate |
| Governance agent | flag PII, account mismatch, low confidence | override human approval | auto-block/warn |

## Shadow AI Audit

| Tool | Owner | Risk Level | Decision |
|------|-------|-----------|----------|
| ChatGPT / Claude for call-note summaries | Individual CSMs | H | govern |
| Spreadsheet health scoring prompts | CS Ops | M | govern |
| Manual QBR deck generation | CSM team | M | keep until replaced |

**Total tools found:** 3 likely categories in the current workflow.

**Tools after triage:** 2 governed, 1 kept temporarily.

**Estimated hidden spend:** low direct spend, high process cost from duplicated summaries, inconsistent QBRs, and unlogged customer-risk decisions.
