import { useTaskStore } from "../../store/taskStore";

interface ListViewProps {
  search: string;
}

export default function ListView({
  search,
}: ListViewProps) {
  const { tasks } = useTaskStore();
  const filteredTasks = tasks.filter((task) =>
  task.title
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
      <h2 className="text-2xl font-bold px-6 pt-6 pb-2 text-slate-800">
        Task List
      </h2>
      
      <table className="w-full border-collapse">
        <thead className="bg-slate-100 sticky top-0 text-slate-700">
          <tr className="border-b text-gray-700">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Assignee</th>
            <th className="text-center p-3">
  Priority
</th>
            <th className="text-center p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr
             key={task.id}
             className="border-b even:bg-slate-50 hover:bg-blue-50 transition-all duration-200"
            >
              <td className="px-4 py-5 font-medium text-slate-800">
               {task.title}
              </td>
              <td className="px-4 py-5">{task.assignee}</td>
              <td className="p-3 text-center">
  <span
    className={`px-2 py-1 rounded text-xs ${
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
</td>
              <td className="p-3 text-center">
  <span
    className={`px-2 py-1 rounded text-xs ${
      task.status === "Done"
        ? "bg-green-100 text-green-600"
        : task.status === "In Progress"
        ? "bg-blue-100 text-blue-600"
        : task.status === "Review"
        ? "bg-purple-100 text-purple-600"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {task.status}
  </span>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}