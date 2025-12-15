import { axiosClientWithAuth } from "@/axios/client";
import type {
  CreateShipmentPayload,
  processShipmentPaymentPayload,
  ShipmentCancellationPayload,
  SHipmentListResponse,
} from "@/types/shipment";

export interface ShipmentDetailResponse {
  success: boolean;
  message: string;
  data: {
    shipmentId: number;
    trackingNumber: string;
    deliveryAddress: string;
    status: string;
    customerEmail: string;
    active: boolean;
    createdAt: string;
    merchantId: number;
    pickupAddress: string;
    customerName: string;
    cost: number;
  };
  timestamp: string;
}

export const shipment_API = {
  getMyShipments: async (): Promise<SHipmentListResponse> => {
    const response = await axiosClientWithAuth.get<SHipmentListResponse>(
      "shipments/"
    );
    console.log(response.data);
    return response.data;
  },
  getShipmentById: async (
    shipmentId: number
  ): Promise<ShipmentDetailResponse> => {
    const response = await axiosClientWithAuth.get<ShipmentDetailResponse>(
      `shipments/${shipmentId}`
    );
    console.log(response.data);
    return response.data;
  },
  createShipment: async (payload: CreateShipmentPayload) => {
    const response = await axiosClientWithAuth.post("shipments/", payload);
    console.log(response.data);
    return response.data;
  },
  processShipmentPayment: async (
    shipmentId: number,
    payload: processShipmentPaymentPayload
  ) => {
    const response = await axiosClientWithAuth.post(
      `/payments/${shipmentId}/process`,
      payload
    );
    console.log(response.data);
    return response.data;
  },
  getPaymentByShipmentId: async (shipmentId: number) => {
    const response = await axiosClientWithAuth.get(
      `/payments/shipment/${shipmentId}`
    );
    console.log(response.data);
    return response.data;
  },
  cancelShipment: async (
    shipmentId: number,
    payload: ShipmentCancellationPayload
  ) => {
    const response = await axiosClientWithAuth.post(
      `/shipments/${shipmentId}/cancel`,
      payload
    );
    console.log(response.data);
    return response.data;
  },
};
