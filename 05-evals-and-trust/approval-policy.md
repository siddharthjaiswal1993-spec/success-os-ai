# Approval Policy — SuccessOS AI

---

## Policy Statement

**No customer-facing communication is generated or delivered by SuccessOS AI without explicit human approval.** This is a non-negotiable product invariant, not a configurable option.

---

## Scope

This policy applies to all outputs that:
1. Will be sent to, or visible by, a customer
2. Reference commitments, timelines, pricing, or product roadmap
3. Reference account-specific risk assessments in a customer-visible format
4. Are delivered on behalf of the company to a customer stakeholder

---

## Approval Classification Table

| Action Type | Classification | Approver Required | Auto-Execute Eligible |
|-------------|---------------|------------------|----------------------|
| Update account health score | Internal | None | Yes (≥ Medium confidence) |
| Add risk flag to account timeline | Internal | None | Yes |
| Log expansion signal | Internal | None | Yes |
| Generate QBR draft | Internal | None (draft only; delivery is external) | Yes |
| Create coaching task for CSM | Internal | None | Yes |
| Notify CS Director (internal escalation) | Internal | None | Yes |
| Draft follow-up email to customer | External | CSM | No — always approval required |
| Send meeting recap to customer | External | CSM | No |
| Schedule executive check-in (invitation to customer) | External | CSM + CS Director (if Critical risk) | No |
| Launch expansion outreach to customer | External | CSM | No |
| Deliver QBR to customer | External | CSM | No |
| Renewal discussion message to customer | External | CSM + CS Director | No |
| Customer escalation communication | External | CS Director | No |

---

## Approval Workflow Requirements

For any External action pending approval:

1. **Preview shown in full** — CSM must see the exact content that would be delivered to the customer. No hidden content, no "see full message" collapse by default.

2. **Evidence visible** — The reasoning behind the recommendation is shown alongside the draft. CSM is not approving blindly.

3. **Edit before approve** — CSM must be able to edit any draft before approving. Approving a draft without changes is a valid flow, but edits are always available.

4. **Explicit approval action** — A single "Approve" button click with a confirmation step for Critical-tier actions. No automatic approval by timeout.

5. **Dismissal equally accessible** — Dismiss button is equal prominence to Approve. No dark-pattern design that makes dismissal harder.

6. **Reason required for dismissal** — CSM must select a reason from the predefined list before dismissing. Free-text "other" is available.

---

## Escalation Policy

When an External action is pending and no response is received:

| Time Elapsed | Action |
|-------------|--------|
| 3 days | Reminder notification to assigned CSM |
| 7 days | Escalation notification to CS Director |
| 14 days | Action marked "Expired — no response"; logged; no execution |

---

## Policy Enforcement

This policy is enforced at:

1. **Agent workflow layer** — The action routing logic classifies all outputs as Internal or External before any execution
2. **API layer** — External action endpoints require an `approved_by` field with a valid user ID before accepting an execute request
3. **Audit log** — All External action executions are logged with approver ID; any External action executed without a valid approver triggers an alert
4. **Weekly compliance check** — Automated check runs weekly to verify zero External actions executed without approval; report sent to Admin

---

## Exceptions

There are no exceptions to this policy for customer-facing communications.

For future phases, the policy may be extended to allow opt-in auto-approval of specific low-risk notification types (e.g., product update announcements that customers have subscribed to). Any such extension requires:
- Admin opt-in configuration
- Message type pre-approved by CS Director
- Confidence threshold ≥ 0.90
- Volume limit (no more than 1 automated message per customer per month)
- Opt-out available to customers
