import { axiosClientWithAuth } from "@/axios/client";

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  role: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
  timestamp: string;
}

export interface UpdateUserProfileRequest {
  fullName: string;
  phoneNumber?: string | null;
}

export const user_API = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await axiosClientWithAuth.get<UserProfileResponse>(
      "users/me"
    );
    console.log("User profile:", response.data);
    return response.data;
  },
  updateProfile: async (
    payload: UpdateUserProfileRequest
  ): Promise<UserProfileResponse> => {
    const response = await axiosClientWithAuth.put<UserProfileResponse>(
      "users/me",
      payload
    );
    console.log("Profile updated:", response.data);
    return response.data;
  },
};
