# AWS CloudOps Console Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the default starter page of `awsapp` into a modern, responsive, high-fidelity AWS CloudOps Console and Resource Dashboard with interactive service filtering, real-time metrics, infrastructure health monitoring, and activity streams.

**Architecture:** Component-driven Next.js App Router UI in React 19 / TypeScript using Tailwind CSS v4. Clean separation between data types, reusable UI components (Header, MetricCards, ResourceTable, ActivityFeed, QuickActions), and the main page composition.

**Tech Stack:** Next.js 15.3.4, React 19, TypeScript 5, Tailwind CSS v4, Lucide-style SVG icons.

**Spec:** Direct user request to improve the UI of `awsapp` into a production-grade AWS Cloud Dashboard.

## Global Constraints
- Node / Next.js memory & process limits: configure `next.config.ts` experimental single worker (`cpus: 1`) to ensure stable compilation in restricted cgroup environments.
- Self-contained SVG icons without external icon bloat.
- Fully responsive on mobile, tablet, and desktop viewports.
- Dark mode first-class support matching AWS Console / modern developer tool aesthetics.

## Review Focus
- Responsive layout resilience (no horizontal scrollbar on mobile).
- Filter and search interactions update resource list predictably without lag.
- Clean TypeScript types without `any`.
- Production build passes with zero lint or compilation errors.
- Visual polish: crisp borders, clear typography hierarchy, and status color semantics (green for healthy, amber for warning, blue for updating).

---

### Task 1: Environment & Next.js Configuration

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Ensure `next.config.ts` contains CPU constraint for stable static compilation**
- [ ] **Step 2: Run `npm run build` to verify configuration**

---

### Task 2: Data Models and SVG Icons

**Files:**
- Create: `src/components/icons.tsx`
- Create: `src/types/aws.ts`

**Interfaces:**
- Produces: `CloudService`, `MetricCardData`, `ActivityItem`, and Lucide-style SVG icon components (`ServerIcon`, `DatabaseIcon`, `StorageIcon`, `ShieldIcon`, `ActivityIcon`, `BellIcon`, `SearchIcon`, `CloudIcon`, `CheckCircleIcon`, `AlertCircleIcon`, etc.).

- [ ] **Step 1: Create `src/types/aws.ts` with types for resources, metrics, and activity logs**
- [ ] **Step 2: Create `src/components/icons.tsx` with lightweight SVG icon primitives**

---

### Task 3: Header & Navigation Component

**Files:**
- Create: `src/components/Header.tsx`

**Interfaces:**
- Consumes: Icon components from `src/components/icons.tsx`
- Produces: `<Header />` with brand logo, region selector, search bar input, status indicator, and user profile avatar.

- [ ] **Step 1: Implement `src/components/Header.tsx` with responsive navigation**
- [ ] **Step 2: Verify responsive hamburger / collapsible elements for mobile**

---

### Task 4: Metric Overview Cards

**Files:**
- Create: `src/components/MetricCards.tsx`

**Interfaces:**
- Consumes: `MetricCardData` from `src/types/aws.ts`, icons from `src/components/icons.tsx`
- Produces: `<MetricCards metrics={...} />` rendering Spend ($/mo), Compute instances, Lambda executions, and Uptime SLA with trend badges.

- [ ] **Step 1: Implement `src/components/MetricCards.tsx`**
- [ ] **Step 2: Verify card layout styling and hover micro-interactions**

---

### Task 5: Interactive Resource Management Table & Service Grid

**Files:**
- Create: `src/components/ResourceTable.tsx`

**Interfaces:**
- Consumes: `CloudService` from `src/types/aws.ts`, icons
- Produces: `<ResourceTable />` featuring category tabs (All, Compute, Storage, Database, Network), live text search, health badges, and action dropdowns.

- [ ] **Step 1: Implement `src/components/ResourceTable.tsx` as a client component with interactive state**
- [ ] **Step 2: Verify search filter and category tab switching**

---

### Task 6: CloudWatch Alarms & Deployment Stream

**Files:**
- Create: `src/components/ActivityFeed.tsx`
- Create: `src/components/QuickActions.tsx`

**Interfaces:**
- Consumes: `ActivityItem` from `src/types/aws.ts`
- Produces: `<ActivityFeed />` and `<QuickActions />` for deployment logs, alarms, and quick cloud tasks.

- [ ] **Step 1: Implement `src/components/ActivityFeed.tsx` and `src/components/QuickActions.tsx`**

---

### Task 7: Assemble Page & Production Verification

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx` (title & description)

- [ ] **Step 1: Assemble all components in `src/app/page.tsx`**
- [ ] **Step 2: Update layout metadata to reflect AWS CloudOps Console**
- [ ] **Step 3: Run `npm run build` and `npm run lint` to guarantee complete build passes**
