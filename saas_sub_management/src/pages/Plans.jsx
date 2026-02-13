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

  if (isError) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-lg font-medium"
        style={{
          backgroundColor: "#F4F1EC",
          color: "#2B2D42",
        }}
      >
        Failed to load learning plans
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-16 px-6"
      style={{ backgroundColor: "#F4F1EC" }}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "#3D5A80" }}
        >
          Choose Your Learning Plan
        </h2>

        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "#2B2D42" }}
        >
          Unlock structured learning paths, premium mentorship, and career-ready skills.
        </p>

        {/* Decorative accent */}
        <div
          className="w-24 h-1 mx-auto mt-6 rounded-full"
          style={{ backgroundColor: "#E9C46A" }}
        />
      </div>

      {/* Plans Grid Container */}
      <div
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 p-10 rounded-3xl shadow-xl"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E9C46A",
        }}
      >
        {data.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Plans;
