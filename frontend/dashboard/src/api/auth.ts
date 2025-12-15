import { axiosClient } from "@/axios/client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

export const auth_api = {
  login: async (data: LoginRequest) : Promise<AuthResponse> => {
    const response = await axiosClient.post("/auth/login", data);
    console.log("API login response:", response.data);
    return response.data;
  },
  register: async (data: RegisterRequest) => {
    const response = await axiosClient.post("/auth/register", data);
    return response.data;
  },
};
