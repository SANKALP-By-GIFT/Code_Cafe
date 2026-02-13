const PlanCard = ({ plan, onSelect }) => {
  return (
    <div
      className="
        bg-white rounded-2xl p-8
        shadow-md hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-2
        flex flex-col justify-between
      "
      style={{
        border: "1px solid #E9C46A",
      }}
    >
      {/* Title */}
      <h3
        className="text-2xl font-bold mb-4"
        style={{ color: "#3D5A80" }}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <p
        className="text-4xl font-extrabold mb-6"
        style={{ color: "#2B2D42" }}
      >
        ₹{plan.price}
        <span
          className="text-lg font-medium ml-1"
          style={{ color: "#6B7280" }}
        >
          /month
        </span>
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-8">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm"
            style={{ color: "#2B2D42" }}
          >
            <span style={{ color: "#2A9D8F" }}>✔</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Premium Button */}
      <button
        onClick={() => onSelect(plan)}
        className="
          w-full py-3 rounded-xl font-semibold text-white
          transition-all duration-300
          shadow-md hover:shadow-xl
          hover:scale-105 active:scale-95
        "
        style={{
          background:
            "linear-gradient(135deg, #3D5A80, #2A9D8F)",
        }}
      >
        Select Plan
      </button>
    </div>
  );
};

export default PlanCard;
