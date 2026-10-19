# CI/CD Pipeline with Unit Testing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GitHub Actions CI workflow to run unit tests and linting on every push and pull request, backed by Vitest and React Testing Library configured for Next.js 15 and React 19.

**Architecture:** Setup Vitest with `@testing-library/react` and `jsdom` for fast unit and component testing. Add sample/unit test suites verifying application components. Configure `.github/workflows/ci.yml` to trigger on push and pull request, install dependencies with caching, run linting, run unit tests, and verify build.

**Tech Stack:** Next.js 15, React 19, Vitest, `@testing-library/react`, `@testing-library/jest-dom`, GitHub Actions.

**Spec:** User request: "add a ci/cd pipeline mainly unit test to test this project" with GitHub Actions.

## Global Constraints

- Must support React 19 and Next.js 15.
- Package manager: npm.
- GitHub Actions workflow should trigger on `push` and `pull_request` to primary branches (`main`, `master`, `task/*`).
- Must run unit tests and ensure clean exit codes in headless environments.

## Review Focus

1. Vitest and React 19 compatibility with `@testing-library/react`.
2. Path aliasing (`@/*`) resolved properly in `vitest.config.mts`.
3. GitHub Actions steps caching npm dependencies efficiently (`actions/setup-node` with cache: 'npm').
4. Headless execution in CI without missing browser globals or DOM polyfills.
5. Exit status non-zero on test failures in CI.

---

### Task 1: Configure Vitest and React Testing Library

**Files:**
- Modify: `package.json`
- Create: `vitest.config.mts`
- Create: `vitest.setup.ts`

**Interfaces:**
- Consumes: Next.js tsconfig path aliases (`@/*` -> `./src/*`)
- Produces: `npm test` and `npm run test:ci` scripts

- [ ] **Step 1: Install Vitest and test dependencies**
Install `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/dom` as devDependencies.

- [ ] **Step 2: Create `vitest.config.mts` and `vitest.setup.ts`**
Configure jsdom environment, setupFiles, globals, and path alias resolver for `@/*`.

- [ ] **Step 3: Update `package.json` scripts**
Add `"test": "vitest run"` and `"test:watch": "vitest"`.

- [ ] **Step 4: Verify test script runs**
Run: `npm test`
Expected: Output showing no test files found or 0 tests run (exit code 0 or cleanly informing lack of tests).

---

### Task 2: Add Unit Tests for Next.js Components

**Files:**
- Create: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `src/app/page.tsx`
- Produces: Passing unit test suite covering home page rendering and key elements

- [ ] **Step 1: Write unit test for `page.tsx`**
Create `src/app/page.test.tsx` testing that the home page renders key content (e.g. Next.js logo or docs links).

- [ ] **Step 2: Run unit tests locally**
Run: `npm test`
Expected: PASS with 1 suite passed.

- [ ] **Step 3: Verify build and lint pass**
Run: `npm run lint && npm run build`
Expected: PASS.

---

### Task 3: Create GitHub Actions CI Workflow

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: `npm test`, `npm run lint`, `npm run build`
- Produces: GitHub Actions CI pipeline configuration

- [ ] **Step 1: Create `.github/workflows/ci.yml`**
Define workflow with:
- Triggers: `push` and `pull_request` (branches: `main`, `task/**`)
- Environment: `ubuntu-latest`
- Steps: Checkout, Setup Node.js 20 with npm cache, `npm ci`, `npm run lint`, `npm test`, `npm run build`.

- [ ] **Step 2: Validate GitHub Actions YAML syntax**
Ensure valid YAML structure and proper workflow syntax.

- [ ] **Step 3: Commit all changes**
Stage and commit workflow, test setup, and configuration files.
