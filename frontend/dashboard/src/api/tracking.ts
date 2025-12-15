import { axiosClient } from "@/axios/client";
import type { TrackingHistoryResponse } from "@/types/tracking";

export const Tracking_API = {
  getTrackingHistory: async (trackingNumber: string): Promise<TrackingHistoryResponse> => {
    const response = await axiosClient.get<TrackingHistoryResponse>(
      `shipments/track/${trackingNumber}`
    );
    console.log("Tracking API Response:", response.data);
    return response.data;
  },
};
