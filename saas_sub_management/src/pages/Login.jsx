import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/plans");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#F4F1EC]">

      {/* Card */}
      <div
        className="w-full max-w-sm sm:max-w-md
                   bg-white rounded-2xl shadow-xl
                   border border-[#E9C46A]/40
                   p-6 sm:p-8"
      >
        {/* Gold Accent Line */}
        <div className="h-1 w-14 bg-[#E9C46A] rounded-full mx-auto mb-5"></div>

        <h2 className="text-2xl font-bold text-center text-[#3D5A80] mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-[#2B2D42]/70 mb-6">
          Continue your learning journey
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 text-xs text-[#2B2D42]/70">
              Email Address
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300
                         text-sm text-[#2B2D42]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/60
                         transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-xs text-[#2B2D42]/70">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300
                         text-sm text-[#2B2D42]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/60
                         transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white
                       bg-gradient-to-r from-[#3D5A80] to-[#2A9D8F]
                       hover:scale-[1.02] transition-all duration-300
                       shadow-md"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-xs text-[#2B2D42]/70 text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#3D5A80] font-semibold hover:text-[#2A9D8F] transition"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
