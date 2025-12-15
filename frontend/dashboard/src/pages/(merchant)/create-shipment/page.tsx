import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCreateShipment } from "@/hooks/useCreateShipment";
import { useNotification } from "@/hooks/useNotification";
import {
  DeliveryArea,
  deliveryAreaPrices,
  deliveryAreaLabels,
} from "@/types/deliveryArea";
import {
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  Weight,
  Ruler,
  FileText,
  DollarSign,
  AlertCircle,
  CreditCard,
} from "lucide-react";

const MAX_WEIGHT = 60.0;

const CreateShipmentPage = () => {
  const navigate = useNavigate();
  const { mutate: createShipment, isPending } = useCreateShipment();
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    packageWeight: "",
    packageDimension: "",
    packageDescription: "",
  });

  const [selectedArea, setSelectedArea] = useState<DeliveryArea | "">("");
  const [calculatedCost, setCalculatedCost] = useState<number>(0);
  const [weightError, setWeightError] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [createdShipmentId, setCreatedShipmentId] = useState<number | null>(
    null
  );

  // Calculate cost when delivery area changes
  useEffect(() => {
    if (selectedArea) {
      const cost = deliveryAreaPrices[selectedArea as DeliveryArea];
      setCalculatedCost(cost);
    }
  }, [selectedArea]);

  // Check weight limit
  useEffect(() => {
    const weight = parseFloat(formData.packageWeight);
    if (!isNaN(weight) && weight > MAX_WEIGHT) {
      setWeightError(true);
    } else {
      setWeightError(false);
    }
  }, [formData.packageWeight]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (weightError) {
      showError(
        "Invalid Weight",
        `Package weight cannot exceed ${MAX_WEIGHT} kg`
      );
      return;
    }

    if (!selectedArea) {
      showError("Missing Information", "Please select a delivery area");
      return;
    }

    const payload = {
      ...formData,
      deliveryAddress: deliveryAreaLabels[selectedArea as DeliveryArea],
      cost: calculatedCost,
    };

    createShipment(payload, {
      onSuccess: (data: any) => {
        showSuccess(
          "Shipment Created",
          "Your shipment has been created successfully"
        );
        // Store the shipment ID for payment processing
        setCreatedShipmentId(data.data?.shipmentId || data.shipmentId);
        // Show payment confirmation dialog
        setShowPaymentDialog(true);
      },
      onError: (error: any) => {
        showError(
          "Failed to Create",
          error?.response?.data?.message || "Something went wrong"
        );
      },
    });
  };

  const handlePayNow = () => {
    if (createdShipmentId) {
      navigate(`/payment/${createdShipmentId}`);
    }
  };

  const handlePayLater = () => {
    setShowPaymentDialog(false);
    navigate("/merchant/shipments");
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create Shipment
            </h1>
            <p className="text-gray-500 mt-1">
              Fill in the details to create a new shipment
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/merchant/shipments")}
            className="rounded-xl border-gray-200"
          >
            Cancel
          </Button>
        </div>

        {/* Weight Alert */}
        {weightError && (
          <Alert className="bg-red-50 border-red-200 rounded-xl">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600 font-medium">
              Maximum weight allowed is {MAX_WEIGHT} kg. Please reduce the
              package weight.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <Card className="lg:col-span-2 bg-white rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="w-5 h-5 text-[#ef4444]" />
                  Shipment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Row 1: Pickup & Delivery */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="pickupAddress"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <MapPin className="w-4 h-4 text-[#ef4444]" />
                      Pickup Address
                    </Label>
                    <Input
                      id="pickupAddress"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      placeholder="Enter pickup address"
                      className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="deliveryAddress"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <MapPin className="w-4 h-4 text-[#ef4444]" />
                      Delivery Area
                    </Label>
                    <Select
                      value={selectedArea}
                      onValueChange={(value) =>
                        setSelectedArea(value as DeliveryArea)
                      }
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl">
                        <SelectValue placeholder="Select delivery area" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(deliveryAreaLabels).map(
                          ([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label} - $
                              {deliveryAreaPrices[key as DeliveryArea].toFixed(
                                2
                              )}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 2: Customer Name & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="customerName"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <User className="w-4 h-4 text-[#ef4444]" />
                      Customer Name
                    </Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="Enter customer name"
                      className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="customerPhone"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <Phone className="w-4 h-4 text-[#ef4444]" />
                      Customer Phone
                    </Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Email (full width) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="customerEmail"
                    className="flex items-center gap-2 text-gray-900"
                  >
                    <Mail className="w-4 h-4 text-[#ef4444]" />
                    Customer Email
                  </Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="customer@example.com"
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
                    required
                  />
                </div>

                {/* Row 4: Weight & Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="packageWeight"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <Weight className="w-4 h-4 text-[#ef4444]" />
                      Package Weight (kg)
                    </Label>
                    <Input
                      id="packageWeight"
                      name="packageWeight"
                      type="number"
                      step="0.1"
                      value={formData.packageWeight}
                      onChange={handleInputChange}
                      placeholder="e.g., 5.5"
                      className={`bg-gray-50 border-gray-200 text-gray-900 rounded-xl ${
                        weightError ? "border-red-500" : ""
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="packageDimension"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <Ruler className="w-4 h-4 text-[#ef4444]" />
                      Package Dimensions (cm)
                    </Label>
                    <Input
                      id="packageDimension"
                      name="packageDimension"
                      value={formData.packageDimension}
                      onChange={handleInputChange}
                      placeholder="e.g., 30x20x15"
                      className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Row 5: Description (full width) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="packageDescription"
                    className="flex items-center gap-2 text-gray-900"
                  >
                    <FileText className="w-4 h-4 text-[#ef4444]" />
                    Package Description
                  </Label>
                  <Input
                    id="packageDescription"
                    name="packageDescription"
                    value={formData.packageDescription}
                    onChange={handleInputChange}
                    placeholder="Describe the package contents"
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Price Calculator Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white rounded-2xl border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="w-5 h-5 text-[#ef4444]" />
                    Price Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">
                        Selected Area:
                      </span>
                      <span className="font-medium text-gray-900">
                        {selectedArea
                          ? deliveryAreaLabels[selectedArea as DeliveryArea]
                          : "Not selected"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">
                        Delivery Cost:
                      </span>
                      <span className="text-2xl font-bold text-[#ef4444]">
                        ${calculatedCost.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      All Delivery Areas:
                    </h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {Object.entries(deliveryAreaLabels).map(
                        ([key, label]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between text-sm py-1"
                          >
                            <span className="text-gray-600">{label}</span>
                            <span className="font-medium text-gray-900">
                              $
                              {deliveryAreaPrices[key as DeliveryArea].toFixed(
                                2
                              )}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={isPending || weightError || !selectedArea}
                className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium rounded-full py-6 text-lg shadow-lg shadow-red-500/30"
              >
                {isPending ? "Creating..." : "Create Shipment"}
              </Button>
            </div>
          </div>
        </form>

        {/* Payment Confirmation Dialog */}
        <AlertDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
        >
          <AlertDialogContent className="bg-white rounded-2xl border-0 shadow-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-2xl">
                <CreditCard className="w-6 h-6 text-[#ef4444]" />
                Proceed to Payment?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-gray-600 pt-2">
                Your shipment has been created successfully! Would you like to
                process the payment now or pay later?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel
                onClick={handlePayLater}
                className="rounded-xl border-gray-200"
              >
                Pay Later
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handlePayNow}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-xl"
              >
                Pay Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default CreateShipmentPage;
