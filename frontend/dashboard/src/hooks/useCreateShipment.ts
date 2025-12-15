import { shipment_API } from "@/api/shipment";
import { useMutation } from "@tanstack/react-query";
import { type CreateShipmentPayload } from "@/types/shipment";

export const useCreateShipment = () => {
  return useMutation({
    mutationKey: ["create-shipment"],
    mutationFn: (payload: CreateShipmentPayload) =>
      shipment_API.createShipment(payload),
  });
};
