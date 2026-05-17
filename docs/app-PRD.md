# Homestead Batch Tracker — PRD

**Status:** Ready for agent
**Date:** 2026-05-16
**Source:** Synthesized from `homestead-batch-tracker.md` brief and follow-up design session.

---

## Problem Statement

I run many concurrent, multi-stage biological processes on my homestead — mason-jar sprouting, wheat fodder, egg incubation, seedling fertigation, rabbit breeding, sweet potato slips — each with its own protocol of stage transitions and daily, sub-daily, or observation-keyed tasks. Several batches of different types run offset from one another at any given time. I forget where each one is in its protocol, mentally reconstruct the day's work each morning from notes and memory, and routinely miss time-sensitive events: a skipped rinse on a sprouting jar, a missed candling day on an incubator, a late palpation on a doe, a transplant window that closed yesterday. The cost of a missed event is biological and non-recoverable — a failed breeding cycle wastes weeks; under-rinsed sprouts mold.

I want one place that knows what I need to do today, on which batch, without me reconstructing it.

## Solution

A web application where I track each running process as a _batch_ — an instance of a known protocol (template) with a start date and recorded observations. Once a day I open the dashboard and see an urgency-ordered list of everything due across all my active batches, with overdue items at the top, today's items in the middle, and a peek at the coming week below. For sub-daily tasks where a once-a-day check isn't enough (3x daily sprout rinses, 3x daily egg turning), my phone's calendar fires reliable native reminders at my preferred morning/midday/evening times, because the app publishes a calendar feed I subscribe to once and forget. Each morning a digest email lands in my inbox with that day's full task list, so even if I don't open the site, I still know what's due.

I create a new batch in under a minute by picking a template, adjusting parameters if needed (defaults pre-filled from the protocol), choosing a start date, and naming it. I record observations as they happen ("germinated," "slips at 5 inches," "doe palpated pregnant," "kits born"), and the schedule re-anchors downstream events to those observations where biologically appropriate. When a doe fails to take, I archive that batch and start a new one — the system doesn't try to model the failure as a branch.

The protocols themselves live as authored JSON in the codebase. I am the protocol author. Anyone else using the tool inherits the protocols I've encoded.

## User Stories

### Starting and managing batches

1. As the operator, I want to create a new batch in under 60 seconds by picking a template, adjusting parameters, choosing a start date, and naming it, so that batch creation never feels like friction during chores.
2. As the operator, I want each template to come with sensible default parameters pre-filled, so that I only adjust the parameters I actually want to change.
3. As the operator, I want to give each batch a memorable name (e.g., "mung beans jar A," "Tuesday incubator"), so that I can disambiguate concurrent batches of the same template on the dashboard.
4. As the operator, I want to view a list of my active batches with their current stage and progress, so that I can see at a glance what's running on my homestead.
5. As the operator, I want to archive a batch when it's complete (sprouts harvested, kits weaned, hatch finished) or when it has failed (doe didn't take, seedlings died), so that the dashboard only shows what's currently in progress.
6. As the operator, I want to view archived batches, so that I can reference past runs without them cluttering today's view.
7. As the operator, I want to edit a running batch's non-anchor parameters (labels, counts) but not its anchor-defining parameters (incubation length), so that I can correct mistakes without silently rewriting the biology of a running batch.
8. As the operator, when a rabbit breeding cycle fails (negative palpation), I want to archive the failed batch and start a fresh one with the new breed date, so that the system models reproductive failure as a clean restart rather than a complex branch.

### Today dashboard

9. As the operator, I want one screen that tells me everything due today across all active batches, so that I never have to mentally aggregate across processes.
10. As the operator, I want overdue items pinned at the top of the dashboard in a visually distinct (red) section, so that I see biologically expensive misses (skipped palpation, missed lockdown) before anything else.
11. As the operator, I want today's items grouped by batch in the middle section, so that I get batch context for each task without losing the urgency frame.
12. As the operator, I want tasks and observations interleaved within a batch's card (rather than split into separate sections), so that the dashboard matches how I actually work at the cage or in the kitchen ("while I'm here, do all these things").
13. As the operator, I want a collapsible "coming up this week" section, so that I can plan ahead without it dominating the screen by default.
14. As the operator, I want sub-daily counter tasks (rinse jar A: 0/3) to render as inline checkboxes within the batch card, so that I tick each one as I do it without leaving the page or reloading.
15. As the operator, when nothing is due today, I want the empty state to show the next upcoming item ("Nothing due today. Next: kindling, doe #4, in 3 days"), so that I feel reassured I'm not forgetting something.
16. As the operator, I want idle batches (nothing due today, nothing overdue) to disappear from the main dashboard sections, so that the screen reflects what needs my attention rather than what merely exists.

