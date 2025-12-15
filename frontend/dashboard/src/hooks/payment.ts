import { shipment_API } from "@/api/shipment";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { processShipmentPaymentPayload } from "@/types/shipment";

export const useProcessPayment = () => {
  return useMutation({
    mutationKey: ["process-payment"],
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: number;
      payload: processShipmentPaymentPayload;
    }) => shipment_API.processShipmentPayment(shipmentId, payload),
  });
};

export const useGetPaymentByShipmentId = (shipmentId: number) => {
  return useQuery({
    queryKey: ["payment", shipmentId],
    queryFn: () => shipment_API.getPaymentByShipmentId(shipmentId),
    enabled: !!shipmentId,
  });
};
