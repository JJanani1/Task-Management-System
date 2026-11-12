import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaClipboardCheck,
} from "react-icons/fa";

interface Props {
  onSignupSuccess: () => void;
  onBack: () => void;
}

export default function Signup({
  onSignupSuccess,
  onBack,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup() {
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.find(
      (u: any) =>
        u.username === username ||
        u.email === email
    );

    if (exists) {
      toast.error("User already exists!");
      return;
    }

    users.push({
      name,
      email,
      username,
      password,
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    toast.success("Account created successfully!");

    setTimeout(() => {
      onSignupSuccess();
    }, 1000);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white p-16">

        <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mb-8">
          <FaClipboardCheck className="text-6xl" />
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Join Us
        </h1>

        <p className="text-xl text-blue-100 text-center max-w-md mb-10">
          Create your account and start managing projects
          smarter than ever.
        </p>

        <div className="space-y-5 text-lg">
          <div>🚀 Easy Task Management</div>
          <div>📅 Deadline Tracking</div>
          <div>📊 Progress Monitoring</div>
          <div>👥 Team Collaboration</div>
        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex justify-center items-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[450px]">

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
              <FaClipboardCheck className="text-white text-4xl" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Join Task Management System
          </p>

          <div className="relative mb-4">
            <FaUser className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl py-3 pl-12 pr-4"
            />
          </div>

          <div className="relative mb-4">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl py-3 pl-12 pr-4"
            />
          </div>

          <div className="relative mb-4">
            <FaUser className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-xl py-3 pl-12 pr-4"
            />
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute left-4 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl py-3 pl-12 pr-4"
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            Create Account
          </button>

          <button
  onClick={onBack}
  className="text-blue-600 hover:underline mt-2"
>
  Already have an account? Login
</button>

        </div>

      </div>

    </div>
  );
}