### Recording work

17. As the operator, I want to mark a scheduled task done with one tap, so that recording work doesn't slow me down.
18. As the operator, I want to explicitly mark a task as skipped (distinct from leaving it overdue), so that I can clear deliberate omissions from my view without lying about having done them.
19. As the operator, I want to record an observation event ("germinated," "slips at 5 inches," "doe pregnant") with one tap or short input, so that downstream tasks re-anchor automatically.
20. As the operator, when I record an observation, I want downstream events that anchor to that observation to shift accordingly, while events anchored to batch-start to stay put, so that drift handling matches the biology of each event.
21. As the operator, I want sub-daily counters to reset at midnight, so that yesterday's missed rinse doesn't leak into today's count.
22. As the operator, I want overdue scheduled tasks to remain visible until I act on them, so that I don't lose track of missed work.
23. As the operator, I want an observation window to remain in "overdue" state past its end date by a configurable tolerance, so that I have a grace period before it disappears as stale.

### Notifications and calendar feed

24. As the operator, I want to subscribe to one calendar feed URL once on my phone and have it cover all my batches, so that I don't re-subscribe every time I start a batch.
25. As the operator, I want sub-daily tasks (rinses, turnings) to appear as timed events at my chosen morning/midday/evening times, so that my phone fires native reminders when those windows hit.
26. As the operator, I want scheduled tasks (candling, transplant, palpation) to appear as silent all-day events in the calendar band, so that I have visual planning context without notification clutter.
27. As the operator, I want observation windows (palpation between day 10–14) to appear as multi-day all-day events spanning the window plus tolerance, so that I see at a glance how much room I have.
28. As the operator, I want events to disappear from the feed once I mark them done, so that completed work doesn't accumulate as noise in my calendar.
29. As the operator, I want events to use stable UIDs across feed regenerations, so that my calendar client doesn't re-fire reminders every time it polls.
30. As the operator, I want the feed to cover the next 30 days only, so that historical events don't bloat the feed.

### Email digest

31. As the operator, I want a daily digest email at my chosen morning time containing the full list of today's tasks, so that I get the daily summary even if I don't open the app.
32. As the operator, I want the digest to include batch context for each item (which jar, which doe, which incubator), so that I can act on it without opening the app.
33. As the operator, I want the digest to be reliable enough that I treat it as my primary daily summary, with the calendar feed handling sub-daily nudges, so that I have two non-overlapping channels covering different cadences.

### Auth and settings

34. As the operator, I want to sign up and sign in with just my email via a magic link, so that I don't manage a password.
35. As the operator, I want a long-lived session after my first magic link on a device, so that I'm not re-authenticating constantly.
36. As the operator, I want to access the same data from my phone in the barn and my laptop at the desk, so that the tool fits my actual workflow.
37. As the operator, I want to set my timezone once at signup, so that windows and digest delivery resolve to my local clock.
38. As the operator, I want to set three semantic window times (morning, midday, evening) once in settings, so that all sub-daily tasks across all batches use my preferred schedule.
39. As the operator, I want to set the delivery time for the daily digest email, so that it lands when I actually check email.

### Template library

40. As the operator, I want the six initial templates (sprouting, wheat fodder, egg incubation, seedling care, rabbit breeding, sweet potato slips) seeded in the system, so that I can run my current homestead on day one.
41. As the operator, I want each template's parameters surfaced at batch creation with documented defaults, so that I understand what I'm configuring.
42. As the operator, I want a running batch to keep using the template version it was created against, even if I update the template later, so that mid-flight protocols aren't silently rewritten.
43. As the operator, I want new batches to use the latest version of their template, so that template improvements propagate forward without breaking running batches.

## Implementation Decisions

### Template engine

**Template Evaluator is the load-bearing module.** It is a pure function with signature `(template, params, start_date, observed_events, now) → DerivedSchedule`. Every dashboard render, ICS regeneration, and digest composition is downstream of one call to this function. It owns: anchor resolution, scheduled-vs-observed transition logic, sub-daily counter materialization within stage windows, lateness_tolerance computation, and resolution of semantic windows (morning/midday/evening) against the user's wall-clock settings.

