export const fetchPlans = async () => {
  const response = await fetch("http://localhost:5000/plans");

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return response.json();
};
