import { USers_API } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => USers_API.getUserProfile(),
  });
}