**Two stage-transition types** are first-class primitives in the schema:

- _Scheduled transitions_: defined as `day N from a named reference event` (where the reference event is by default `batch_start`, but can be any prior named event in the template).
- _Observed transitions_: do not advance until the user records the referenced observation event. Once recorded, downstream events that anchor to the observation re-compute from the observation's recorded date.

**Per-event explicit anchoring.** Every event in a template (scheduled task, observation window, recurring counter, stage transition) declares its own reference event by name. This is required, not defaulted. The template author chooses per event whether biology says "this event is calendrical from breed-start" (e.g., rabbit kindling, anchored to breed-start because gestation is ~31d regardless of when palpation happened) or "this event is contingent on a prior observation" (e.g., sprout harvest, anchored to germination-observed because variable germination shifts harvest).

**Marking a task done never re-anchors anything.** Doing the day-7 candling on day 9 is a fact about the operator's schedule, not the embryo's biology. Day-14 candling stays on day 14.

**Recording an observation re-anchors only events that explicitly point to it.** Late germination shifts harvest because harvest's anchor is `germination_observed`. Late germination does not shift the cleanup task whose anchor is `batch_start`.

**Failed branches are not modeled.** Negative palpation does not branch the rabbit-breeding batch; the operator archives that batch and starts a new one. Templates do not contain conditional branches.

**Sub-daily tasks are daily counters with semantic windows.** A recurring task declares `count_per_day` (e.g., 3) and a list of semantic windows (e.g., `[morning, midday, evening]`). The dashboard renders this as `[ ][ ][ ] Rinse jar A` inline checkboxes counting toward today's total. The schema is _count-shaped_, not time-shaped; the windows resolve to wall-clock times only when generating the ICS feed.

**Every event-type carries a `lateness_tolerance` field.** This drives when "due today" becomes "overdue" in the dashboard and when "overdue-window" becomes stale for observations. Sub-daily counters silently reset at midnight regardless of tolerance.

### Template schema (JSON, authored by hand)

Templates are hand-coded JSON checked into the repository. The Template Schema module validates them on load. No UI template editor in MVP. No user-authored templates in MVP. The hand-coded JSON is the expert and source of truth.

Schema primitives (the validator enforces these):

- Stages with named identifiers and transitions (scheduled or observed).
- Scheduled events: named, reference event name, day offset, optional time-of-day semantics for ICS, lateness_tolerance.
- Observed events: named, expected window (day-range from a reference event), lateness_tolerance.
- Recurring counters: stage scope, count_per_day, semantic windows, lateness_tolerance per window.
- Parameters: typed (integer, number, string, enum), with defaults. Parameters can be referenced by name from anywhere in the template definition (e.g., `"day": "{incubation_days}"`).

**Templates are versioned.** A batch snapshots `template_id + template_version` at creation. The evaluator loads the version the batch points at, not the latest. Template edits never reach in-flight batches.

### Data model

**Virtual events with a thin status table.** The database stores batches and acted-upon events only; due-event lists are computed by the evaluator on every read.

- `users`: id, email, timezone, window times (morning/midday/evening), digest delivery time, ICS feed token.
- `batches`: id, user_id, template_id, template_version, params (JSON), start_date, name, status (active/archived), archived_at.
- `batch_events`: id, batch_id, template_event_key, status (`done`/`skipped`/`observed`), recorded_at, payload (JSON, e.g., observation values like "slips at 5 inches").
- Templates live as code/JSON, not in the database.

**Cross-cutting consequences:**

- The evaluator is pure and load-bearing. A bug there affects every render.
- "Skipped" is a deliberate user action, not absence-of-action.
- Audit history is observation-shaped (you see what was observed and when), not exhaustively task-shaped (no row per skipped rinse).
- No DB-level query for "all due tasks today" — the system loads active batches and runs the evaluator. Acceptable at the operator's scale (tens of batches).

### Surfaces

**Today dashboard is urgency-grouped.** Three sections in order:

1. _Overdue_ — flat list across all batches, red, batch name as a chip. Empty state is the goal.
2. _Today_ — grouped by batch, each batch a card showing stage + ordered list of today's interleaved tasks/observations/counters.
3. _Coming up_ — collapsible, default collapsed, grouped by day for the next 7 days.

