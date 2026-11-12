import TaskCard from "./TaskCard";
import { useTaskStore } from "../../store/taskStore";
import type { Task } from "../../types/task";
import {
  DndContext,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface KanbanBoardProps {
  search: string;
  statusFilter: string;
  onEdit: (task: Task) => void;
}

function DroppableColumn({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded-3xl shadow-xl p-6 border border-slate-200 hover:shadow-2xl transition-all ${
        isOver ? "ring-2 ring-blue-400 bg-blue-50" : ""
      }`}
    >
      {children}
    </div>
  );
}
export default function KanbanBoard({
  search,
  statusFilter,
  onEdit,
}: KanbanBoardProps) {
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore(
  (state) => state.moveTask
);
  const filteredTasks = tasks.filter(
  (task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase()) &&
    (statusFilter === "All" ||
      task.status === statusFilter)
);

  const columns = [
    "Todo",
    "In Progress",
    "Review",
    "Done"
  ];

  function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (!over) return;

  const taskId = active.id as string;
  const newStatus = over.id as Task["status"];

  const validStatuses: Task["status"][] = [
    "Todo",
    "In Progress",
    "Review",
    "Done",
  ];

  if (validStatuses.includes(newStatus)) {
    moveTask(taskId, newStatus);
  }
}
  return (
  <DndContext
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {columns.map((column) => {
        const columnTasks = filteredTasks.filter(
  (task) => task.status === column
);

 if (
    statusFilter !== "All" &&
    columnTasks.length === 0
  ) {
    return null;
  }
        return (
         <DroppableColumn
  key={column}
  id={column}
>
 <div className="mb-5 pb-3 border-b border-slate-200">
  <h3 className="text-lg font-bold text-slate-800">
    {column}
  </h3>

  <p className="text-sm text-gray-500">
    {columnTasks.length} Tasks
  </p>
</div>

            <SortableContext
  items={columnTasks.map((task) => task.id)}
  strategy={verticalListSortingStrategy}
>
  <div className="space-y-4">
    {columnTasks.map((task) => (
      <TaskCard
  key={task.id}
  task={task}
  onEdit={onEdit}
/>
))}
            </div>
</SortableContext>
</DroppableColumn>
        );
      })}
       </div>
  </DndContext>
);
}