import { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (loggedIn) {
    return <Dashboard />;
  }

  if (showSignup) {
    return (
      <Signup
  onBack={() => setShowSignup(false)}
  onSignupSuccess={() => setShowSignup(false)}
/>
    );
  }

  return (
    <Login
      onLogin={() => setLoggedIn(true)}
      onSignup={() => setShowSignup(true)}
    />
  );
}