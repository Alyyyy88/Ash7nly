export interface TrackingHistoryResponse {
  success: boolean;
  message: string;
  data: Data;
  timestamp: string;
}

export interface Data {
  trackingHistoryList: TrackingHistoryList[];
  driverPhone: string;
  driverName: string;
  driverEmail: string;
}

export interface TrackingHistoryList {
  status: string;
  timestamp: string;
}
