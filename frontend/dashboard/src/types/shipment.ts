export type shipmentStatus =
  | " DELIVERED"
  | "FAILED"
  | "IN_TRANSIT"
  | "PICKED_UP"
  | "ASSIGNED";

export interface SHipmentListResponse {
  success: boolean;
  message: string;
  data: Data;
  timestamp: string;
}

export interface Data {
  shipments: Shipment[];
  totalCount: number;
}

export interface Shipment {
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
}

export interface CreateShipmentPayload {
  pickupAddress: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  packageWeight: string;
  packageDimension: string;
  packageDescription: string;
  cost: number;
}

export interface processShipmentPaymentPayload {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}

export interface ShipmentPaymentResponse {
  success: boolean;
  message: string;
  data: ShipmentPayment;
  timestamp: string;
}

export interface ShipmentPayment {
  paymentId: number;
  shipmentId: number;
  trackingNumber: string;
  amount: number;
  status: string;
  transactionId: any;
  cardLastFourDigits: any;
  createdAt: string;
  paidAt: any;
}

export interface ShipmentCancellationPayload   {
  cancellationReason: string;
}
