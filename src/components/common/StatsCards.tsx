import { useTaskStore } from "../../store/taskStore";
import {
 FaClipboardList,
 FaCheckCircle,
 FaSpinner,
 FaExclamationTriangle,
} from "react-icons/fa";

export default function StatsCards() {
  const tasks = useTaskStore((state) => state.tasks);

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const overdue = tasks.filter(
    (task) => new Date(task.dueDate) < new Date()
  ).length;

  const cards = [
  {
    title: "Total Tasks",
    value: total,
    color: "text-slate-800",
    bg: "bg-white",
    icon: <FaClipboardList className="text-3xl text-blue-600" />,
  },
  {
    title: "Completed",
    value: completed,
    color: "text-green-600",
    bg: "bg-white",
    icon: <FaCheckCircle className="text-3xl text-green-600" />,
  },
  {
    title: "In Progress",
    value: inProgress,
    color: "text-blue-600",
    bg: "bg-white",
    icon: <FaSpinner className="text-3xl text-blue-600" />,
  },
  {
    title: "Overdue",
    value: overdue,
    color: "text-red-600",
    bg: "bg-white",
    icon: <FaExclamationTriangle className="text-3xl text-red-600" />,
  },
];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
  key={card.title}
  className={`${card.bg} rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all`}
>

  <div className="flex justify-between items-center">

    <div>

      <p className="text-gray-500">
        {card.title}
      </p>

      <h2 className={`text-4xl font-bold ${card.color}`}>
        {card.value}
      </h2>

    </div>

    {card.icon}

  </div>

  <div className="border-t mt-6 pt-4 text-sm text-gray-400">

    {card.title === "Total Tasks" && "All project tasks"}

    {card.title === "Completed" && "Successfully finished"}

    {card.title === "In Progress" && "Currently active"}

    {card.title === "Overdue" && "Needs attention"}

  </div>

</div>
      ))}
    </div>
  );
}