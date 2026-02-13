import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
