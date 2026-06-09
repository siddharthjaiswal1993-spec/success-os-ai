# SuccessOS AI

> An AI-native Customer Success Intelligence Agent — built as part of the Product School AI Product Strategy course.
> This repo contains the live strategy documentation and a functional React prototype.

---

## What Is This

SuccessOS AI is an autonomous Customer Success Intelligence Agent for enterprise SaaS CS teams. It monitors customer account health, analyzes meeting notes, detects churn risks, identifies expansion opportunities, maps product updates to impacted customers, and recommends next-best actions — with human-in-the-loop approval for all customer-facing workflows.

**Core users:** Customer Success Managers · CS Directors · Account Managers · Revenue Operations

**Core problem:** CS teams manage too many signals across meetings, CRM notes, support tickets, product usage, and renewals. Important churn signals and expansion opportunities get buried in unstructured data and disconnected systems.

**Core value prop:** Turn customer signals into structured intelligence, health insights, recommended workflows, and customer-ready outputs.

---

## Live Prototype

A fully functional React prototype is available in the [`/app`](app/) directory.

**Stack:** React · Vite · Tailwind CSS · Local state (no backend required)

**To run locally:**
```bash
cd app
npm install
npm run dev
```

**Modules built:**

| Module | Description |
|--------|-------------|
| Dashboard | KPI command center — ARR, churn risk, expansion opps, AI insight panel |
| Accounts | 8 enterprise SaaS sample accounts with full detail views and timelines |
| Meeting Intelligence | Paste meeting notes → structured churn/expansion analysis + follow-up email |
| Feature Impact | Enter a feature → customer match table with priority scores and messaging |
| Agent Actions | Human-in-the-loop approval workflow — Approve / Dismiss updates live state |
| QBR Generator | Per-account executive QBR brief with 9 AI-generated sections |
| Settings | Agent mode, confidence threshold, approval toggles, mock integrations |

**Demo flow:**
1. Open Dashboard → review risky accounts and AI insights
2. Go to Meeting Intelligence → paste notes → see churn/expansion analysis
3. Go to Feature Impact → enter "multi-location benchmarking" → see customer matches
4. Go to QBR Generator → select FranchiseWorks → generate executive brief
5. Go to Agent Actions → approve or dismiss recommended workflows

---

## AI Product Strategy

This repo doubles as a living strategy document built across 6 course modules. Each module adds one strategic layer. Status reflects current completion.

| Component | Module | Status | Key Artifact |
|-----------|--------|--------|-------------|
| **The Bet** | M1 | In progress | [`01-the-bet/`](01-the-bet/) |
| **The Moat** | M2 | Complete | [`02-the-moat/`](02-the-moat/) |
| **The Margin** | M3 | In progress | [`03-the-margin/`](03-the-margin/) |
| **The Contract** | M4 | In progress | [`04-the-contract/`](04-the-contract/) |
| **The Guardrails** | M5 | In progress | [`05-the-guardrails/`](05-the-guardrails/) |
| **The Pitch** | M6 | In progress | [`06-the-pitch/`](06-the-pitch/) |

---

## The Bet (M1)

**What we're building, for whom, why now.**

- **Product:** SuccessOS AI — autonomous Customer Success Intelligence Agent
- **AI Value Archetype:** Autonomous Agent (monitors signals, reasons over data, recommends actions, requests human approval)
- **Vulnerability Scores:** Moat __/5 · Data __/5 · Platform __/5
- **Top Risk:** Established CS platforms (Gainsight, ChurnZero) adding AI layers on top of mature data models
- **Confidence:** M
- **Prototype:** [`/app`](app/) — run locally with `cd app && npm run dev`
- **Kill Criteria:** If Salesforce Einstein ships native CS health scoring with agentic workflow support before we reach 10 paying customers

→ Details: [`01-the-bet/`](01-the-bet/)

---

## The Moat (M2)

**Why this won't get copied in 6 months.**

- **Data Flywheel Score:** 5/20 (ground zero — honest assessment)
- **Weakest Loop:** Correction — Approve/Dismiss signals exist in the UI but capture zero data today
- **Competitive Position:** Workflow depth and transparent AI reasoning vs. Gainsight (data depth) vs. Salesforce (distribution)
- **Encroachment Defense:** Human-in-the-loop approval design, CS domain signal model, correction loop data (to be built)
- **Vendor Portability:** Locked (ground zero — no abstraction layer, single LLM provider dependency)

→ Details: [`02-the-moat/`](02-the-moat/)

---

## The Margin (M3)

**Will this make money or bleed it?**

- **Gross Margin (current):** —
- **Gross Margin (AI-adjusted):** —
- **Pricing Model:** —
- **Cascading Strategy:** —
- **Break-even at:** —

→ Details: [`03-the-margin/`](03-the-margin/)

---

## The Contract (M4)

**Why users will trust a probabilistic system.**

- **Reliability Target:** —
- **Golden Dataset:** —
- **Confidence UX:** Confidence score bars displayed on every agent action
- **HITL Architecture:** External actions require explicit approval; internal actions flagged as autonomous
- **Failure Mode Coverage:** —

→ Details: [`04-the-contract/`](04-the-contract/)

---

## The Guardrails (M5)

**What breaks when this scales — and what compounds.**

- **Compounding System:** —
- **Governance Posture:** —
- **Shadow AI Status:** —
- **Agent Boundaries:** —
- **Regulatory Exposure:** —

→ Details: [`05-the-guardrails/`](05-the-guardrails/)

---

## The Pitch (M6)

**How you get this funded, shipped, and adopted.**

- **Horizon 1 (Now):** —
- **Horizon 2 (Next):** —
- **Horizon 3 (Bet):** —
- **Board Narrative:** —
- **Key Metric:** —

→ Details: [`06-the-pitch/`](06-the-pitch/)

---

## Portfolio Context

This project demonstrates:

- Agentic workflow design with human-in-the-loop approval
- AI reasoning transparency (confidence scores, signal attribution)
- Churn detection and expansion intelligence
- Feature-to-customer impact mapping
- Customer account memory and health modeling
- AI-native product design for Customer Success teams
- Honest AI product strategy: flywheel scoring, vendor lock-in audit, competitive encroachment modeling

Built for the Product School AI Product Strategy course. Intended as a portfolio artifact for Staff / Principal AI Product Manager roles.
