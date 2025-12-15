import DashboardLayout from "@/Layouts/DashboardLayout";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetShipments, useGetShipmentById } from "@/hooks/shipment";
import { createColumns } from "./columns";
import { Spinner } from "@/components/ui/spinner";
import { ShipmentDetailModal } from "@/components/ShipmentDetailModal";
import {
  Package,
  CheckCircle,
  XCircle,
  Truck,
  PackageCheck,
  UserCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CancelShipmentModal } from "@/components/CancelShipmentModal";
import { PaymentDetailsModal } from "@/components/PaymentDetailsModal";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Shipment } from "@/types/shipment";

const ShipmentsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetShipments();

  const [cancelModal, setCancelModal] = useState<{
    open: boolean;
    shipment: Shipment | null;
  }>({ open: false, shipment: null });

  const [paymentModal, setPaymentModal] = useState<{
    open: boolean;
    shipment: Shipment | null;
  }>({ open: false, shipment: null });

  const [detailModal, setDetailModal] = useState<{
    open: boolean;
    shipmentId: number | null;
  }>({ open: false, shipmentId: null });

  const { data: detailData, isLoading: detailLoading } = useGetShipmentById(
    detailModal.shipmentId
  );

  const handlePayNow = (shipment: Shipment) => {
    navigate(`/payment/${shipment.shipmentId}`);
  };

  const handleViewPayment = (shipment: Shipment) => {
    setPaymentModal({ open: true, shipment });
  };

  const handleCancel = (shipment: Shipment) => {
    setCancelModal({ open: true, shipment });
  };

  const handleViewShipment = (shipment: Shipment) => {
    setDetailModal({ open: true, shipmentId: shipment.shipmentId });
  };

  const handleCancelSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["shipments"] });
  };

  // Calculate stats from shipments
  const stats = useMemo(() => {
    if (!data?.data?.shipments) {
      return {
        delivered: 0,
        failed: 0,
        inTransit: 0,
        pickedUp: 0,
        assigned: 0,
      };
    }

    const shipments = data.data.shipments;
    return {
      delivered: shipments.filter((s) => s.status.trim() === "DELIVERED")
        .length,
      failed: shipments.filter((s) => s.status.trim() === "FAILED").length,
      inTransit: shipments.filter((s) => s.status.trim() === "IN_TRANSIT")
        .length,
      pickedUp: shipments.filter((s) => s.status.trim() === "PICKED_UP").length,
      assigned: shipments.filter((s) => s.status.trim() === "ASSIGNED").length,
    };
  }, [data]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner className="w-12 h-12 text-[#ef4444]" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <Card className="bg-red-50 border-red-200 rounded-2xl">
            <CardContent className="pt-6">
              <p className="text-red-600 font-medium">
                Failed to load shipments. Please try again.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const statsData = [
    {
      title: "Delivered",
      value: stats.delivered,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "Failed",
      value: stats.failed,
      icon: XCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "In Transit",
      value: stats.inTransit,
      icon: Truck,
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
    {
      title: "Picked Up",
      value: stats.pickedUp,
      icon: PackageCheck,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Assigned",
      value: stats.assigned,
      icon: UserCheck,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipments</h1>
            <p className="text-gray-500 mt-1">
              Manage and track all your shipments
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {data?.data?.totalCount || 0}
            </span>{" "}
            shipments
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statsData.map((stat) => (
            <Card
              key={stat.title}
              className="bg-white rounded-2xl border-0 shadow-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipments Table */}
        <Card className="bg-white rounded-2xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Package className="w-5 h-5 text-[#ef4444]" />
              All Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={createColumns({
                onPayNow: handlePayNow,
                onViewPayment: handleViewPayment,
                onCancel: handleCancel,
                onViewShipment: handleViewShipment,
              })}
              data={data?.data?.shipments || []}
            />
          </CardContent>
        </Card>

        {/* Cancel Shipment Modal */}
        {cancelModal.shipment && (
          <CancelShipmentModal
            open={cancelModal.open}
            onOpenChange={(open) =>
              setCancelModal({ open, shipment: cancelModal.shipment })
            }
            shipmentId={cancelModal.shipment.shipmentId}
            trackingNumber={cancelModal.shipment.trackingNumber}
            onSuccess={handleCancelSuccess}
          />
        )}

        {/* Payment Details Modal */}
        {paymentModal.shipment && (
          <PaymentDetailsModal
            open={paymentModal.open}
            onOpenChange={(open) =>
              setPaymentModal({ open, shipment: paymentModal.shipment })
            }
            shipmentId={paymentModal.shipment.shipmentId}
            trackingNumber={paymentModal.shipment.trackingNumber}
          />
        )}

        {/* Shipment Detail Modal */}
        <ShipmentDetailModal
          open={detailModal.open}
          onOpenChange={(open) =>
            setDetailModal({ open, shipmentId: detailModal.shipmentId })
          }
          shipmentId={detailModal.shipmentId}
          isLoading={detailLoading}
          data={detailData?.data || null}
        />
      </div>
    </DashboardLayout>
  );
};

export default ShipmentsPage;
