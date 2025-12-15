import { shipment_API } from "@/api/shipment";
import type { CreateShipmentPayload } from "@/types/shipment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./useNotification";

export const useGetShipments = () => {
  return useQuery({
    queryKey: ["shipments"],
    queryFn: () => shipment_API.getMyShipments(),
  });
};

export const useGetMyShipments = () => {
  return useQuery({
    queryKey: ["myShipments"],
    queryFn: () => shipment_API.getMyShipments(),
  });
};

export const useGetShipmentById = (shipmentId: number | null) => {
  return useQuery({
    queryKey: ["shipment", shipmentId],
    queryFn: () => shipment_API.getShipmentById(shipmentId!),
    enabled: shipmentId !== null,
  });
};

export const useCreateShipment = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();
  return useMutation({
    mutationFn: (payload: CreateShipmentPayload) =>
      shipment_API.createShipment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      showSuccess("Shipment created successfully");
    },
    onError: (error) => {
      console.error("Error creating shipment:", error);
      showError(
        "Failed to create shipment ",
        error instanceof Error ? error.message : undefined
      );
    },
  });
};

export const useCancelShipment = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();
  return useMutation({
    mutationFn: ({
      shipmentId,
      reason,
    }: {
      shipmentId: number;
      reason: string;
    }) =>
      shipment_API.cancelShipment(shipmentId, { cancellationReason: reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      queryClient.invalidateQueries({ queryKey: ["myShipments"] });
      showSuccess("Shipment cancelled successfully");
    },
    onError: (error) => {
      console.error("Error cancelling shipment:", error);
      showError(
        "Failed to cancel shipment",
        error instanceof Error ? error.message : undefined
      );
    },
  });
};
