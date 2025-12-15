import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCancelShipment } from "@/hooks/cancel";
import { useNotification } from "@/hooks/useNotification";
import { XCircle } from "lucide-react";

const cancelSchema = z.object({
  cancellationReason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must not exceed 500 characters"),
});

type CancelFormData = z.infer<typeof cancelSchema>;

interface CancelShipmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipmentId: number;
  trackingNumber: string;
  onSuccess?: () => void;
}

export const CancelShipmentModal = ({
  open,
  onOpenChange,
  shipmentId,
  trackingNumber,
  onSuccess,
}: CancelShipmentModalProps) => {
  const { mutate: cancelShipment, isPending } = useCancelShipment();
  const { showSuccess, showError } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CancelFormData>({
    resolver: zodResolver(cancelSchema),
  });

  const onSubmit = (data: CancelFormData) => {
    cancelShipment(
      {
        shipmentId,
        payload: data,
      },
      {
        onSuccess: () => {
          showSuccess(
            "Shipment Cancelled",
            `Shipment ${trackingNumber} has been cancelled successfully`
          );
          reset();
          onOpenChange(false);
          onSuccess?.();
        },
        onError: (error: any) => {
          showError(
            "Cancellation Failed",
            error?.response?.data?.message || "Something went wrong"
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-2xl border-0 shadow-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <XCircle className="w-6 h-6 text-[#ef4444]" />
            Cancel Shipment
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 pt-2">
            Are you sure you want to cancel shipment{" "}
            <span className="font-semibold text-[#ef4444]">
              {trackingNumber}
            </span>
            ? Please provide a reason for cancellation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cancellationReason" className="text-gray-900">
              Reason for Cancellation
            </Label>
            <Input
              id="cancellationReason"
              {...register("cancellationReason")}
              placeholder="Enter the reason for cancellation..."
              className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
            />
            {errors.cancellationReason && (
              <p className="text-sm text-red-600">
                {errors.cancellationReason.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border-gray-200"
            >
              Keep Shipment
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-xl"
            >
              {isPending ? "Cancelling..." : "Cancel Shipment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
