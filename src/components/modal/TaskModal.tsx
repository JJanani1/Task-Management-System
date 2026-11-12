import type { Task } from "../../types/task";

interface TaskModalProps {
  showModal: boolean;
  editingTask: Task | null;

  title: string;
  setTitle: (value: string) => void;

  assignee: string;
  setAssignee: (value: string) => void;

  priority: string;
  setPriority: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onSave: () => void;
  onCancel: () => void;
}

export default function TaskModal({
  showModal,
  editingTask,

  title,
  setTitle,

  assignee,
  setAssignee,

  priority,
  setPriority,

  status,
  setStatus,

  onSave,
  onCancel,
}: TaskModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <h2 className="text-xl font-bold mb-4">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <div className="space-y-3">

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Done</option>
          </select>

        </div>

        <div className="flex gap-3 mt-4">

          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingTask ? "Save Changes" : "Create Task"}
          </button>

          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}