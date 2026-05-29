---
goal: Add ManageUser bulk user creation page (SCRUM-7)
version: 1.0
date_created: 2026-05-29
last_updated: 2026-05-29
owner: Frontend
status: Planned
tags: [feature, frontend, manageuser]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan delivers a new ManageUser bulk user creation page, route, and UI flow consistent with existing Create and List pages, including offline-disabled behavior and submission feedback.

## 1. Requirements & Constraints

- **REQ-001**: Add a new route for bulk creation under ManageUser (target path: `/shared/user/bulk`) in `src/routers/index.ts`.
- **REQ-002**: Create a new page `Bulk.Page.vue` under `src/features/ManageUser/pages/` using the existing page layout patterns (Toolbar, Card, padding) from `Create.Page.vue` and `List.Page.vue`.
- **REQ-003**: Support bulk input via CSV upload and/or multiline paste input with client-side validation and error display.
- **REQ-004**: On successful submission, show success status and navigate back to list page; on failure, show failure status without navigation.
- **REQ-005**: Disable submit actions when offline, mirroring logic from `Create.Page.vue`.
- **SEC-001**: Do not persist bulk input data to local storage or other client persistence.
- **CON-001**: Use Vue 3 Composition API with `<script setup lang="ts">` per Vue skill docs (`/.github/skills/vue/SKILL.md`).
- **CON-002**: Keep styling consistent with existing ManageUser pages; no new global styles.
- **GUD-001**: Reuse existing shared components (`src/shared/components/Button.vue`) and patterns in ManageUser features when possible.
- **PAT-001**: Follow existing query and API patterns in `src/shared/api/` and `src/features/ManageUser/queries/` when wiring submission.
- **BCK-001**: Backend skill references are pending definition; avoid backend changes in this plan.

## 2. Implementation Steps

### Implementation Phase 1

- GOAL-001: Define the new bulk user creation page UI and route wiring.

| Task     | Description                                                                                                                                                                   | Completed | Date |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-001 | Create `src/features/ManageUser/pages/Bulk.Page.vue` with Toolbar/Card/padding layout matching `Create.Page.vue`, using `<script setup lang="ts">` and Composition API.       |           |      |
| TASK-002 | Add route entry in `src/routers/index.ts` for path `/shared/user/bulk` pointing to `Bulk.Page.vue`, matching existing ManageUser routes structure.                            |           |      |
| TASK-003 | Add navigation entry/button from the List page `src/features/ManageUser/pages/List.Page.vue` to the bulk page, following existing UI patterns (placement near Create action). |           |      |

### Implementation Phase 2

- GOAL-002: Implement bulk input handling, validation, and submission status flow.

| Task     | Description                                                                                                                                                                                                        | Completed | Date |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---- |
| TASK-004 | Implement bulk input UI in `Bulk.Page.vue`: CSV file input and multiline textarea; parse into rows with headers consistent with user model in `src/shared/api/user.api.ts`.                                        |           |      |
| TASK-005 | Add client-side validation in `Bulk.Page.vue` (required columns, valid email via `src/features/ManageUser/utils/email.utils.ts`); surface errors inline and disable submit on invalid.                             |           |      |
| TASK-006 | Add submission flow using existing API/query patterns (reference `src/features/ManageUser/queries/user.queries.ts` and `src/shared/api/user.api.ts`); show success/failure status and navigate to list on success. |           |      |
| TASK-007 | Mirror offline-disabled behavior from `Create.Page.vue` (e.g., use same network state/composable) to disable inputs and submit when offline.                                                                       |           |      |

## 3. Alternatives

- **ALT-001**: Implement only CSV upload without multiline paste input; rejected to reduce friction for small bulk entries.
- **ALT-002**: Implement a modal on the list page instead of a full page; rejected to match existing page navigation patterns and route-based access.

## 4. Dependencies

- **DEP-001**: Vue skill docs `/.github/skills/vue/SKILL.md` for Composition API and `<script setup lang="ts">` conventions.
- **DEP-002**: Existing ManageUser API/query utilities in `src/shared/api/user.api.ts` and `src/features/ManageUser/queries/user.queries.ts`.
- **DEP-003**: Backend skill references (pending definition); no backend changes in this plan.

## 5. Files

- **FILE-001**: `src/features/ManageUser/pages/Bulk.Page.vue` (new page).
- **FILE-002**: `src/routers/index.ts` (route registration).
- **FILE-003**: `src/features/ManageUser/pages/List.Page.vue` (navigation link/button to bulk page).
- **FILE-004**: `src/features/ManageUser/queries/user.queries.ts` (bulk create query, if needed).
- **FILE-005**: `src/shared/api/user.api.ts` (bulk create API method, if needed).

## 6. Testing

- **TEST-001**: Add unit tests for bulk input parsing/validation (new test file `src/features/ManageUser/pages/__tests__/Bulk.Page.test.ts` or colocated test strategy used in ManageUser).
- **TEST-002**: Add tests for offline-disabled state and submission success/failure flows (mock query responses).

## 7. Risks & Assumptions

- **RISK-001**: Backend may not support bulk create endpoint yet; plan assumes a bulk endpoint or existing API can accept batch payload.
- **RISK-002**: CSV parsing requirements (delimiter, quotes) may be underspecified; plan assumes simple comma-separated with headers.
- **ASSUMPTION-001**: Existing Create page offline detection/composable can be reused without changes.
- **ASSUMPTION-002**: User data schema aligns with current create form fields and `user.api.ts` payload.

## 8. Related Specifications / Further Reading

- `/.github/skills/vue/SKILL.md`
- `src/features/ManageUser/pages/Create.Page.vue`
- `src/features/ManageUser/pages/List.Page.vue`
- `src/routers/index.ts`
