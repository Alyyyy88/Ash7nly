export interface AvailableDeliveryResponse {
  success: boolean;
  message: string;
  data: AvailableDelivery[];
  timestamp: string;
}

export interface AvailableDelivery {
  shipmentId: number;
  trackingNumber: string;
  deliveryAdress: string;
  status: string;
  customerEmail: string;
  active: boolean;
  createdAt: any;
  merchantId: number;
  pickupAdress: string;
  customerName: string;
  cost: number;
}

export interface ActiveDeliveryResponse {
  success: boolean;
  message: string;
  data: Data;
  timestamp: string;
}

export interface Data {
  deliveries: Delivery[];
  totalCount: number;
}

export interface Delivery {
  id: number;
  shipmentId: number;
  trackingNumber: any;
  driverId: number;
  driverName: any;
  assignedAt: string;
  acceptedAt: string;
  pickedUpAt: any;
  deliveredAt: any;
  recipientName: string;
  deliveryNotes: any;
  shipmentStatus: string;
  pickupAdress?: string;
  deliveryAdress?: string;
  cost?: number;
}
