import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetTracking } from "@/hooks/tracking";
import {
  Truck,
  Search,
  AlertCircle,
  Package,
  User,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

const TrackingSearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const {
    mutate: getTracking,
    data,
    isPending,
    isError,
    error,
  } = useGetTracking();

  const handleSearch = () => {
    if (searchInput.trim()) {
      getTracking(searchInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const trackingData = data?.data;

  return (
    <DashboardLayout>
      <div className="space-y-6 p-8 bg-gray-50">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Track Shipment</h1>
          <p className="text-gray-500 mt-1">
            Enter your tracking number to view shipment details
          </p>
        </div>

        {/* Search Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter tracking number (e.g., TRKF3E681278B85)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-11 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isPending || !searchInput.trim()}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium h-11 px-6"
              >
                {isPending ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isPending && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Spinner className="w-12 h-12 text-[#ef4444] mx-auto mb-4" />
              <p className="text-gray-600">Searching for your shipment...</p>
            </div>
          </div>
        )}

        {isError && (
          <Card className="border border-red-300 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900">
                    Shipment Not Found
                  </h3>
                  <p className="text-red-700 text-sm mt-1">
                    {error instanceof Error
                      ? error.message
                      : "The tracking number you entered was not found. Please verify and try again."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {trackingData && !isPending && (
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="border border-gray-200">
              <CardHeader className={`bg-blue-50 rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className={`w-6 h-6 text-blue-500`} />
                    <div>
                      <CardTitle className={`text-blue-700`}>
                        In Transit
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Latest update available
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Shipment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-gray-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-[#ef4444] mt-1" />
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Driver Name
                      </label>
                      <p className="text-gray-900 font-medium mt-2">
                        {trackingData.driverName || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Driver Email
                      </label>
                      <p className="text-gray-900 font-medium mt-2">
                        {trackingData.driverEmail || "Not Available"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Driver Phone
                      </label>
                      <p className="text-gray-900 font-medium mt-2">
                        {trackingData.driverPhone || "Not Available"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Tracking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.trackingHistoryList &&
                  trackingData.trackingHistoryList.length > 0 ? (
                    trackingData.trackingHistoryList.map((event, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-[#ef4444] rounded-full mt-2"></div>
                          {idx <
                            trackingData.trackingHistoryList.length - 1 && (
                            <div className="w-1 h-12 bg-gray-300"></div>
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-semibold text-gray-900">
                            {event.status}
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(event.timestamp), "PPp")}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No tracking history available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Delivery details from tracking API
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {!isPending && !isError && !trackingData && (
          <Card className="border border-gray-200 bg-gray-50">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Enter a tracking number to get started
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrackingSearchPage;
