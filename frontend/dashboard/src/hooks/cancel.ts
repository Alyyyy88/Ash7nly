import { shipment_API } from "@/api/shipment";
import { useMutation } from "@tanstack/react-query";
import type { ShipmentCancellationPayload } from "@/types/shipment";

export const useCancelShipment = () => {
  return useMutation({
    mutationKey: ["cancel-shipment"],
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: number;
      payload: ShipmentCancellationPayload;
    }) => shipment_API.cancelShipment(shipmentId, payload),
  });
};
