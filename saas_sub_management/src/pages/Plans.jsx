import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPlans } from "../api/plansApi";
import PlanCard from "../components/PlanCard";
import Loader from "../components/Loader";
import { useSubscription } from "../hooks/useSubscription";

const Plans = () => {
  const navigate = useNavigate();
  const { setSelectedPlan } = useSubscription();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    navigate("/billing");
  };

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load plans
      </div>
    );

  return (
    <div className="py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
        Choose Your Learning Plan
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
};

export default Plans;
