import type { Task } from "../../types/task";
import { useTaskStore } from "../../store/taskStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function TaskCard({
  task,
  onEdit,
}: Props) {

  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );
  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
} = useSortable({
  id: task.id,
});

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
};
  return (
    <div
  ref={setNodeRef}
  style={style}
  {...attributes}
  {...listeners}
 className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-md cursor-grab active:cursor-grabbing transition-all duration-300 ${
    isDragging
      ? "opacity-50 shadow-2xl rotate-2"
      : "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1"
  }`}
>
      <div className="flex justify-between items-center">
  <h4 className="font-medium">
    {task.title}
  </h4>

  <div className="flex gap-3">
  <button
  onClick={() => onEdit(task)}
  className="text-blue-600 text-sm hover:text-blue-800"
>
  Edit
</button>

  <button
    onClick={() => deleteTask(task.id)}
    className="text-red-600 text-sm hover:text-red-800"
  >
    Delete
  </button>
</div>
</div>

      <p className="text-sm text-gray-500">
        {task.assignee}
      </p>

      <div className="mt-2">
        <span
          className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}