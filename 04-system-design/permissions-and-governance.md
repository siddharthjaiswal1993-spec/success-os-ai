# Permissions and Governance — SuccessOS AI

---

## Role-Based Access Control (RBAC)

| Role | Capabilities |
|------|-------------|
| **Admin** | Full platform configuration; all data access; user management; integration setup; audit log access; agent configuration |
| **CS Director** | Full portfolio view (all CSMs); approve Critical-tier agent actions; view team-level analytics; manage agent mode for team |
| **Customer Success Manager** | Own portfolio accounts only; approve External actions for own accounts; generate QBRs; use Meeting Intelligence; use Feature Impact |
| **Account Manager (Read + Actions)** | Read-only on account data; can approve expansion outreach for own accounts; no access to health score configuration |
| **Product Manager (Read)** | Read-only access to Feature Impact Intelligence; no access to individual account health data |
| **RevOps (Analytics)** | Read-only analytics and reporting; no account detail access |

---

## Data Access Boundaries

| Data Type | Who Can See It |
|-----------|---------------|
| Individual account health scores | Account's CSM + CS Director + Admin |
| Meeting note content | Submitting CSM + CS Director + Admin (note: raw text not stored long-term) |
| Agent action history | Account's CSM + CS Director + Admin |
| QBR content (pre-delivery) | Account's CSM + CS Director + Admin |
| Portfolio-level analytics | CS Director + Admin + RevOps |
| Integration credentials | Admin only |
| Audit log | Admin + CS Director (own team only) |

---

## Tenant Isolation

All data is logically isolated by `tenant_id`:
- Every database query is scoped to the authenticated user's tenant
- No cross-tenant query is possible at the API layer
- Vector DB namespaces are per-tenant
- File storage (QBR exports) is per-tenant with signed URL access
- LLM prompts include only the current tenant's context data

---

## Audit Logging

Every significant action is logged to an immutable audit log:

| Event Type | Fields Logged |
|-----------|---------------|
| User login | user_id, timestamp, IP, auth method |
| AI output generated | agent_id, account_id, output_type, confidence, timestamp |
| Action approved | action_id, approver_id, timestamp, draft content hash |
| Action dismissed | action_id, dismisser_id, reason, timestamp |
| Health score overridden | account_id, previous_score, new_score, user_id, reason, timestamp |
| QBR delivered | qbr_id, account_id, user_id, timestamp |
| Integration sync | integration_type, records_synced, errors, timestamp |
| Admin config changed | changed_field, old_value, new_value, admin_id, timestamp |

Audit log properties:
- Immutable (append-only; no delete or modify)
- Retained minimum 12 months (configurable)
- Exportable by Admin
- Searchable by account, user, action type, date range

---

## Agent Governance

Admins can configure agent behavior per tenant:

| Configuration | Options | Default |
|---------------|---------|---------|
| Agent mode | Supervised (all actions visible before execution) / Verified (internal auto; external approval) / Trusted (low-risk external auto-approved) | Verified |
| External action confidence threshold | 0.50 – 0.90 | 0.70 |
| Per-action-type enable/disable | Each action type individually toggled | All enabled |
| Executive action approver | CSM / CS Director / Any approver | CS Director |
| Auto-escalation for idle actions | 3 days / 7 days / Never | 7 days |

---

## Security Posture

| Control | Status |
|---------|--------|
| Encryption at rest | AES-256 (target: all production data) |
| Encryption in transit | TLS 1.3+ |
| Authentication | SSO/SAML required for enterprise; email + MFA for SMB |
| LLM call security | Customer account names pseudonymized in LLM prompts where feasible |
| Sub-processor agreements | DPAs required with all sub-processors |
| SOC 2 Type II | Target: before first enterprise close |
| Penetration testing | Annual by third-party firm |
| Data residency | US and EU regions (target) |
