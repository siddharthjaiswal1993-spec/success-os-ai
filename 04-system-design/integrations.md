# Integrations — SuccessOS AI

---

## Integration Philosophy

SuccessOS AI is an intelligence layer, not a system of record. Its value compounds with integration depth. A deployment with no integrations still delivers value (meeting intelligence, QBR generation, manual health tracking). A fully integrated deployment unlocks continuous autonomous monitoring and multi-signal health scoring.

Integrations are additive — each one expands the signal picture. None are required for core value delivery.

---

## Integration Map

### CRM (Salesforce / HubSpot)

**What we read:**
- Account records: ARR, renewal date, company details
- Contact records: stakeholder names, titles, email
- Activity history: call logs, email threads, notes
- Opportunity records: renewal opportunity status

**What we write:**
- Activity log: AI-recommended actions taken
- Task creation: coaching tasks, follow-ups
- Health score field (custom): last updated by SuccessOS AI

**Integration method:** Salesforce Connected App (OAuth 2.0) or HubSpot OAuth  
**Sync frequency:** Account data: daily; Activity: real-time webhook

---

### Customer Success Platform (Gainsight / Totango / ChurnZero)

**What we read:**
- Existing health scores (to baseline against AI scores)
- Customer journey stage
- Playbook completion status
- NPS responses

**What we write:**
- AI health score as a supplemental signal
- Agent-recommended playbook triggers (future phase)

**Integration method:** REST API / CSV export (Gainsight v2 API)  
**Note:** SuccessOS AI does not replace these tools; it adds AI intelligence on top

---

### Support (Zendesk / Intercom / Freshdesk)

**What we read:**
- Open ticket count per account
- Ticket severity and status
- Ticket categories and themes
- Time-to-resolution per account

**What we write:**
- Not in scope for MVP (read-only integration)

**Integration method:** Zendesk REST API / Intercom REST API  
**Sync frequency:** Real-time webhook on ticket create/update/close

---

### Call Intelligence (Gong / Chorus / Zoom)

**What we read:**
- Call transcripts (post-call, with account linkage)
- Call summary and topics
- Sentiment signals from call analysis

**What we write:**
- Not in scope for MVP (read-only integration)

**Processing:** Transcripts consumed as text signals; not stored long-term in raw form; only extracted signals persisted  
**Note:** Call intelligence is the highest-signal source for meeting intelligence — transforms the module from paste-based to automatic

---

### Product Analytics (Mixpanel / Amplitude / Pendo / Heap)

**What we read:**
- Feature adoption by account
- Active users per account (DAU/WAU/MAU)
- Feature usage drop events
- Key activation events

**What we write:**
- Not in scope

**Integration method:** API with account-level grouping (requires analytics platform to be configured with account-level tracking)  
**Note:** Product analytics is required for adoption-component health scoring to be automated

---

### Collaboration (Slack / Email)

**Slack:**
- Receive: Not integrated (CSMs continue to use Slack independently)
- Send: Notifications to CS team Slack channel when Critical health events fire (future phase)
- Note: Requires Slack App setup; admin approval per workspace

**Email:**
- Receive: Not integrated in MVP
- Send: Not integrated in MVP — draft emails are generated but sent manually by CSM
- Future phase: Approve-to-send via Gmail or Outlook integration

---

### Identity (Okta / Azure AD / SAML 2.0)

**Purpose:** Enterprise SSO authentication  
**Method:** SAML 2.0 or OIDC  
**Scope:** Login, user provisioning (SCIM), team/role sync  
**Required for:** Any enterprise deal; SOC 2 compliance  

---

## Integration Rollout Strategy

| Phase | Integrations Included |
|-------|----------------------|
| MVP (prototype) | None — all data simulated |
| Phase 1 (pilot) | CRM (Salesforce or HubSpot) + Identity (SAML) |
| Phase 2 | Support (Zendesk) + Product Analytics (one platform) |
| Phase 3 | Call Intelligence (Gong or Chorus) |
| Phase 4 | CS Platform (Gainsight) + Collaboration (Slack) |
