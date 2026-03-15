# Session Log: Glossary Generator

## Date: 2026-03-14

## Task

Generate a comprehensive glossary of 350 ISO 11179-compliant definitions
for the Interactive Infographics for Intelligent Textbooks course.

## Token Efficiency Results

| Metric | Value |
|--------|-------|
| Total tokens consumed | ~31K |
| Terms generated | 350 |
| Terms with examples | ~245 (~70%) |
| Tokens per term | ~88 |
| Agent overhead (system prompt + tools) | ~12K (paid once) |
| Definition generation | ~19K |
| Assembly (Python script) | ~700 |

### Tokens Per Term Calculation

**Total agent tokens:** 30,788
**Terms generated:** 350
**Tokens per term:** 30,788 / 350 = **~88 tokens/term**

This includes the one-time agent overhead (~12K tokens for system prompt
and tool descriptions). If we subtract that overhead, the marginal cost
per definition is:

(30,788 - 12,000) / 350 = **~54 tokens/term**

**Example term output (~54 tokens):**

> #### Causal Loop Diagram
>
> A systems thinking diagram that maps circular cause-and-effect
> relationships between variables using arrows with polarity indicators,
> revealing reinforcing and balancing feedback loops within a system.
>
> **Example:** A CLD showing how "Student Engagement" increases
> "Learning Outcomes," which increases "Course Ratings," which
> increases "Enrollment," which loops back to increase resources
> for "Student Engagement."

## Strategy: Serial Over Parallel

The glossary-generator skill documents three approaches with their
token costs:

| Approach | Agent overhead | Generation | Assembly | Total |
|----------|---------------|------------|----------|-------|
| **1 serial agent (used)** | ~12K (once) | ~19K | ~700 | **~31K** |
| 4 parallel agents + script | ~48K (4×) | ~19K | ~700 | **~68K** |
| 4 parallel agents + manual Edit | ~48K (4×) | ~19K | ~200K | **~267K** |

The serial approach saved **~37K tokens** compared to parallel (54% savings)
and **~236K tokens** compared to manual assembly (88% savings).

For teachers on the Claude Pro plan with a ~200K token five-hour budget,
this means the glossary consumed only **~16% of the budget** instead of
34% (parallel) or 100%+ (manual).

## Steps Completed

### Step 1: Input Validation
- Read `docs/learning-graph/concept-list.md` — 350 concepts found
- All terms unique, Title Case formatted
- Read `docs/course-description.md` for audience context
- Checked existing `docs/glossary.md` — contained only a placeholder

### Step 2: Serial Agent Definition Generation
- Launched ONE Task agent with all 350 terms
- Agent wrote all definitions to `/tmp/glossary-raw.md` in a single Write call
- Total agent cost: 30,788 tokens
- Duration: ~6 minutes

### Step 3: Assembly via Python Script
- Wrote `/tmp/assemble_glossary.py` — a 25-line script that:
  1. Reads `/tmp/glossary-raw.md`
  2. Splits on `#### ` headers to extract entries
  3. Sorts alphabetically (case-insensitive) using `sorted()`
  4. Writes final `docs/glossary.md` with `# Glossary of Terms` header
- Script cost: ~700 tokens (vs. 200K+ if done manually through Edit calls)

### Step 4: Verification
- Confirmed 350 terms in output: `grep -c "^####" docs/glossary.md` → 350
- Verified alphabetical ordering (A/B Testing through Zoom and Pan)
- Spot-checked definition quality — precise, concise, contextual
- Confirmed `mkdocs.yml` already had `Glossary: glossary.md` in nav

## Key Lessons

1. **Serial beats parallel for token efficiency.** Each parallel agent
   pays ~12K tokens in startup overhead. Four agents waste ~36K tokens
   on overhead alone — 18% of a Pro user's five-hour budget.

2. **Assembly is a programming task, not an LLM task.** Sorting 350
   entries alphabetically costs ~700 tokens with a Python script vs.
   200K+ tokens if emitted through Edit/Write tool calls.

3. **One Write call beats 350 Edit calls.** The agent wrote all
   definitions in a single Write to `/tmp/glossary-raw.md`, avoiding
   the per-call overhead of incremental file edits.

## Output Files

| File | Description |
|------|-------------|
| `docs/glossary.md` | 350 alphabetically sorted glossary entries |
