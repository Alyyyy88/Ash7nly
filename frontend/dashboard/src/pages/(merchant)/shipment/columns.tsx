import { type ColumnDef } from "@tanstack/react-table";
import type { Shipment } from "@/types/shipment";
import {
  MapPin,
  User,
  Mail,
  Calendar,
  DollarSign,
  Activity,
  Hash,
  CreditCard,
  XCircle,
  MoreVertical,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Link } from "react-router";

const statusConfigs = {
  DELIVERED: {
    className: "bg-green-100 text-green-800 border-green-200",
    dotColor: "bg-green-500",
  },
  FAILED: {
    className: "bg-red-100 text-red-800 border-red-200",
    dotColor: "bg-red-500",
  },
  IN_TRANSIT: {
    className: "bg-cyan-100 text-cyan-800 border-cyan-200",
    dotColor: "bg-cyan-500",
  },
  PICKED_UP: {
    className: "bg-purple-100 text-purple-800 border-purple-200",
    dotColor: "bg-purple-500",
  },
  ASSIGNED: {
    className: "bg-blue-100 text-blue-800 border-blue-200",
    dotColor: "bg-blue-500",
  },
  CREATED: {
    className: "bg-red-100 text-[#ef4444] border-red-200",
    dotColor: "bg-[#ef4444]",
  },
  CANCELLED: {
    className: "bg-orange-100 text-orange-800 border-orange-200",
    dotColor: "bg-orange-500",
  },
};

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "trackingNumber",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Hash className="w-4 h-4" />
        <span>Tracking Number</span>
      </div>
    ),
    cell: ({ row }) => {
      const trackingNumber: string = row.getValue("trackingNumber");
      return (
        <Link
          to={`/tracking/${trackingNumber}`}
          className="font-medium text-[#ef4444] hover:underline"
        >
          {trackingNumber}
        </Link>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <User className="w-4 h-4" />
        <span>Customer</span>
      </div>
    ),
    cell: ({ row }) => {
      const customerName: string = row.getValue("customerName");
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium text-foreground">{customerName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "customerEmail",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Mail className="w-4 h-4" />
        <span>Email</span>
      </div>
    ),
    cell: ({ row }) => {
      const email: string = row.getValue("customerEmail");
      return (
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground text-sm">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>Delivery Address</span>
      </div>
    ),
    cell: ({ row }) => {
      const address: string = row.getValue("deliveryAddress");
      return (
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground text-sm max-w-50 truncate">
            {address}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Activity className="w-4 h-4" />
        <span>Status</span>
      </div>
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const cleanStatus = status.trim();
      const statusConfig = statusConfigs[
        cleanStatus as keyof typeof statusConfigs
      ] || {
        className: "bg-gray-100 text-gray-800 border-gray-200",
        dotColor: "bg-gray-400",
      };

      return (
        <div className="flex items-center gap-2">
          <Badge
            className={`${statusConfig.className} rounded-full gap-1`}
            variant="outline"
          >
            <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`} />
            {cleanStatus.replace("_", " ")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <DollarSign className="w-4 h-4" />
        <span>Cost</span>
      </div>
    ),
    cell: ({ row }) => {
      const cost: number = row.getValue("cost");
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium text-foreground">${cost.toFixed(2)}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>Created</span>
      </div>
    ),
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      const formattedDate = format(new Date(createdAt), "MMM dd, yyyy");

      return (
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground text-sm">{formattedDate}</div>
        </div>
      );
    },
  },
];

interface ColumnActions {
  onPayNow: (shipment: Shipment) => void;
  onViewPayment: (shipment: Shipment) => void;
  onCancel: (shipment: Shipment) => void;
  onViewShipment: (shipment: Shipment) => void;
}

export const createColumns = (
  actions: ColumnActions
): ColumnDef<Shipment>[] => {
  return [
    ...columns,
    {
      id: "actions",
      header: () => (
        <div className="flex items-center justify-end gap-2 text-sm font-medium text-muted-foreground pr-4">
          <span>Actions</span>
        </div>
      ),
      cell: ({ row }) => {
        const shipment = row.original;
        // Consider shipment paid if status is DELIVERED or if it's an old status
        // In a real app, you'd check a payment status field
        const canShowPayment = shipment.status.trim() !== "CANCELLED";
        const isLikelyUnpaid = !["DELIVERED", "FAILED", "CANCELLED"].includes(
          shipment.status.trim()
        );

        return (
          <div className="flex items-center justify-end gap-2">
            {/* View Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => actions.onViewShipment(shipment)}
              className="h-8 px-3 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700"
              title="View shipment details"
            >
              <Eye className="h-4 w-4" />
            </Button>

            {/* Pay Now Button - shown for likely unpaid shipments */}
            {isLikelyUnpaid && canShowPayment && (
              <Button
                onClick={() => actions.onPayNow(shipment)}
                variant="ghost"
                size="sm"
                className="text-[#ef4444] hover:text-[#dc2626] hover:bg-red-50 rounded-xl gap-1"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay</span>
              </Button>
            )}

            {/* Three-dot menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-xl hover:bg-gray-100"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl border-gray-200"
              >
                {canShowPayment && (
                  <>
                    <DropdownMenuItem
                      onClick={() => actions.onViewPayment(shipment)}
                      className="gap-2 cursor-pointer rounded-lg"
                    >
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <span>View Payment</span>
                    </DropdownMenuItem>
                    {isLikelyUnpaid && (
                      <DropdownMenuItem
                        onClick={() => actions.onPayNow(shipment)}
                        className="gap-2 cursor-pointer rounded-lg"
                      >
                        <CreditCard className="w-4 h-4 text-[#ef4444]" />
                        <span>Pay Now</span>
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                {shipment.status.trim() !== "CANCELLED" && (
                  <DropdownMenuItem
                    onClick={() => actions.onCancel(shipment)}
                    className="gap-2 cursor-pointer text-red-600 focus:text-red-600 rounded-lg"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel Shipment</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
