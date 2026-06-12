# Non-Functional Requirements — SuccessOS AI

---

## Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-P1 | Dashboard initial load time | < 2 seconds |
| NFR-P2 | Meeting Intelligence analysis response time | < 8 seconds for notes up to 1,000 words |
| NFR-P3 | Feature Impact results return time | < 5 seconds |
| NFR-P4 | QBR generation time | < 15 seconds |
| NFR-P5 | Account detail page load time | < 1.5 seconds |
| NFR-P6 | Agent Actions queue load time | < 1 second |

---

## Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-R1 | Platform uptime | ≥ 99.5% measured monthly |
| NFR-R2 | AI service availability | ≥ 99.0% (graceful degradation required when unavailable) |
| NFR-R3 | Data integrity | Zero data loss on account data; AI outputs ephemeral by design |
| NFR-R4 | Graceful degradation | Platform remains usable (account views, manual entry) when AI services are down |
| NFR-R5 | Recovery time objective (RTO) | < 1 hour for core platform; < 4 hours for AI services |

---

## Security

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-S1 | Multi-tenant data isolation | No cross-tenant data access; enforced at DB and application layer |
| NFR-S2 | Data encryption | At rest (AES-256); in transit (TLS 1.3+) |
| NFR-S3 | Authentication | SSO via SAML 2.0 / OIDC; MFA required for admin roles |
| NFR-S4 | Access control | RBAC with roles: Admin, CS Director, CSM, Read-Only |
| NFR-S5 | Audit logging | All user actions and AI outputs logged; immutable; retained ≥ 12 months |
| NFR-S6 | Customer data usage | Customer data never used for cross-tenant model training |
| NFR-S7 | LLM call security | Customer data masked before LLM calls where feasible; no PII in LLM prompts |
| NFR-S8 | SOC 2 Type II | Target: achieve before first enterprise contract close |

---

## Scalability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-SC1 | Accounts per tenant | Support up to 500 accounts per tenant without performance degradation |
| NFR-SC2 | Concurrent users | Support 100 concurrent users per tenant |
| NFR-SC3 | Meeting notes processed per day | 1,000+ per tenant |
| NFR-SC4 | Horizontal scaling | Stateless API services; scale independently from AI orchestration layer |

---

## AI Quality

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-AI1 | Churn risk classification | ≥ 0.78 F1 on held-out eval set |
| NFR-AI2 | Meeting summarization quality | ≥ 4.2 / 5 human rater score |
| NFR-AI3 | Hallucination rate | < 3% of outputs contain unverifiable factual claims |
| NFR-AI4 | Confidence calibration | When AI says "High confidence," accuracy should be ≥ 85% |
| NFR-AI5 | Tone quality on customer-facing drafts | Zero outputs with inappropriate tone (aggressive, dismissive, legally risky) |
| NFR-AI6 | Approval policy adherence | 100% — no external action executes without approval |

---

## Accessibility

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-A1 | WCAG compliance | WCAG 2.1 Level AA |
| NFR-A2 | Keyboard navigation | All core workflows accessible via keyboard |
| NFR-A3 | Screen reader support | All meaningful content accessible to screen readers |

---

## Data Governance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-DG1 | Data residency | US, EU options available; configurable per tenant |
| NFR-DG2 | Data retention | Configurable per tenant; default 24 months; hard delete on request |
| NFR-DG3 | GDPR compliance | DSAR fulfillment within 30 days; right to erasure supported |
| NFR-DG4 | Data processing agreements | DPAs available with all sub-processors |
