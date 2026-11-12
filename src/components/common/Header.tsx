import {
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Header() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

        {/* Left */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Task Management System
          </h1>

          <p className="text-gray-500 mt-2">
            Organize, monitor and manage your work efficiently.
          </p>

          <div className="flex items-center gap-2 mt-4 text-blue-600 font-medium">

            <FaCalendarAlt />

            <span>{today}</span>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-8">

          <button className="relative">

            <FaBell className="text-2xl text-gray-500 hover:text-blue-600" />

            <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"></span>

          </button>

          <div className="flex items-center gap-4">

            <FaUserCircle className="text-5xl text-blue-600" />

            <div>

              <p className="font-bold text-lg">
                {currentUser.name || "User"}
              </p>

              <p className="text-gray-500 text-sm">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}