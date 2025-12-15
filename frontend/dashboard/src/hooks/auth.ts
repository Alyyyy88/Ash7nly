import { auth_api } from "@/api/auth";
import type { LoginRequest, RegisterRequest } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useNotification } from "./useNotification";
import { useAuthStore } from "@/stores/auth";

export const useLogin = () => {
  const { showSuccess, showError } = useNotification();
  const nav = useNavigate();
  const { setAuthState } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => auth_api.login(data),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      const token = data.data.accessToken;
      localStorage.setItem("auth_token", token);
      setAuthState(true, data.data.user, token);
      nav("/dashboard");
      showSuccess("Login successful!", "Welcome back to Ash7nly Dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      showError(
        "Login failed",
        error?.response?.data?.message || "Invalid email or password"
      );
    },
  });
};

export const useRegister = () => {
  const { showSuccess, showError } = useNotification();

  const nav = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterRequest) => auth_api.register(data),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      showSuccess(
        "Registration successful!",
        "Your account has been created successfully"
      );
      nav("/login");
    },
    onError: (error: any) => {
      console.error("Registration failed:", error);
      showError(
        "Registration failed",
        error?.response?.data?.message || "Something went wrong"
      );
    },
  });
};