Observations and tasks render in the same row treatment within a batch card, differentiated by a left-edge icon, not separated into subsections. Sub-daily counters render as inline checkbox arrays within their row. The empty state for the whole dashboard surfaces the next upcoming item rather than going blank.

The Dashboard Composer is a pure function: `(active_batches, evaluator_outputs, now) → DashboardView`. The UI renders this view structure; it does not compute urgency, sort order, or grouping itself.

**ICS feed.** One feed per user at a tokenized URL. Generated on demand on each fetch.

- Sub-daily counter windows → timed VEVENTs at resolved per-user window times, 15-minute duration.
- Scheduled tasks → all-day VEVENTs (silent planning context; the email digest owns the daily summary).
- Observation windows → multi-day all-day VEVENTs spanning the window plus lateness_tolerance.
- Done events vanish from the next fetch.
- 30-day forward window.
- Stable UID format: `{batch_id}:{template_event_key}:{occurrence_date}@<domain>`.
- Timezone is per-user, set once at signup; windows are semantic and resolve to wall-clock (DST = wall-clock stays put).

The ICS Generator is a pure function: `(active_batches, user_settings, now) → ICSText`. The HTTP endpoint is a thin wrapper that authenticates the token and serves the result with `Content-Type: text/calendar`.

**Email daily digest.** Owns the daily summary. ICS does not duplicate this — scheduled tasks live silently in the calendar band. The Digest Composer is a pure function: `(DashboardView, user) → email body`. A scheduler fires the digest at the user's chosen delivery time in their timezone.

### Auth

**Magic-link email auth.** Email is the user identifier. No passwords. First sign-in on a device requires a one-tap magic link; thereafter a long-lived session cookie. The same email-sending infrastructure handles magic links and digests.

### Module decomposition

**Deep modules** (each is a pure function over its inputs, tested in isolation against fixtures):

- _Template Evaluator_ — `(template, params, start_date, observed_events, now) → DerivedSchedule`.
- _Template Schema_ — JSON validator + loader; rejects malformed templates at startup.
- _Dashboard Composer_ — `(batches, evaluator_outputs, now) → DashboardView`.
- _ICS Generator_ — `(batches, user_settings, now) → ICSText`.
- _Digest Composer_ — `(DashboardView, user) → email body`.

**Shallow modules** (conventional plumbing):

- _Batch Store_ — CRUD over batches and batch_events.
- _Magic-Link Auth_ — token send, token verify, session management.
- _Digest Scheduler_ — fires the digest at the user's chosen time per timezone.
- _Template Library_ — six hand-coded JSON files loaded at startup, validated by Template Schema.
- _Frontend surfaces_ — today view, batch creation, batch detail, settings, archived list.

The four pure deep modules (Evaluator, Composer, ICS Generator, Digest Composer) all consume the same shape — batches + time — which means a single golden-fixture set drives tests across all of them.

### Build sequencing

Build order to surface evaluator risk first:

1. Template Schema + one hand-authored template (sprouting — exercises counters, observed transitions, and parameters).
2. Template Evaluator against that one template, test-first.
3. Batch Store + minimal batch creation UI.
4. Dashboard Composer + Today view rendering its output.
5. Remaining five templates.
6. Magic-link auth + multi-user data isolation.
7. Settings UI (timezone, windows, digest time).
8. ICS Generator + feed endpoint.
9. Digest Composer + Scheduler.

## Testing Decisions

**Principle: test external behavior, not internal structure.** A test asserts on what the module produces given inputs (a DerivedSchedule, a DashboardView, an ICSText string, a parsed digest body), not on which internal helper functions it calls or how the computation is structured. Refactors that preserve behavior should not break tests; behavior changes should break exactly the tests that describe that behavior.

**Modules with serious test coverage** (the four pure deep modules):

