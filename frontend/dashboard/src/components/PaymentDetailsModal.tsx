import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useGetPaymentByShipmentId } from "@/hooks/payment";
import { Spinner } from "@/components/ui/spinner";
import {
  CreditCard,
  DollarSign,
  Hash,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

interface PaymentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipmentId: number;
  trackingNumber: string;
}

export const PaymentDetailsModal = ({
  open,
  onOpenChange,
  shipmentId,
  trackingNumber,
}: PaymentDetailsModalProps) => {
  const { data, isLoading, isError } = useGetPaymentByShipmentId(shipmentId);

  const payment = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-2xl border-0 shadow-xl max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CreditCard className="w-6 h-6 text-[#ef4444]" />
            Payment Details
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Spinner className="w-8 h-8 text-[#ef4444]" />
          </div>
        )}

        {isError && (
          <div className="py-8 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-gray-600">Failed to load payment details</p>
          </div>
        )}

        {payment && !isLoading && !isError && (
          <div className="space-y-4 py-2">
            {/* Status Badge */}
            <div className="flex items-center justify-center">
              <Badge
                className={`${
                  payment.status === "PAID"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                } rounded-full gap-2 px-4 py-2 text-base`}
                variant="outline"
              >
                {payment.status === "PAID" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {payment.status}
              </Badge>
            </div>

            {/* Payment Info */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Hash className="w-4 h-4" />
                  <span>Payment ID</span>
                </div>
                <span className="font-medium text-gray-900">
                  #{payment.paymentId}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Hash className="w-4 h-4" />
                  <span>Tracking Number</span>
                </div>
                <span className="font-medium text-[#ef4444]">
                  {trackingNumber}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Amount</span>
                </div>
                <span className="font-bold text-xl text-gray-900">
                  ${payment.amount.toFixed(2)}
                </span>
              </div>

              {payment.cardLastFourDigits && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span>Card</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    •••• {payment.cardLastFourDigits}
                  </span>
                </div>
              )}

              {payment.transactionId && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Hash className="w-4 h-4" />
                    <span>Transaction ID</span>
                  </div>
                  <span className="font-mono text-sm text-gray-900">
                    {payment.transactionId}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Created At</span>
                </div>
                <span className="text-gray-900">
                  {format(new Date(payment.createdAt), "MMM dd, yyyy HH:mm")}
                </span>
              </div>

              {payment.paidAt && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Paid At</span>
                  </div>
                  <span className="text-gray-900">
                    {format(new Date(payment.paidAt), "MMM dd, yyyy HH:mm")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
