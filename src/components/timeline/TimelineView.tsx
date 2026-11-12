import { useTaskStore } from "../../store/taskStore";

interface TimelineViewProps {
  search: string;
}

export default function TimelineView({
  search,
}: TimelineViewProps) {
const { tasks } = useTaskStore();
const filteredTasks = tasks.filter((task) =>
  task.title
    .toLowerCase()
    .includes(search.toLowerCase())
);

const sortedTasks = [...filteredTasks].sort(
(a, b) =>
new Date(a.startDate).getTime() -
new Date(b.startDate).getTime()
);

return ( <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"> 
<div className="px-6 pt-6 pb-4">
  <h2 className="text-3xl font-bold text-slate-800">
     Project Timeline
  </h2>

  <p className="text-slate-500 mt-1">
    Track project milestones and upcoming deadlines
  </p>
</div>

  <div className="space-y-5 max-h-[700px] overflow-y-auto px-6 pb-6">
    {sortedTasks.slice(0, 50).map((task) => (
      <div
  key={task.id}
  className="relative w-full border-l-4 border-blue-500 pl-6 py-5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
>
  <div className="absolute -left-[10px] top-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
        <p className="text-sm font-medium text-blue-600">
          {new Date(task.startDate).toLocaleDateString(
  "en-US",
  {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }
)}
        </p>

        <h3 className="text-lg font-bold text-slate-800 mt-1">
          {task.title}
        </h3>

<div className="flex items-center gap-3 mt-2 flex-wrap">
  <p className="text-sm text-gray-600">
    👤 {task.assignee}
  </p>

  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      task.priority === "Critical"
        ? "bg-red-100 text-red-600"
        : task.priority === "High"
        ? "bg-orange-100 text-orange-600"
        : task.priority === "Medium"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-green-100 text-green-600"
    }`}
  >
    {task.priority}
  </span>

  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      task.status === "Todo"
        ? "bg-gray-100 text-gray-600"
        : task.status === "In Progress"
        ? "bg-blue-100 text-blue-600"
        : task.status === "Review"
        ? "bg-purple-100 text-purple-600"
        : "bg-green-100 text-green-600"
    }`}
  >
    {task.status}
  </span>
</div>

        <p className="text-sm text-gray-500 mt-2">
  📅 Due:{" "}
  {new Date(task.dueDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  )}
</p>
      </div>
    ))}
  </div>
</div>


);
}
