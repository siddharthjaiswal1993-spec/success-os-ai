# Compounding System Design — SuccessOS AI

Guardrails for the main AI surfaces: health scoring, churn alerts, meeting intelligence, action recommendations, QBRs, and customer-ready drafts.

## Feedback Loops

| Loop | Input | Output | Compounds? | Status |
|------|-------|--------|-----------|--------|
| CSM correction | Approve, dismiss, edit, override | Better recommendations and confidence calibration | Y | missing |
| Outcome tracking | Renewal, expansion, churn, save-plan result | Better risk and expansion weighting | Y | missing |
| Account context | CRM, usage, tickets, call notes | Better account memory and less generic output | Y | active, but hardcoded |

**Broken loop identified by partner:** A CSM can paste notes from the wrong customer and the system will still generate analysis.

**Fix plan:** Extract company/account names from the notes, compare them with the selected account, warn the user, and store the correction.

## Context Connectivity

Knowledge should flow through one shared account model: CRM fields, usage signals, tickets, meeting notes, health history, and CSM actions. The current prototype connects these pieces in the UI, but it does not persist learning yet.

Main silo risk: meeting notes and edits are treated as one-time inputs. They should become durable account memory with timestamps and source links.

## Governance Policy

**Scope:** internal CS intelligence, recommended actions, customer-ready drafts, QBR briefs, and CRM updates.

**Autonomy boundaries:**
- Auto: health recalculation, tagging, dashboard refresh.
- Soft gate: internal CRM notes and task creation.
- Hard gate: customer emails, AE handoffs, pricing/contract language, and external QBR content.

**Escalation triggers:** confidence <70%, account mismatch, pricing/contract terms, PII, high churn risk, or missing data.

**Audit cadence:** weekly sample review, monthly golden-set rerun, quarterly governance review.

**Regulatory exposure (EU AI Act / other):** Medium. It is mostly decision support, but churn and renewal recommendations can influence commercial decisions, so logs, approval records, and explainability matter.

## Agent Topology

| Agent | Can Do | Cannot Do | Approval |
|------|--------|-----------|----------|
| Signal agent | classify usage, support, sentiment, renewal risk | change customer-facing records alone | none |
| Recommendation agent | suggest save plans, tasks, AE handoffs | execute external actions | CSM for external actions |
| Drafting agent | draft emails, QBRs, follow-ups | send, promise discounts, invent metrics | hard gate |
| Governance agent | flag PII, account mismatch, low confidence | override human approval | auto-block/warn |

## Shadow AI Audit

| Tool | Owner | Risk Level | Decision |
|------|-------|-----------|----------|
| General AI tools for call-note summaries | Individual CSMs | H | govern |
| Spreadsheet health scoring prompts | CS Ops | M | govern |
| Manual QBR deck generation | CSM team | M | keep until replaced |

**Total tools found:** 3 likely categories.

**Tools after triage:** 2 governed, 1 kept temporarily.

**Estimated hidden spend:** Low direct software spend, but high process cost because teams duplicate summaries, create inconsistent QBRs, and make customer-risk decisions without a logged workflow.
