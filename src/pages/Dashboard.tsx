import { useState } from "react";

import Header from "../components/common/Header";
import StatsCards from "../components/common/StatsCards";
import ViewSwitcher from "../components/common/ViewSwitcher";

import KanbanBoard from "../components/kanban/KanbanBoard";
import ListView from "../components/list/ListView";
import TimelineView from "../components/timeline/TimelineView";
import TaskModal from "../components/modal/TaskModal";
import { useTaskStore } from "../store/taskStore";


export default function Dashboard() {

  const [search, setSearch] = useState("");

  const [activeView, setActiveView] =
    useState("Kanban");
  
    const [statusFilter, setStatusFilter] =
  useState("All");
  
  const [showModal, setShowModal] =
  useState(false);
  const [editingTask, setEditingTask] =
  useState<any>(null);

  const [title, setTitle] = useState("");
const [assignee, setAssignee] = useState("");
const [priority, setPriority] =
  useState("Medium");
const [status, setStatus] =
  useState("Todo");

const addTask = useTaskStore(
  (state) => state.addTask
);

const updateTask = useTaskStore(
  (state) => state.updateTask
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Header />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <StatsCards />
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

  <div className="flex flex-wrap items-center justify-between gap-5">

    <div className="flex gap-4 flex-wrap">

      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-80 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
        className="px-4 py-3 rounded-xl border border-slate-300"
      >
        <option>All</option>
        <option>Todo</option>
        <option>In Progress</option>
        <option>Review</option>
        <option>Done</option>
      </select>

    </div>

    <button
      onClick={() => setShowModal(true)}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-7 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
    >
      + New Task
    </button>

  </div>

  <div className="mt-6">
    <ViewSwitcher
      activeView={activeView}
      setActiveView={setActiveView}
    />
  </div>

</div>

        {activeView === "Kanban" && (
          <KanbanBoard
  search={search}
  statusFilter={statusFilter}
  onEdit={(task) => {
    setEditingTask(task);

    setTitle(task.title);
    setAssignee(task.assignee);
    setPriority(task.priority);
    setStatus(task.status);

    setShowModal(true);
  }}
/>
        )}

        {activeView === "List" && (
          <ListView search={search} />
        )}

        {activeView === "Timeline" && (
          <TimelineView search={search} />
        )}
      </div>
  <TaskModal
  showModal={showModal}
  editingTask={editingTask}

  title={title}
  setTitle={setTitle}

  assignee={assignee}
  setAssignee={setAssignee}

  priority={priority}
  setPriority={setPriority}

  status={status}
  setStatus={setStatus}

  onSave={() => {
    if (editingTask) {
      updateTask({
        ...editingTask,
        title,
        assignee,
        priority: priority as any,
        status: status as any,
      });

      setEditingTask(null);
    } else {
      addTask({
        id: crypto.randomUUID(),
        title,
        description: "",
        assignee,
        priority: priority as any,
        status: status as any,
        startDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    }

    setTitle("");
    setAssignee("");
    setPriority("Medium");
    setStatus("Todo");
    setShowModal(false);
  }}

  onCancel={() => {
    setEditingTask(null);

    setTitle("");
    setAssignee("");
    setPriority("Medium");
    setStatus("Todo");

    setShowModal(false);
  }}
/>
    </div>
  );
}