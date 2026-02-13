import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Plans from "./pages/Plans";
import Billing from "./pages/Billing";
import Dashboard from "./pages/Dashboard";
import VerifyOTP from "./pages/VerifyOTP";

import About from "./pages/About";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";



function App() {
  const location = useLocation();

  // Pages where navbar should NOT appear
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F4F1EC" }}
    >
      {/* Navbar appears only after authentication */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
