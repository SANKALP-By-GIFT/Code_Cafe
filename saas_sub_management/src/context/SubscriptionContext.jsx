import { createContext, useState } from "react";

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <SubscriptionContext.Provider
      value={{ selectedPlan, setSelectedPlan }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
