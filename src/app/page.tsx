'use client';

import React, { useState, useMemo } from 'react';
import { TaskItem, TaskStatus, AgentMetric } from '@/types/task';
import { INITIAL_TASKS, INITIAL_AGENTS } from '@/data/mock-tasks';
import { Navbar } from '@/components/Navbar';
import { MetricsOverview } from '@/components/MetricsOverview';
import { TaskTable } from '@/components/TaskTable';
import { CreateTaskModal } from '@/components/CreateTaskModal';
import { TaskDetailModal } from '@/components/TaskDetailModal';

export default function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [agents] = useState<AgentMetric[]>(INITIAL_AGENTS);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | TaskStatus>('all');
  const [selectedAgent, setSelectedAgent] = useState('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTaskForModal, setActiveTaskForModal] = useState<TaskItem | null>(null);

  // Available agent names for selectors
  const availableAgents = useMemo(() => {
    return Array.from(new Set(agents.map((a) => a.name)));
  }, [agents]);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (selectedStatus !== 'all' && task.status !== selectedStatus) {
        return false;
      }
      // Agent filter
      if (selectedAgent !== 'all' && task.agent !== selectedAgent) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesId = task.id.toLowerCase().includes(query);
        const matchesAgent = task.agent.toLowerCase().includes(query);
        const matchesLogs = task.logs.some((l) => l.message.toLowerCase().includes(query));
        if (!matchesTitle && !matchesId && !matchesAgent && !matchesLogs) {
          return false;
        }
      }
      return true;
    });
  }, [tasks, selectedStatus, selectedAgent, searchQuery]);

  // Handlers
  const handleCreateTask = (newTaskData: Omit<TaskItem, 'id' | 'logs' | 'duration' | 'startedAt'>) => {
    const nextIndex = tasks.length + 8922;
    const newTask: TaskItem = {
      ...newTaskData,
      id: `TSK-${nextIndex}`,
      startedAt: 'Just now',
      duration: '0s',
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          level: 'info',
          message: `Dispatched to ${newTaskData.agent}. Queued in priority worker pool.`,
        },
      ],
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTogglePause = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus: TaskStatus = t.status === 'running' ? 'paused' : 'running';
          const newLog = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            level: 'warn' as const,
            message: `Task state changed to ${newStatus} by operator manual trigger.`,
          };
          return {
            ...t,
            status: newStatus,
            currentStep: newStatus === 'paused' ? 'Paused by operator' : 'Resuming execution pipeline',
            logs: [...t.logs, newLog],
          };
        }
        return t;
      })
    );
  };

  const handleRetryTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newLog = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            level: 'info' as const,
            message: `Task restarted in worker context. Re-queuing payload execution.`,
          };
          return {
            ...t,
            status: 'running' as TaskStatus,
            progress: 10,
            duration: '0s',
            startedAt: 'Just now',
            currentStep: 'Re-initializing execution container',
            logs: [...t.logs, newLog],
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (activeTaskForModal?.id === taskId) {
      setActiveTaskForModal(null);
    }
  };

  const handleAddLog = (taskId: string, message: string) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      level: 'info' as const,
      message,
    };

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            logs: [...t.logs, newLog],
          };
        }
        return t;
      })
    );

    // If modal is open for this task, update local modal view
    setActiveTaskForModal((prev) => {
      if (prev && prev.id === taskId) {
        return {
          ...prev,
          logs: [...prev.logs, newLog],
        };
      }
      return prev;
    });
  };

  const activeAgentsCount = useMemo(() => {
    return agents.filter((a) => a.status === 'active' || a.status === 'busy').length;
  }, [agents]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNewTaskModal={() => setIsCreateModalOpen(true)}
        activeAgentsCount={activeAgentsCount}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards & Utilization */}
        <MetricsOverview tasks={tasks} agents={agents} />

        {/* Task Board / Table View */}
        <TaskTable
          tasks={filteredTasks}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
          availableAgents={availableAgents}
          onViewLogs={(task) => setActiveTaskForModal(task)}
          onTogglePause={handleTogglePause}
          onRetryTask={handleRetryTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/60 py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Agent Task Manager • Next.js 15 & Tailwind v4</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Cluster Node Synchronized
          </span>
        </div>
      </footer>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
        availableAgents={availableAgents}
      />

      {/* Task Detail & Log Modal */}
      <TaskDetailModal
        task={activeTaskForModal}
        onClose={() => setActiveTaskForModal(null)}
        onAddLog={handleAddLog}
      />
    </div>
  );
}
