import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetTracking } from "@/hooks/tracking";
import { Spinner } from "@/components/ui/spinner";
import {
  Truck,
  Package,
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  CREATED: {
    bg: "bg-red-100",
    text: "text-[#ef4444]",
    border: "border-red-300",
    icon: "text-[#ef4444]",
  },
  ASSIGNED: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-300",
    icon: "text-blue-500",
  },
  PICKED_UP: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-300",
    icon: "text-purple-500",
  },
  IN_TRANSIT: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border-cyan-300",
    icon: "text-cyan-500",
  },
  DELIVERED: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
    icon: "text-green-500",
  },
  FAILED: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
    icon: "text-red-500",
  },
  CANCELLED: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-300",
    icon: "text-orange-500",
  },
};

const statusIcons = {
  CREATED: FileText,
  ASSIGNED: User,
  PICKED_UP: Package,
  IN_TRANSIT: Truck,
  DELIVERED: Package,
  FAILED: AlertCircle,
  CANCELLED: AlertCircle,
};

const TrackingPage = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const { mutate: getTracking, data, isPending, isError } = useGetTracking();

  useEffect(() => {
    if (trackingNumber) {
      getTracking(trackingNumber);
    }
  }, [trackingNumber, getTracking]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ef4444] rounded-xl flex items-center justify-center shadow-sm">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Ash7nly</span>
            </Link>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[70vh]">
          <Spinner className="w-12 h-12 text-[#ef4444]" />
        </div>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ef4444] rounded-xl flex items-center justify-center shadow-sm">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Ash7nly</span>
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-red-50 border-red-200 rounded-2xl">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <p className="font-medium">
                  Tracking number not found or invalid
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { trackingHistoryList, driverName, driverPhone, driverEmail } =
    data.data;

  const currentStatus =
    trackingHistoryList[trackingHistoryList.length - 1]?.status || "CREATED";

  const createdDate = trackingHistoryList.find(
    (item) => item.status === "CREATED"
  )?.timestamp;
  const estimatedDeliveryDate = createdDate
    ? new Date(new Date(createdDate).getTime() + 3 * 24 * 60 * 60 * 1000)
    : new Date();
  const estimatedDelivery = format(
    estimatedDeliveryDate,
    "EEEE, MMMM dd, yyyy"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#ef4444] rounded-xl flex items-center justify-center shadow-sm">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Ash7nly</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">
                Tracking{" "}
                <span className="text-[#ef4444]">{trackingNumber}</span>
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[currentStatus as keyof typeof statusColors]?.bg
                } ${
                  statusColors[currentStatus as keyof typeof statusColors]?.text
                }`}
              >
                {currentStatus.replace("_", " ")}
              </span>
            </div>
            <p className="text-gray-500 mt-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Estimated Delivery:{" "}
              <span className="font-medium">{estimatedDelivery}</span>
            </p>
          </div>
        
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipment Progress */}
          <Card className="lg:col-span-2 bg-white rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Truck className="w-5 h-5 text-[#ef4444]" />
                Shipment Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trackingHistoryList.map((item, index) => {
                  const StatusIcon =
                    statusIcons[item.status as keyof typeof statusIcons] ||
                    Package;
                  const colors =
                    statusColors[item.status as keyof typeof statusColors];
                  const isLast = index === trackingHistoryList.length - 1;

                  return (
                    <div key={index} className="flex gap-4">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors?.bg} ${colors?.border} border-2`}
                        >
                          <StatusIcon className={`w-6 h-6 ${colors?.icon}`} />
                        </div>
                        {!isLast && (
                          <div className="w-0.5 h-12 bg-gray-200 my-2"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {item.status.replace("_", " ")}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {format(new Date(item.timestamp), "MMM dd, h:mm a")}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {item.status === "IN_TRANSIT" &&
                            "Package in transit to Haram"}
                          {item.status === "PICKED_UP" &&
                            "Package picked up from merchant"}
                          {item.status === "ASSIGNED" &&
                            `Assigned to driver ${driverName}`}
                          {item.status === "CREATED" && "Shipment created"}
                          {item.status === "DELIVERED" &&
                            "Package delivered successfully"}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Cairo, Nasr City
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.status === "CREATED"
                              ? "System"
                              : driverName || "Admin"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Driver Information */}
            <Card className="bg-linear-to-br from-[#ef4444] to-pink-600 text-white rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Truck className="w-5 h-5" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {driverName || "Not Assigned"}
                    </h3>
                    <p className="text-white/80 text-sm">
                      Driver Email: {driverEmail || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-white/90">Vehicle</span>
                  <span className="font-semibold text-white">ABC-1234</span>
                </div>

                {driverPhone && (
                  <Button className="w-full bg-white text-[#ef4444] hover:bg-gray-100 rounded-xl font-medium flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    {driverPhone}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card className="bg-white rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium text-gray-500">
                      FROM
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    123  Merchant St. , Cairo
                  </h4>
                  <p className="text-sm text-gray-500">Logistics Hub A-12</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-500">
                      TO
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Haram</h4>
                  <p className="text-sm text-gray-500">
                    15 Rd , Giza Governorate
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Weight</p>
                    <p className="font-semibold text-gray-900">4.5 kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                    <p className="font-semibold text-gray-900">30×20×15 cm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500 text-sm">
              © 2025 ShipTrack. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TrackingPage;
