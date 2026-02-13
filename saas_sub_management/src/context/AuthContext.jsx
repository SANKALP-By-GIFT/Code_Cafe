import { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/tokenStorage";
import emailjs from "@emailjs/browser";

export const AuthContext = createContext();

const USERS_KEY = "edupro_users";
const OTP_KEY = "edupro_pending_user";
const OTP_EXPIRY_TIME = 2 * 60 * 1000; // 2 minutes

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(null);

  // Load token on refresh
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Generate 6 digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // =========================
  // REGISTER (Generate OTP + Send Email)
  // =========================
  const register = async (name, email, password) => {
    const existingUsers =
      JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const userExists = existingUsers.find(
      (user) => user.email === email
    );

    if (userExists) {
      throw new Error("User already exists");
    }

    const otp = generateOTP();

    const otpData = {
      name,
      email,
      password,
      otp,
      createdAt: Date.now(),
    };

    localStorage.setItem(OTP_KEY, JSON.stringify(otpData));

    try {
      await emailjs.send(
        "service_9bo1u4p",
        "template_cotmgvy",
        {
          to_email: email,
          otp: otp,
        },
        "NsPfZpETlmSsMNI4R"
      );
    } catch (error) {
      localStorage.removeItem(OTP_KEY);
      throw new Error("Failed to send OTP email");
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const verifyOTP = (enteredOtp) => {
    const pendingUser =
      JSON.parse(localStorage.getItem(OTP_KEY));

    if (!pendingUser) {
      throw new Error("OTP expired. Please register again.");
    }

    // Check expiry
    const now = Date.now();
    if (now - pendingUser.createdAt > OTP_EXPIRY_TIME) {
      localStorage.removeItem(OTP_KEY);
      throw new Error("OTP expired. Please register again.");
    }

    if (pendingUser.otp !== enteredOtp) {
      throw new Error("Invalid OTP");
    }

    const existingUsers =
      JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const newUser = {
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...existingUsers, newUser])
    );

    localStorage.removeItem(OTP_KEY);
  };

  // =========================
  // LOGIN
  // =========================
  const login = (email, password) => {
    const existingUsers =
      JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const fakeToken = "mock-jwt-token-12345";
    setToken(fakeToken);
    setAuthToken(fakeToken);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        register,
        verifyOTP,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
