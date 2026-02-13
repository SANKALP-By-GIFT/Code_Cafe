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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#F4F1EC]">

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden border border-[#E9C46A]/40">

        {/* LEFT SIDE */}
        <div className="p-5 md:p-6">

          <h2 className="text-xl font-bold text-[#3D5A80]">
            Secure Checkout
          </h2>
          <p className="text-xs text-[#2B2D42]/70 mb-4">
            Complete your learning journey securely.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

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
                  className="w-full px-3 py-2 rounded-md border border-gray-300
                  text-sm bg-white focus:ring-2 focus:ring-[#2A9D8F]/60 outline-none"
                />
                <p className="text-red-500 text-[11px] mt-1">
                  {errors[field]?.message}
                </p>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2">
              <input
                {...register("expiry")}
                placeholder="MM/YY"
                className="px-3 py-2 rounded-md border border-gray-300
                text-sm bg-white focus:ring-2 focus:ring-[#2A9D8F]/60 outline-none"
              />
              <input
                {...register("cvv")}
                placeholder="CVV"
                className="px-3 py-2 rounded-md border border-gray-300
                text-sm bg-white focus:ring-2 focus:ring-[#2A9D8F]/60 outline-none"
              />
            </div>

            <textarea
              {...register("address")}
              rows="2"
              placeholder="Billing Address"
              className="w-full px-3 py-2 rounded-md border border-gray-300
              text-sm bg-white focus:ring-2 focus:ring-[#2A9D8F]/60 outline-none"
            />
            <p className="text-red-500 text-[11px]">
              {errors.address?.message}
            </p>

            <div className="bg-[#2A9D8F]/10 text-[#2B2D42] text-[11px] p-2 rounded">
              🔒 Encrypted & Secure Payment
            </div>

            <button
              type="submit"
              disabled={!isValid || mutation.isPending}
              className={`w-full py-2 rounded-md text-sm font-semibold transition-all
              ${
                isValid
                  ? "bg-gradient-to-r from-[#3D5A80] to-[#2A9D8F] text-white hover:scale-[1.02]"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {mutation.isPending ? "Processing..." : "Confirm & Subscribe"}
            </button>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#F4F1EC] p-5 md:p-6 border-l border-[#E9C46A]/40 flex flex-col">

          <h3 className="text-sm font-bold text-[#3D5A80] mb-3">
            Order Summary
          </h3>

          <div className="bg-white rounded-lg p-4 border border-[#E9C46A]/40 shadow-sm">

            <p className="text-[11px] text-[#2B2D42]/70">Plan</p>
            <h4 className="text-md font-semibold text-[#3D5A80]">
              {selectedPlan.name}
            </h4>

            <div className="mt-3 space-y-2 text-[12px] text-[#2B2D42]/70">

              <div className="flex justify-between">
                <span>Subscription</span>
                <span>₹{selectedPlan.price}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹0</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold text-[#2B2D42]">
                <span>Total</span>
                <span>₹{selectedPlan.price}</span>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-[11px] text-[#2B2D42]/70">
              <p>✔ Unlimited courses</p>
              <p>✔ Certificates</p>
              <p>✔ Priority support</p>
              <p>✔ Cancel anytime</p>
            </div>

            <div className="mt-4 text-center text-[11px] bg-[#E9C46A]/30 
            text-[#2B2D42] py-1.5 rounded">
              ⭐ Premium Learning Access
            </div>

          </div>

          <p className="text-[10px] text-[#2B2D42]/60 mt-4">
            By confirming, you agree to our Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;
