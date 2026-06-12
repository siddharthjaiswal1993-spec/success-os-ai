# Product Architecture — SuccessOS AI

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  React / Vite / Tailwind CSS                            │
│  Dashboard · Accounts · Meeting Intel · Feature Impact  │
│  QBR Generator · Agent Actions · Settings              │
└────────────────────────┬────────────────────────────────┘
                         │ REST / WebSocket
┌────────────────────────▼────────────────────────────────┐
│                    API GATEWAY                          │
│  Auth (JWT / SAML) · Rate Limiting · Routing            │
└──────┬──────────────────────────────────────────────────┘
       │
┌──────▼─────────────────────────────────────────────────┐
│                  DOMAIN SERVICES                        │
├─────────────┬──────────────┬──────────────┬────────────┤
│  Account    │  Meeting     │  Action      │  QBR       │
│  Service    │  Intel Svc   │  Service     │  Service   │
└─────────────┴──────────────┴──────────────┴────────────┘
       │                │               │
┌──────▼────────────────▼───────────────▼────────────────┐
│               AI ORCHESTRATION LAYER                    │
│  Agent Scheduler · Prompt Manager · Context Assembler   │
│  Output Validator · Confidence Scorer · Audit Logger    │
├─────────────┬──────────────┬──────────────┬────────────┤
│  Health     │  Meeting     │  Feature     │  QBR       │
│  Monitor    │  Intel Agent │  Impact Agent│  Agent     │
│  Agent      │              │              │            │
└─────────────┴──────────────┴──────────────┴────────────┘
       │                │               │
┌──────▼────────────────▼───────────────▼────────────────┐
│                  LLM PROVIDER                           │
│  OpenAI GPT-4o (primary) · Anthropic Claude (fallback) │
└────────────────────────────────────────────────────────┘
       │
┌──────▼────────────────────────────────────────────────┐
│                  DATA LAYER                            │
├──────────────┬───────────────┬────────────────────────┤
│  PostgreSQL  │  Vector DB    │  Object Storage        │
│  (accounts,  │  (embeddings  │  (QBR exports,         │
│  signals,    │  for context  │  meeting note          │
│  actions,    │  retrieval)   │  archive)              │
│  audit log)  │               │                        │
└──────────────┴───────────────┴────────────────────────┘
       │
┌──────▼────────────────────────────────────────────────┐
│                INTEGRATIONS                            │
│  CRM (Salesforce/HubSpot) · Call Intel (Gong/Zoom)    │
│  Support (Zendesk/Intercom) · Usage (Mixpanel/Pendo)  │
│  Collaboration (Slack/Email) · Identity (Okta/SAML)   │
└──────────────────────────────────────────────────────┘
```

---

## Service Descriptions

### Account Service
Manages the core account entity: profile, health scores, timeline, risk flags, expansion signals. Receives updates from integrations and from AI agent outputs. Serves the account detail views and portfolio dashboard.

### Meeting Intelligence Service
Receives meeting note text submissions. Assembles account context. Routes to Meeting Intel Agent. Returns structured analysis. Handles draft email management and approval state.

### Action Service
Manages the Agent Actions queue. Receives recommended actions from agents. Routes to appropriate approvers based on action type and risk classification. Logs all approvals and dismissals. Publishes outcome signals for feedback loop.

### QBR Service
Manages QBR generation requests. Assembles full account context package. Routes to QBR Agent. Returns structured QBR draft. Manages draft state (generated → reviewed → approved → delivered).

### AI Orchestration Layer
Schedules agent runs, manages prompt versions, assembles context, validates outputs, calibrates confidence scores, and logs all AI activity to the audit log.

---

## Prototype vs. Production

The prototype (in `/app`) simulates this architecture entirely on the frontend:

| Component | Prototype | Production |
|-----------|-----------|-----------|
| AI calls | Simulated with keyword logic + static responses | Real LLM API calls (OpenAI / Anthropic) |
| Account data | Static JSON mock data | PostgreSQL with CRM sync |
| Agent workflows | Frontend state management | Backend orchestration (LangGraph or equivalent) |
| Approval queue | Local React state | Persistent DB with notifications |
| Integrations | Not implemented | REST / webhook integrations per platform |
| Auth | Not implemented | SAML 2.0 / OIDC |

---

## Technology Stack (Production Target)

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| API | Node.js / FastAPI |
| AI Orchestration | LangGraph / CrewAI (or equivalent) |
| Primary LLM | OpenAI GPT-4o |
| Fallback LLM | Anthropic Claude |
| Database | PostgreSQL (RDS) |
| Vector DB | Pinecone / Weaviate |
| Auth | Auth0 / Okta (SAML) |
| Infrastructure | AWS (ECS / RDS / S3) or GCP |
| Monitoring | Datadog / Grafana |
