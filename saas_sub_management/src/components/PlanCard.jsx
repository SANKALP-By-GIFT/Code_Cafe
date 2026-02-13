const PlanCard = ({ plan, onSelect }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-bold text-indigo-600 mb-4">
        {plan.name}
      </h3>

      <p className="text-4xl font-extrabold mb-6">
        ₹{plan.price}
        <span className="text-lg font-medium text-gray-500"> /month</span>
      </p>

      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-gray-600">
            ✓ {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Select Plan
      </button>
    </div>
  );
};

export default PlanCard;
