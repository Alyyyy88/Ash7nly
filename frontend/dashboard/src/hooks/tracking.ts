import { Tracking_API } from "@/api/tracking";
import { useMutation } from "@tanstack/react-query";

export const useGetTracking = () => {
  return useMutation({
    mutationKey: ["get-tracking"],
    mutationFn: async (trackingNumber: string) =>
      Tracking_API.getTrackingHistory(trackingNumber),
  });
};
