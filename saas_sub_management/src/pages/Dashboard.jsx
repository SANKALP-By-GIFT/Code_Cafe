import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSubscription } from "../hooks/useSubscription";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { selectedPlan } = useSubscription();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUpgrade = () => {
    navigate("/plans");
  };

  // No subscription fallback
  if (!selectedPlan) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F1EC]">
        <p className="text-lg font-medium text-[#2B2D42]">
          No active subscription found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6 bg-[#F4F1EC]">

      {/* Dashboard Card */}
      <div className="shadow-xl rounded-2xl p-10 w-full max-w-3xl bg-white border border-[#E9C46A]">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-8 text-center text-[#3D5A80]">
          Subscription Dashboard
        </h2>

        {/* Plan Info */}
        <div className="rounded-xl p-6 mb-8 shadow-sm bg-[#F4F1EC] border border-[#E9C46A]">

          <h3 className="text-xl font-semibold mb-3 text-[#3D5A80]">
            Current Plan
          </h3>

          <p className="text-lg font-medium text-[#2B2D42]">
            {selectedPlan.name}
          </p>

          <p className="text-[#2B2D42]">
            ₹{selectedPlan.price} / month
          </p>

          <span className="inline-block mt-3 px-4 py-1 text-sm font-semibold rounded-full bg-[#2A9D8F] text-white">
            Active
          </span>

        </div>

        {/* Features */}
        <div className="mb-8">

          <h4 className="text-lg font-semibold mb-3 text-[#3D5A80]">
            Included Features
          </h4>

          <ul className="space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li
                key={index}
                className="text-[#2B2D42] flex items-center gap-2"
              >
                <span className="text-[#2A9D8F] font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>

        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">

          <button
            onClick={handleUpgrade}
            className="flex-1 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #3D5A80, #2A9D8F)",
            }}
          >
            Upgrade Plan
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 rounded-lg font-semibold bg-[#2B2D42] text-white hover:opacity-90 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
