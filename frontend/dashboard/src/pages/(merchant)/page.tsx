import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShipmentDetailModal } from "@/components/ShipmentDetailModal";
import { Spinner } from "@/components/ui/spinner";
import {
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useGetMyShipments, useGetShipmentById } from "@/hooks/shipment";

const statusColorMap: Record<
  string,
  { bg: string; text: string; badge: string }
> = {
  CREATED: {
    bg: "bg-red-100",
    text: "text-red-700",
    badge: "text-red-600 bg-red-50",
  },
  ASSIGNED: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    badge: "text-blue-600 bg-blue-50",
  },
  PICKED_UP: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    badge: "text-purple-600 bg-purple-50",
  },
  IN_TRANSIT: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    badge: "text-cyan-600 bg-cyan-50",
  },
  DELIVERED: {
    bg: "bg-green-100",
    text: "text-green-700",
    badge: "text-green-600 bg-green-50",
  },
  FAILED: {
    bg: "bg-red-100",
    text: "text-red-700",
    badge: "text-red-600 bg-red-50",
  },
  CANCELLED: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    badge: "text-orange-600 bg-orange-50",
  },
};

const MerchantDashboard = () => {
  const nav = useNavigate();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState<number | null>(
    null
  );

  const { data: shipmentsData, isLoading: shipmentsLoading } =
    useGetMyShipments();
  const { data: detailData, isLoading: detailLoading } =
    useGetShipmentById(selectedShipmentId);

  const shipments = shipmentsData?.data?.shipments || [];
  const recentShipments = shipments.slice(0, 6);

  // Calculate stats
  const totalShipments = shipments.length;
  const totalCost = shipments.reduce((sum, s) => sum + (s.cost || 0), 0);
  const deliveredCount = shipments.filter(
    (s) => s.status === "DELIVERED"
  ).length;
  const inTransitCount = shipments.filter(
    (s) => s.status === "IN_TRANSIT"
  ).length;

  const handleViewShipment = (shipmentId: number) => {
    setSelectedShipmentId(shipmentId);
    setDetailModalOpen(true);
  };

  const statsData = [
    {
      title: "Total Shipments",
      value: totalShipments.toString(),
      change: "All time",
      icon: Package,
      positive: true,
    },
    {
      title: "Total Cost",
      value: `$${totalCost.toFixed(2)}`,
      change: "All shipments",
      icon: DollarSign,
      positive: true,
    },
    {
      title: "In Transit",
      value: inTransitCount.toString(),
      change: "Currently moving",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Delivered",
      value: deliveredCount.toString(),
      change: "Completed",
      icon: Clock,
      positive: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className=" space-y-6 p-8 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Merchant
            </h1>
            <p className="text-gray-500 mt-1">
              Here's what's happening with your shipments today.
            </p>
          </div>
          <Button
            onClick={() => nav("/create-shipment")}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium rounded-md px-6 py-2.5 shadow-lg shadow-red-500/30"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Shipment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <Card
              key={stat.title}
              className="bg-white rounded-2xl border-0 shadow-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-5 h-5 text-[#ef4444]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    stat.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Shipments */}
          <Card className="lg:col-span-2 bg-white rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Recent Shipments
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => nav("/merchant/shipments")}
                  className="text-[#ef4444] hover:text-[#dc2626] font-medium"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {shipmentsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Spinner className="w-6 h-6 text-[#ef4444]" />
                </div>
              ) : recentShipments.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No shipments yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentShipments.map((shipment) => {
                    const colors =
                      statusColorMap[shipment.status] ||
                      statusColorMap.CREATED;
                    return (
                      <div
                        key={shipment.shipmentId}
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#ef4444]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {shipment.trackingNumber}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {shipment.deliveryAddress}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              ${shipment.cost.toFixed(2)}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}>
                              {shipment.status}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleViewShipment(shipment.shipmentId)
                            }
                            className="text-[#ef4444] hover:bg-red-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats Summary */}
            <Card className="bg-white rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Shipment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Delivered
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {deliveredCount}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    In Transit
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {inTransitCount}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Total Cost
                  </span>
                  <span className="text-lg font-bold text-[#ef4444]">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => nav("/tracking")}
                  className="w-full justify-start text-gray-700 hover:bg-gray-50 rounded-xl border-gray-200"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Track Shipment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => nav("/create-shipment")}
                  className="w-full justify-start text-gray-700 hover:bg-gray-50 rounded-xl border-gray-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Shipment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => nav("/merchant/shipments")}
                  className="w-full justify-start text-gray-700 hover:bg-gray-50 rounded-xl border-gray-200"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All Shipments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Shipment Detail Modal */}
      <ShipmentDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        shipmentId={selectedShipmentId}
        isLoading={detailLoading}
        data={detailData?.data || null}
      />
    </DashboardLayout>
  );
};

export default MerchantDashboard;
