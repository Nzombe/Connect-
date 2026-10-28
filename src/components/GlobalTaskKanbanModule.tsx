import React, { useState, useEffect } from 'react';
import { 
  Kanban, 
  Plus, 
  MoveRight, 
  CheckSquare, 
  Square,
  Clock, 
  AlertCircle, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  User,
  Trash2,
  Archive
} from 'lucide-react';
import { StickyGlobalActionToolbar } from './StickyGlobalActionToolbar';

interface TaskItem {
  id: string;
  title: string;
  source: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  assignee: string;
  dueDate: string;
}

export const GlobalTaskKanbanModule: React.FC = () => {
  const [columns, setColumns] = useState<{
    todo: TaskItem[];
    inProgress: TaskItem[];
    review: TaskItem[];
    done: TaskItem[];
  }>({
    todo: [
      { id: 'TSK-101', title: 'Review Q3 ZIMRA PAYE Tax Filing Draft', source: 'ERP_TAX', priority: 'HIGH', assignee: 'Tatenda N.', dueDate: '2026-08-05' },
      { id: 'TSK-102', title: 'Approve WhatsApp Cloud API Marketing Campaign', source: 'WHATSAPP', priority: 'MEDIUM', assignee: 'Mercy N.', dueDate: '2026-08-07' },
    ],
    inProgress: [
      { id: 'TSK-103', title: 'Audit Parametric Weather Insurance Payouts for Mazowe', source: 'INSURANCE', priority: 'CRITICAL', assignee: 'Chipo M.', dueDate: '2026-07-31' },
      { id: 'TSK-104', title: 'Configure OBD2 Fleet Telemetry Alerts on Sprinter Van', source: 'DIAGNOSTICS', priority: 'MEDIUM', assignee: 'Peacemaker N.', dueDate: '2026-08-02' },
    ],
    review: [
      { id: 'TSK-105', title: 'Verify Alibaba-Surpassing B2B Trade Contract #DEAL-89012', source: 'DEAL_LOG', priority: 'HIGH', assignee: 'Rejoice N.', dueDate: '2026-07-30' },
    ],
    done: [
      { id: 'TSK-106', title: 'Execute Stokvel Monthly Payout ($3,750 USD) to Position #3', source: 'STOKVEL', priority: 'HIGH', assignee: 'Chipo M.', dueDate: '2026-07-29' },
    ]
  });

  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const allTasksList = [...columns.todo, ...columns.inProgress, ...columns.review, ...columns.done];

  const handleSelectAll = () => {
    setSelectedTaskIds(allTasksList.map(t => t.id));
  };

  const handleClearSelection = () => {
    setSelectedTaskIds([]);
  };

  const toggleSelectTask = (id: string) => {
    setSelectedTaskIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedTaskIds.length === 0) return;
    const count = selectedTaskIds.length;
    setColumns({
      todo: columns.todo.filter(t => !selectedTaskIds.includes(t.id)),
      inProgress: columns.inProgress.filter(t => !selectedTaskIds.includes(t.id)),
      review: columns.review.filter(t => !selectedTaskIds.includes(t.id)),
      done: columns.done.filter(t => !selectedTaskIds.includes(t.id)),
    });
    setSelectedTaskIds([]);
    setActionNotice(`[BULK DELETE] Removed ${count} task(s) from Kanban board.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleBulkArchive = () => {
    if (selectedTaskIds.length === 0) return;
    const count = selectedTaskIds.length;
    setSelectedTaskIds([]);
    setActionNotice(`[BULK ARCHIVE] Archived ${count} task(s) to enterprise audit logs.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSource, setNewTaskSource] = useState('ERP_SUITE');
  const [newTaskPriority, setNewTaskPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL'>('HIGH');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Rejoice N.');

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks/kanban');
      const data = await res.json();
      if (data.todo) {
        setColumns(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const moveTask = (taskId: string, fromCol: keyof typeof columns, toCol: keyof typeof columns) => {
    const task = columns[fromCol].find((t) => t.id === taskId);
    if (!task) return;

    setColumns({
      ...columns,
      [fromCol]: columns[fromCol].filter((t) => t.id !== taskId),
      [toCol]: [...columns[toCol], task],
    });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTaskTitle.trim(),
      source: newTaskSource,
      priority: newTaskPriority,
      assignee: newTaskAssignee,
      dueDate: new Date().toISOString().slice(0, 10),
    };

    setColumns({
      ...columns,
      todo: [newTask, ...columns.todo],
    });

    setNewTaskTitle('');
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-4 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Kanban className="w-5 h-5 text-indigo-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Full-Width Cross-Platform Global Task Manager & Enterprise Kanban View
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
            UNIFIED AGGREGATION BOARD
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Aggregates actionable tasks across Google Calendar, Slack, WhatsApp Cloud, ERP Tax, B2B Deal Logs, and Stokvel Savings into a interactive Kanban workflow.
        </p>
      </div>

      {/* Sticky Global Action Toolbar */}
      <StickyGlobalActionToolbar
        totalCount={allTasksList.length}
        selectedCount={selectedTaskIds.length}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
        onBulkDelete={handleBulkDelete}
        onBulkArchive={handleBulkArchive}
        onRefresh={fetchTasks}
        moduleTitle="Global Kanban Tasks"
      />

      {actionNotice && (
        <div className="w-full bg-indigo-950/90 border border-indigo-700 p-2.5 text-xs font-mono text-indigo-300 flex items-center justify-between">
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="text-indigo-400 hover:text-white font-bold">✕</button>
        </div>
      )}

      {/* Add Task Control Bar */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none">
        <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
          <div className="md:col-span-2">
            <label className="block text-slate-400 mb-1">Task Title / Description</label>
            <input
              type="text"
              placeholder="e.g. Audit Payslip PAYE Deductions for August"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Source Module</label>
            <select
              value={newTaskSource}
              onChange={(e) => setNewTaskSource(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="ERP_SUITE">ERP Suite</option>
              <option value="WHATSAPP">WhatsApp Cloud</option>
              <option value="SLACK">Slack Workspace</option>
              <option value="GOOGLE_CALENDAR">Google Calendar</option>
              <option value="DEAL_LOG">Evidentiary Deal Log</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Assignee</label>
            <select
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Rejoice N.">Rejoice N.</option>
              <option value="Tatenda N.">Tatenda N.</option>
              <option value="Chipo M.">Chipo M.</option>
              <option value="Peacemaker N.">Peacemaker N.</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
        </form>
      </div>

      {/* 4-Column Full Width Kanban Board - Edge to Edge */}
      <div className="w-full min-w-full grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        {/* Column 1: TODO */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-none space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-200 uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" /> Backlog / To Do
            </span>
            <span className="px-2 py-0.5 bg-slate-950 text-slate-400 text-[11px]">
              {columns.todo.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            {columns.todo.map((t) => (
              <div key={t.id} className="bg-slate-950 border border-slate-800 p-3 rounded-none space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 font-bold">{t.source}</span>
                  <span className="text-indigo-400 font-bold">{t.id}</span>
                </div>
                <p className="font-semibold text-slate-100 text-xs">{t.title}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                  <span>{t.assignee}</span>
                  <button
                    onClick={() => moveTask(t.id, 'todo', 'inProgress')}
                    className="text-xs px-2 py-0.5 bg-slate-900 hover:bg-indigo-900 text-indigo-300 font-bold border border-slate-800 flex items-center gap-1"
                  >
                    Start <MoveRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: IN PROGRESS */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-none space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-amber-400 uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> In Progress
            </span>
            <span className="px-2 py-0.5 bg-slate-950 text-amber-400 text-[11px]">
              {columns.inProgress.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            {columns.inProgress.map((t) => (
              <div key={t.id} className="bg-slate-950 border border-amber-900/50 p-3 rounded-none space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 font-bold">{t.source}</span>
                  <span className="text-amber-400 font-bold">{t.id}</span>
                </div>
                <p className="font-semibold text-slate-100 text-xs">{t.title}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                  <span>{t.assignee}</span>
                  <button
                    onClick={() => moveTask(t.id, 'inProgress', 'review')}
                    className="text-xs px-2 py-0.5 bg-slate-900 hover:bg-amber-900 text-amber-300 font-bold border border-slate-800 flex items-center gap-1"
                  >
                    Review <MoveRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: REVIEW */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-none space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-blue-400 uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" /> Quality Audit / Review
            </span>
            <span className="px-2 py-0.5 bg-slate-950 text-blue-400 text-[11px]">
              {columns.review.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            {columns.review.map((t) => (
              <div key={t.id} className="bg-slate-950 border border-blue-900/50 p-3 rounded-none space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 font-bold">{t.source}</span>
                  <span className="text-blue-400 font-bold">{t.id}</span>
                </div>
                <p className="font-semibold text-slate-100 text-xs">{t.title}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                  <span>{t.assignee}</span>
                  <button
                    onClick={() => moveTask(t.id, 'review', 'done')}
                    className="text-xs px-2 py-0.5 bg-slate-900 hover:bg-blue-900 text-blue-300 font-bold border border-slate-800 flex items-center gap-1"
                  >
                    Complete <MoveRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: DONE */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-none space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-400 uppercase flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" /> Completed
            </span>
            <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 text-[11px]">
              {columns.done.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            {columns.done.map((t) => (
              <div key={t.id} className="bg-slate-950 border border-emerald-900/50 p-3 rounded-none space-y-2 opacity-80">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 font-bold">{t.source}</span>
                  <span className="text-emerald-400 font-bold">{t.id}</span>
                </div>
                <p className="font-semibold text-slate-100 text-xs line-through">{t.title}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                  <span>{t.assignee}</span>
                  <span className="text-emerald-400 font-bold text-[10px]">VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
