import { user_API } from "@/api/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => user_API.getProfile(),
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { fullName: string; phoneNumber?: string | null }) =>
      user_API.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
