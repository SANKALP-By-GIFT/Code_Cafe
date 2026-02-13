import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const VerifyOTP = () => {
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      verifyOTP(otp);
      navigate("/login");
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
          Verify OTP
        </h2>

        <p className="text-center text-sm text-[#2B2D42]/70 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            maxLength="6"
            required
            className="w-full text-center tracking-widest text-lg font-semibold
                       px-4 py-3 rounded-lg border border-gray-300
                       text-[#2B2D42]
                       focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/60
                       transition duration-300"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="------"
          />

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white
                       bg-gradient-to-r from-[#3D5A80] to-[#2A9D8F]
                       hover:scale-[1.02] transition-all duration-300 shadow-md"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
