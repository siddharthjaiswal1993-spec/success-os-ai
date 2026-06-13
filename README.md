# SuccessOS AI

> An AI-native Customer Success Intelligence Agent — original product strategy, working prototype, and AI architecture built from first principles.
> This repo contains the full strategy documentation and a functional React prototype.

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

**Early prototype (Lovable):** https://agent-success-os.lovable.app

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

## Product Strategy Framework

This repo documents the full product strategy across six interconnected frameworks.

| Component | Status | Key Artifact |
|-----------|--------|-------------|
| **The Bet** | ✅ Complete | [`AI Product Strategy - Product School/01-the-bet/`](AI%20Product%20Strategy%20-%20Product%20School/01-the-bet/) |
| **The Moat** | ✅ Complete | [`AI Product Strategy - Product School/02-the-moat/`](AI%20Product%20Strategy%20-%20Product%20School/02-the-moat/) |
| **The Margin** | ✅ Complete | [`AI Product Strategy - Product School/03-the-margin/`](AI%20Product%20Strategy%20-%20Product%20School/03-the-margin/) |
| **The Contract** | In Progress | [`AI Product Strategy - Product School/04-the-contract/`](AI%20Product%20Strategy%20-%20Product%20School/04-the-contract/) |
| **The Guardrails** | In Progress | [`AI Product Strategy - Product School/05-the-guardrails/`](AI%20Product%20Strategy%20-%20Product%20School/05-the-guardrails/) |
| **The Pitch** | In Progress | [`AI Product Strategy - Product School/06-the-pitch/`](AI%20Product%20Strategy%20-%20Product%20School/06-the-pitch/) |

---

## The Bet ✅

**What we're building, for whom, why now.**

- **Product:** SuccessOS AI — AI-powered autonomous Customer Success Intelligence Agent for enterprise SaaS companies
- **AI Value Archetype:** Orchestrator — the agent prioritizes actions across accounts, generates save plans, flags stakeholder changes, and drives the CSM's next move autonomously
- **Vulnerability Scores:** Moat 4/5 · Data 3/5 · Platform 4/5
- **Top Risk:** Platform exposure — Gainsight, Salesforce (Einstein + Agentforce), and Gong can each ship a version of CS intelligence natively within their existing workflows and data ownership before SuccessOS AI reaches scale
- **Confidence:** M — defensible if deep workflow integration and cross-customer predictive advantage are established within 12–18 months before incumbents close the AI gap
- **Prototype:** [agent-success-os.lovable.app](https://agent-success-os.lovable.app) · React build in [`/app`](app/)
- **Kill Criteria:**
  - Gainsight or Salesforce ships native AI CS intelligence with comparable depth before reaching 20+ enterprise accounts
  - CSMs consistently ignore AI-recommended actions (trust gap too large to close)
  - Cross-customer pattern data after 12 months shows no meaningful improvement in churn prediction over baseline CRM signals alone
  - Enterprise procurement cycles exceed 9 months on average, making CAC unrecoverable at any realistic ACV

→ Details: [`01-the-bet/`](01-the-bet/)

---

## The Moat ✅

**Why this won't get copied in 6 months.**

- **Data Flywheel Score:** 5/20 (ground zero — honest assessment)
- **Weakest Loop:** Correction — Approve/Dismiss signals exist in the UI but capture zero persistent data today
- **Competitive Position:** Workflow depth and transparent AI reasoning vs. Gainsight (data depth) vs. Salesforce (distribution)
- **Encroachment Defense:** Human-in-the-loop approval design, CS domain signal model, correction loop data (to be built); defensible response is going deeper on autonomous execution and cross-platform intelligence that no single incumbent can replicate
- **Vendor Portability:** Locked (ground zero — no abstraction layer, single LLM provider dependency; path to Partial requires a thin wrapper and at least one alternative provider tested)

→ Details: [`02-the-moat/`](02-the-moat/)

---

## The Margin — In Progress

**Will this make money or bleed it?**

- **Gross Margin (current):** —
- **Gross Margin (AI-adjusted):** —
- **Pricing Model:** —
- **Cascading Strategy:** —
- **Break-even at:** —

→ Details: [`03-the-margin/`](03-the-margin/)

---

## The Contract — In Progress

**Why users will trust a probabilistic system.**

- **Reliability Target:** —
- **Golden Dataset:** —
- **Confidence UX:** —
- **HITL Architecture:** —
- **Failure Mode Coverage:** —

→ Details: [`04-the-contract/`](04-the-contract/)

---

## The Guardrails — In Progress

**What breaks when this scales — and what compounds.**

- **Compounding System:** —
- **Governance Posture:** —
- **Shadow AI Status:** —
- **Agent Boundaries:** —
- **Regulatory Exposure:** —

→ Details: [`05-the-guardrails/`](05-the-guardrails/)

---

## The Pitch — In Progress

**How you get this funded, shipped, and adopted.**

- **Horizon 1 (Now):** —
- **Horizon 2 (Next):** —
- **Horizon 3 (Bet):** —
- **Board Narrative:** —
- **Key Metric:** —

→ Details: [`06-the-pitch/`](06-the-pitch/)

---

## What I Built

| Artifact | Description |
|---|---|
| React prototype | Functional prototype in `/app` — React + Vite + Tailwind, all major platform surfaces including health dashboard, meeting intelligence, churn alerts, and expansion recommendations |
| Full strategy package | Vision, product strategy, agent architecture, HITL design, churn detection model, and expansion intelligence docs |
| Standard portfolio docs | PORTFOLIO_AUDIT, PRODUCT_THESIS, WHAT_I_BUILT, OUTCOME_MODEL, AI_PRODUCT_JUDGMENT |

---

## Portfolio Context

This project demonstrates:

- Agentic workflow design with human-in-the-loop approval
- AI reasoning transparency (confidence scores, signal attribution)
- Churn detection and expansion intelligence
- Feature-to-customer impact mapping
- Customer account memory and health modeling
- Honest AI product strategy: vulnerability scoring, flywheel assessment, vendor lock-in audit, competitive encroachment modeling
- AI-native product design for Customer Success teams

Independent product exploration. Uses synthetic examples, mock data, and public category-level assumptions.