- _Template Evaluator_ — the highest-value test target. A shared fixture set of batches at synthetic `now` values exercises: scheduled-vs-observed transitions, per-event anchor resolution, late-observation re-anchoring (and non-re-anchoring of events anchored to batch-start), sub-daily counter materialization within stage windows, midnight reset semantics, lateness_tolerance crossings, template version pinning, parameter substitution. Edge cases worth dedicated coverage: empty observation set, observation recorded before its expected window, observation recorded after its window+tolerance, batch whose start date is in the future, batch that has reached its terminal stage.
- _Template Schema_ — validation tests covering both valid templates (all six seeded ones load cleanly) and rejected malformed templates (missing required fields, unknown reference event names, parameter type mismatches, circular anchor references).
- _Dashboard Composer_ — given a set of evaluator outputs and a `now`, assert on the produced DashboardView: section assignment (overdue/today/coming up), batch grouping in today's section, interleaving order within a batch card, empty-state next-up computation, idle-batch suppression.
- _ICS Generator_ — given a fixture of batches and user settings, assert on the produced ICS text: correct VEVENT type per event-type (timed vs all-day vs multi-day all-day), stable UIDs across re-generations, vanish-on-done semantics, 30-day windowing, DST-stable wall-clock window resolution.

**Modules with light or no test coverage in MVP:** Batch Store (CRUD; rely on integration confidence), Magic-Link Auth (conventional, low payoff per test), frontend surfaces (low payoff, high churn), Digest Scheduler (cron behavior; verify by running it).

**Shared fixture set.** All four deep-module test suites consume the same fixture file: a synthetic set of batches at known `now` values designed to exercise the interesting biological scenarios (mid-incubation with one missed candling, sprouting on day 3 with a 7am rinse owed, rabbit breeding past palpation window with observation pending, sweet potato slips waiting on observation, freshly-started batch with nothing due, fully-finished batch about to be archived). Adding a regression test for a bug means adding a batch to the fixture set, not building a one-off scenario.

**Prior art.** Greenfield project; no in-repo prior art to mirror. Reach for the conventions of the chosen test runner ecosystem.

## Out of Scope

- Push notifications (Web Push, mobile push). ICS subscription is the notification channel; native phone calendar reminders are the user-facing notification UX.
- User-authored templates. Templates are hand-coded JSON edited by the developer and shipped via deploy.
- UI template editor.
- Native mobile apps. Web-only, responsive.
- Multi-user features beyond per-account isolation: sharing, team accounts, social, public batches.
- Payments, subscriptions, paywalls, monetization plumbing. Magic-link auth lays the foundation; the actual billing layer is a future PRD.
- Yield tracking, cost accounting, weight/growth logging, advanced analytics.
- Hardware integrations (sensors, cameras, automated fertigation).
- In-batch reproductive branching for rabbit breeding (failed cycles archive-and-restart instead).
- Two-way actions from the calendar (no "mark done from notification"). Marking done happens on the website.
- Historical event tracking beyond what the observation status table records (no per-skipped-rinse audit row).
- Server-side aggregated queries optimized for many users at once. Per-user evaluation against a few dozen batches is fine.
- Goat, sheep, dairy, beekeeping, mushroom, and other process templates not in the seeded six. Adding new processes means adding new JSON templates in a future change.

## Further Notes

**Secondary user is implicitly defined by the template library.** The addressable persona is "homesteader whose protocols overlap with the seeded six." Sharpening this persona is deferred until there's evidence of external users. Adding new persona reach later means adding templates, not changing the engine.

**The riskiest single piece of code is the Template Evaluator.** A bug there silently corrupts every running batch's schedule. Build it test-first. Almost everything else in the system is conventional plumbing or a thin transformation over its output.

**Forced consequences from architectural decisions, worth keeping in mind during build:**

- Backend-from-day-one (because ICS feeds need a stable hosted URL with current data) — localStorage was never on the table once the notification scope expanded.
- Magic-link auth (because email digest needs a verified email and the email-as-identifier path is one step from there) — anonymous URL tokens were considered and rejected for multi-device support.
- Snapshot-on-creation template versioning is the only safe way to edit a template while batches are running. Without it, a template edit silently rewrites the protocol of every active batch.

**Decisions deferred but not blocking the build:**

- Naming convention for concurrent same-template batches (auto-name vs require-name). Decide when building batch creation UI.
- Exact UX for marking a task "skipped" vs leaving overdue. Decide when building the row component.
- Editing rules for which batch parameters are mutable mid-flight (non-anchor only is the principle; the precise list per template is a per-template authoring concern).
- Email digest content shape (plain vs HTML, links back to the app, tomorrow's heads-up alongside today's). Decide before launch.
- Monetization model. Magic-link auth keeps subscription / one-time / freemium all reachable without migration.
