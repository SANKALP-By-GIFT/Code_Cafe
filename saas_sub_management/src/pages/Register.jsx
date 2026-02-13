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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      navigate("/verify-otp");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
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
        <div className="h-1 w-14 bg-[#E9C46A] rounded-full mx-auto mb-4"></div>

        <h2 className="text-2xl font-bold text-center text-[#3D5A80] mb-1">
          Create Account
        </h2>

        <p className="text-center text-xs sm:text-sm text-[#2B2D42]/70 mb-6">
          Register to receive OTP verification
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block mb-1 text-xs text-[#2B2D42]/70">
              Full Name
            </label>
            <input
              type="text"
              required
              autoComplete="name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300
                         text-sm text-[#2B2D42]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/60
                         transition duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

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
              placeholder="you@example.com"
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
              autoComplete="new-password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300
                         text-sm text-[#2B2D42]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/60
                         transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-xs text-[#2B2D42]/70">
              Confirm Password
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300
                         text-sm text-[#2B2D42]
                         focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/60
                         transition duration-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 rounded-lg text-sm font-semibold text-white
                       bg-gradient-to-r from-[#3D5A80] to-[#2A9D8F]
                       hover:scale-[1.02] transition-all duration-300
                       shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Register & Get OTP"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-xs text-[#2B2D42]/70 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#3D5A80] font-semibold hover:text-[#2A9D8F] transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
