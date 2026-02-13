import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!selectedPlan) {
    navigate("/plans");
    return null;
  }

  return (
    <div className="flex justify-center items-center py-16 px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Billing Details
        </h2>

        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Selected Plan:{" "}
            <span className="text-indigo-600">
              {selectedPlan.name} (₹{selectedPlan.price}/month)
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("cardNumber")}
              placeholder="Card Number"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm">{errors.cardNumber?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                {...register("expiry")}
                placeholder="MM/YY"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
              <p className="text-red-500 text-sm">{errors.expiry?.message}</p>
            </div>

            <div>
              <input
                {...register("cvv")}
                placeholder="CVV"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
              <p className="text-red-500 text-sm">{errors.cvv?.message}</p>
            </div>
          </div>

          <div>
            <textarea
              {...register("address")}
              placeholder="Billing Address"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>

          <button
            type="submit"
            disabled={!isValid || mutation.isPending}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isValid
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {mutation.isPending ? "Processing..." : "Confirm Payment"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Billing;
