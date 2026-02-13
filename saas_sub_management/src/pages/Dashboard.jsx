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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
        <p className="text-lg font-medium text-gray-600">
          No active subscription found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">

      {/* Dashboard Card */}
      <div className="shadow-xl rounded-2xl p-10 w-full max-w-3xl bg-white border border-gray-100">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
          Subscription Dashboard
        </h2>

        {/* Plan Info */}
        <div className="rounded-xl p-6 mb-8 shadow-sm bg-indigo-50 border border-indigo-100">

          <h3 className="text-xl font-semibold mb-3 text-indigo-600">
            Current Plan
          </h3>

          <p className="text-lg font-medium text-gray-800">
            {selectedPlan.name}
          </p>

          <p className="text-gray-600">
            ₹{selectedPlan.price} / month
          </p>

          <span className="inline-block mt-3 px-3 py-1 text-sm font-semibold rounded-full bg-emerald-100 text-emerald-700">
            Active
          </span>

        </div>

        {/* Features */}
        <div className="mb-8">

          <h4 className="text-lg font-semibold mb-3 text-indigo-700">
            Included Features
          </h4>

          <ul className="space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li
                key={index}
                className="text-gray-600 flex items-center gap-2"
              >
                <span className="text-emerald-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>

        </div>

        {/* Actions */}
        <div className="flex gap-4">

          <button
            onClick={handleUpgrade}
            className="flex-1 py-3 rounded-lg font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition"
          >
            Upgrade Plan
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 rounded-lg font-semibold bg-gray-800 text-white hover:bg-black transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
