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

  if (!selectedPlan) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">
          No active subscription found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">

        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          EduPro Subscription Dashboard
        </h2>

        <div className="bg-indigo-50 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            Current Plan
          </h3>

          <p className="text-lg font-medium">
            {selectedPlan.name} Plan
          </p>

          <p className="text-gray-600">
            ₹{selectedPlan.price} / month
          </p>

          <p className="mt-2 text-green-600 font-semibold">
            Status: Active
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">
            Included Features:
          </h4>

          <ul className="space-y-2">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="text-gray-600">
                ✓ {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleUpgrade}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Upgrade Plan
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
