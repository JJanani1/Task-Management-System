import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaLock,
  FaClipboardCheck,
} from "react-icons/fa";

interface Props {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Login({
  onLogin,
  onSignup,
}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u: any) =>
        u.username === username &&
        u.password === password
    );

    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        onLogin();
      }, 1000);
    } else {
      toast.error("Invalid Username or Password");
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white p-16">

        <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mb-8">
          <FaClipboardCheck className="text-6xl" />
        </div>

        <h1 className="text-5xl font-bold mb-6 text-center">
          Task Management
        </h1>

        <p className="text-xl text-blue-100 text-center max-w-md mb-10">
          Organize projects, track progress and collaborate
          with your team efficiently.
        </p>

        <div className="space-y-5 text-lg">

          <div>✅ Organize Projects</div>

          <div>📅 Track Deadlines</div>

          <div>📊 Monitor Progress</div>

          <div>🤝 Collaborate with Team</div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex justify-center items-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[430px]">

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
              <FaClipboardCheck className="text-white text-4xl" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-slate-800">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Login to continue
          </p>

          <div className="relative mb-4">

            <FaUser className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div className="relative mb-6">

            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            Login
          </button>

          <div className="text-center mt-8">

            <p className="text-gray-500">
              Don't have an account?
            </p>

            <button
              onClick={onSignup}
              className="text-blue-600 font-semibold hover:underline mt-2"
            >
              Sign Up
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}