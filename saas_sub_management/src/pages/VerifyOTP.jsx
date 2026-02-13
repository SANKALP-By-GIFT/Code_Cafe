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
    <div className="flex items-center justify-center min-h-screen px-6
                    bg-gradient-to-br from-[#3D5A80] via-[#2A9D8F] to-[#E9C46A]">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl
                      rounded-3xl shadow-2xl p-8 md:p-10">

        <div className="h-1 w-16 bg-[#E9C46A] rounded-full mx-auto mb-6"></div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2B2D42] mb-2">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            maxLength="6"
            required
            className="w-full text-center tracking-widest text-xl font-semibold
                       px-4 py-3 rounded-xl border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]
                       transition duration-300"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="------"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-[#3D5A80] to-[#2A9D8F]
                       hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
