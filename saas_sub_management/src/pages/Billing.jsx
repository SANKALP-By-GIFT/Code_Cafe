import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { billingSchema } from "../validation/billingSchema";
import { submitBilling } from "../api/billingApi";
import { useSubscription } from "../hooks/useSubscription";

const Billing = () => {
  const navigate = useNavigate();
  const { selectedPlan } = useSubscription();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(billingSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: submitBilling,
    onSuccess: () => navigate("/dashboard"),
  });

  const onSubmit = (data) => mutation.mutate(data);

  useEffect(() => {
    if (!selectedPlan) navigate("/plans");
  }, [selectedPlan, navigate]);

  if (!selectedPlan) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden
                    bg-gradient-to-br from-[#3D5A80] via-[#2A9D8F] to-[#E9C46A]">

      {/* Floating Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-[#E9C46A]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-[#2A9D8F]/30 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] grid md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="p-12">

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#2B2D42]">
              Secure Checkout
            </h2>
            <p className="text-[#6B7280] mt-2">
              Complete your learning journey with confidence.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Inputs */}
            {["fullName", "email", "cardNumber"].map((field) => (
              <div key={field}>
                <input
                  {...register(field)}
                  placeholder={
                    field === "fullName"
                      ? "Full Name"
                      : field === "email"
                      ? "Email Address"
                      : "Card Number"
                  }
                  className="w-full px-5 py-3 rounded-xl border border-gray-300
                             text-[#2B2D42] placeholder-[#6B7280]
                             focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]
                             transition duration-300 hover:border-[#2A9D8F]"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors[field]?.message}
                </p>
              </div>
            ))}

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register("expiry")}
                  placeholder="MM/YY"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiry?.message}
                </p>
              </div>

              <div>
                <input
                  {...register("cvv")}
                  placeholder="CVV"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.cvv?.message}
                </p>
              </div>
            </div>

            {/* Address */}
            <div>
              <textarea
                {...register("address")}
                rows="3"
                placeholder="Billing Address"
                className="w-full px-5 py-3 rounded-xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.address?.message}
              </p>
            </div>

            {/* Secure Strip */}
            <div className="bg-[#2A9D8F]/10 text-[#2B2D42] text-sm p-4 rounded-xl">
              🔒 100% Secure Payment · Encrypted Checkout
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={!isValid || mutation.isPending}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                ${
                  isValid
                    ? "bg-gradient-to-r from-[#3D5A80] to-[#2A9D8F] text-white hover:scale-[1.02] shadow-lg"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
            >
              {mutation.isPending ? "Processing..." : "Confirm & Subscribe"}
            </button>

          </form>
        </div>

        {/* RIGHT SIDE - PREMIUM SUMMARY */}
        <div className="bg-[#F8F9FB] p-12 flex flex-col justify-between border-l border-gray-200">

          <div>
            <h3 className="text-2xl font-bold text-[#2B2D42] mb-6">
              Order Summary
            </h3>

            <div className="backdrop-blur-xl bg-white/70 border border-[#E9C46A]/40
                            rounded-2xl p-8 shadow-lg">

              <p className="text-[#6B7280] text-sm mb-1">Selected Plan</p>

              <h4 className="text-2xl font-semibold text-[#3D5A80]">
                {selectedPlan.name}
              </h4>

              <p className="text-3xl font-bold text-[#2B2D42] mt-2">
                ₹{selectedPlan.price}
                <span className="text-sm text-[#6B7280]"> /month</span>
              </p>

              <div className="mt-6 space-y-3 text-[#6B7280] text-sm">
                <p>✔ Unlimited course access</p>
                <p>✔ Certificates included</p>
                <p>✔ Priority support</p>
                <p>✔ Cancel anytime</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#6B7280] mt-8">
            By confirming, you agree to our Terms & Conditions and Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Billing;
