interface Props {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function ViewSwitcher({
  activeView,
  setActiveView,
}: Props) {
  const views = ["Kanban", "List", "Timeline"];

  return (
    <div className="flex gap-2 mb-6">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => setActiveView(view)}
          className={`px-4 py-2 rounded-lg border ${
            activeView === view
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
}