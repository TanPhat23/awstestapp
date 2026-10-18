# AWS Cloud Infrastructure Dashboard UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `awsapp` from the default `create-next-app` starter template into a modern, interactive, and responsive AWS Cloud Infrastructure and Operations Dashboard.

**Architecture:** Client and Server component architecture utilizing Next.js 15 App Router and React 19, styled with Tailwind CSS v4. Modular component decomposition separating stateful dashboard interactions (resource filtering, status toggling, cost calculators, region selectors) into clean client components while keeping the layout and static scaffolding lightweight and fast.

**Tech Stack:** Next.js 15.3.4, React 19, TypeScript 5, Tailwind CSS v4, Lucide-style inline SVGs for zero extra dependencies.

**Spec:** Modern AWS management UI featuring KPI metric tiles, an interactive resource manager with search & status filters, cost breakdown analytics with interactive budget calculator, CloudWatch recent alerts feed, and a quick-provision modal.

## Global Constraints

- Must build cleanly with `next build` and pass `tsc --noEmit`.
- No extra heavy external runtime dependencies required; all icons rendered as crisp, accessible SVG components.
- Fully responsive across mobile, tablet, and desktop viewports.
- Support both dark and light modes cleanly with cohesive color palettes (AWS slate, indigo, emerald, amber, rose).

## Review Focus

1. Mobile responsiveness: Navigation and multi-column grids must adapt cleanly to small screens without horizontal scroll.
2. Filter state consistency: Searching resources or toggling category tabs must accurately filter the item list.
3. Interactive toggles: Resource state toggles (e.g., start/stop instance) should give immediate visual feedback.
4. Budget calculator reactivity: Sliders and input adjustments in the cost calculator should update live totals accurately.
5. Accessibility: Interactive buttons and modal controls must have proper labels and keyboard focus outlines.

---

### Task 1: Type Definitions and Mock Data Scaffolding

**Files:**
- Create: `src/types/dashboard.ts`
- Create: `src/data/mockData.ts`

**Interfaces:**
- Produces: `ResourceItem`, `MetricSummary`, `ActivityEvent`, `CostBreakdownItem`, `StackTemplate` types and rich default datasets representing AWS infrastructure.

- [ ] **Step 1: Define TypeScript interfaces in `src/types/dashboard.ts`**
- [ ] **Step 2: Create realistic mock dataset in `src/data/mockData.ts`**
- [ ] **Step 3: Run `npx tsc --noEmit` to verify type definitions pass**

---

### Task 2: Reusable UI Atoms & Icons

**Files:**
- Create: `src/components/ui/Icons.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Button.tsx`

**Interfaces:**
- Consumes: Standard React props.
- Produces: Clean SVG icons (Server, Database, Cloud, Shield, Bell, Search, Activity, Cpu, HardDrive, RefreshCw, etc.) and reusable Badge/Button components.

- [ ] **Step 1: Implement SVG icon set in `src/components/ui/Icons.tsx`**
- [ ] **Step 2: Implement Badge and Button helpers with variant support**
- [ ] **Step 3: Run `npx tsc --noEmit` to verify type safety**

---

### Task 3: Dashboard Navigation & KPI Metrics Section

**Files:**
- Create: `src/components/dashboard/TopNavbar.tsx`
- Create: `src/components/dashboard/MetricsOverview.tsx`

**Interfaces:**
- Consumes: `MetricSummary` from `src/types/dashboard.ts`, icons from `src/components/ui/Icons.tsx`.
- Produces: Global top navigation with region/account selectors and the 4 primary KPI cards (Monthly Cost, Compute Load, Active Resources, Health/Security Score).

- [ ] **Step 1: Implement `TopNavbar.tsx` with region selector, search input, status indicators, and dark/light toggling support**
- [ ] **Step 2: Implement `MetricsOverview.tsx` rendering metric trends, progress bars, and delta indicators**
- [ ] **Step 3: Verify with `npx tsc --noEmit`**

---

### Task 4: Interactive Resource Explorer & Management Table

**Files:**
- Create: `src/components/dashboard/ResourceExplorer.tsx`

**Interfaces:**
- Consumes: `ResourceItem` from `src/types/dashboard.ts`.
- Produces: Filterable resource table with search bar, status filter pills (All, EC2, RDS, S3, Lambda), start/stop action triggers, and health status indicators.

- [ ] **Step 1: Implement `ResourceExplorer.tsx` with category tabs and search input**
- [ ] **Step 2: Implement interactive action handling (simulated start/stop/restart with toast feedback)**
- [ ] **Step 3: Verify with `npx tsc --noEmit`**

---

### Task 5: Cost Analytics & Interactive Architecture Estimator

**Files:**
- Create: `src/components/dashboard/CostAnalytics.tsx`
- Create: `src/components/dashboard/QuickDeployModal.tsx`

**Interfaces:**
- Consumes: `CostBreakdownItem`, `StackTemplate` from `src/types/dashboard.ts`.
- Produces: Service cost breakdown visualizer, interactive monthly estimation sliders, and stack launch modal.

- [ ] **Step 1: Implement `CostAnalytics.tsx` with visual cost bars and interactive resource tier sliders**
- [ ] **Step 2: Implement `QuickDeployModal.tsx` for one-click stack deployment configuration**
- [ ] **Step 3: Verify with `npx tsc --noEmit`**

---

### Task 6: CloudWatch Activity Log & Main Page Integration

**Files:**
- Create: `src/components/dashboard/ActivityFeed.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css` (if needed for custom animations or background gradients)

**Interfaces:**
- Consumes: All dashboard components from tasks 1-5.
- Produces: Complete, cohesive AWS Cloud Dashboard page replacing the default Next.js starter.

- [ ] **Step 1: Implement `ActivityFeed.tsx` showing chronological CloudWatch and CloudTrail events**
- [ ] **Step 2: Assemble full page layout in `src/app/page.tsx` with responsive grid layouts**
- [ ] **Step 3: Run `npx tsc --noEmit` and production build `UV_THREADPOOL_SIZE=1 npx next build --no-lint`**
- [ ] **Step 4: Commit changes to Git**
