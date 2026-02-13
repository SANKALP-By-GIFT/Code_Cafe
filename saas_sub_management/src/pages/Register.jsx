import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);
      navigate("/plans");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen px-6
                 bg-gradient-to-br from-[#3D5A80] via-[#2A9D8F] to-[#E9C46A] overflow-hidden"
    >
      {/* Floating background glows */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-[#E9C46A]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-[#2A9D8F]/30 rounded-full blur-3xl"></div>

      {/* Card */}
      <div
        className="relative w-full max-w-md md:max-w-3xl
                   bg-white/90 backdrop-blur-xl
                   shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                   rounded-3xl p-10"
      >
        {/* Premium top accent */}
        <div className="h-1 w-20 bg-[#E9C46A] rounded-full mx-auto mb-6"></div>

        <h2 className="text-3xl font-bold text-center text-[#2B2D42] mb-2">
          Create Account
        </h2>

        <p className="text-center text-[#6B7280] mb-8">
          Join us and start your learning journey
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 text-[#6B7280] text-sm">Full Name</label>
            <input
              type="text"
              required
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         text-[#2B2D42] placeholder-[#6B7280]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]
                         transition duration-300 hover:border-[#2A9D8F]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-[#6B7280] text-sm">Email Address</label>
            <input
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         text-[#2B2D42] placeholder-[#6B7280]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]
                         transition duration-300 hover:border-[#2A9D8F]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-[#6B7280] text-sm">Password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         text-[#2B2D42] placeholder-[#6B7280]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]
                         transition duration-300 hover:border-[#2A9D8F]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-[#6B7280] text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         text-[#2B2D42] placeholder-[#6B7280]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]
                         transition duration-300 hover:border-[#2A9D8F]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-[#3D5A80] to-[#2A9D8F]
                       hover:scale-[1.02] transition-all duration-300
                       shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-[#6B7280] text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#3D5A80] font-semibold hover:text-[#2A9D8F] transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
