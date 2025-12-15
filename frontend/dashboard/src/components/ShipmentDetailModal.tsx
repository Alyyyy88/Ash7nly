import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  User,
  Mail,
  DollarSign,
  Calendar,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";

const statusColors: Record<
  string,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  CREATED: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: <Package className="w-4 h-4" />,
  },
  ASSIGNED: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: <Clock className="w-4 h-4" />,
  },
  PICKED_UP: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    icon: <Package className="w-4 h-4" />,
  },
  IN_TRANSIT: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    icon: <Clock className="w-4 h-4" />,
  },
  DELIVERED: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  FAILED: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  CANCELLED: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    icon: <X className="w-4 h-4" />,
  },
};

interface ShipmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipmentId: number | null;
  isLoading: boolean;
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
  } | null;
}

export function ShipmentDetailModal({
  open,
  onOpenChange,
  data,
  isLoading,
}: ShipmentDetailModalProps) {
  if (!data) return null;

  const colors = statusColors[data.status] || statusColors.CREATED;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Shipment Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner className="w-8 h-8 text-[#ef4444]" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg ${colors.bg}`}>
                <div className="flex items-center gap-2">
                  <span className={colors.text}>{colors.icon}</span>
                  <span className={`font-semibold ${colors.text}`}>
                    {data.status}
                  </span>
                </div>
              </div>
              {!data.active && (
                <span className="text-sm text-gray-500">Inactive</span>
              )}
            </div>

            {/* Tracking & Shipment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-gray-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Tracking Number
                      </label>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {data.trackingNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Shipment ID
                      </label>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        #{data.shipmentId}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
                        <DollarSign className="w-4 h-4" />
                        Cost
                      </div>
                      <p className="text-lg font-bold text-[#ef4444]">
                        ${data.cost.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        Created Date
                      </div>
                      <p className="text-gray-900 mt-1">
                        {format(new Date(data.createdAt), "PPp")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Details */}
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-[#ef4444] mt-1" />
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Customer Name
                      </label>
                      <p className="text-gray-900 mt-1">{data.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#ef4444] mt-1" />
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Email
                      </label>
                      <p className="text-gray-900 mt-1">{data.customerEmail}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Details */}
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Address Information
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-gray-600">
                        Pickup Address
                      </label>
                      <p className="text-gray-900 mt-1">{data.pickupAddress}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4" />
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-[#ef4444] mt-1 shrink-0" />
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-gray-600">
                        Delivery Address
                      </label>
                      <p className="text-gray-900 mt-1">
                        {data.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-300 text-gray-900"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
