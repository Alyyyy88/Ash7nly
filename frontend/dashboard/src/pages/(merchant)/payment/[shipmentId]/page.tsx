import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProcessPayment } from "@/hooks/payment";
import { useNotification } from "@/hooks/useNotification";
import { CreditCard, User, Calendar, Lock, DollarSign } from "lucide-react";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must be at most 19 digits")
    .regex(/^\d+$/, "Card number must contain only digits"),
  cardHolderName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format. Use MM/YY"),
  cvv: z
    .string()
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentPage = () => {
  const navigate = useNavigate();
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const { mutate: processPayment, isPending } = useProcessPayment();
  const { showSuccess, showError } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const cardNumber = watch("cardNumber");
  const expiryDate = watch("expiryDate");

  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16) {
      setValue("cardNumber", value);
    }
  };

  // Format expiry date
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setValue("expiryDate", value);
  };

  const onSubmit = (data: PaymentFormData) => {
    if (!shipmentId) {
      showError("Error", "Shipment ID not found");
      return;
    }

    processPayment(
      {
        shipmentId: parseInt(shipmentId),
        payload: data,
      },
      {
        onSuccess: () => {
          showSuccess(
            "Payment Successful",
            "Your payment has been processed successfully"
          );
          navigate("/merchant/shipments");
        },
        onError: (error: any) => {
          showError(
            "Payment Failed",
            error?.response?.data?.message || "Something went wrong"
          );
        },
      }
    );
  };

  // Format card number for display
  const formatCardNumber = (num: string) => {
    if (!num) return "";
    return num.replace(/(\d{4})/g, "$1 ").trim();
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Payment Processing
            </h1>
            <p className="text-gray-500 mt-1">
              Complete your payment for shipment #{shipmentId}
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

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Card Preview */}
            <Card className="bg-linear-to-br from-[#ef4444] to-[#dc2626] text-white rounded-2xl border-0 shadow-xl p-6 h-56 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <CreditCard className="w-12 h-12" />
                  <span className="text-sm font-medium">VISA</span>
                </div>

                <div>
                  <div className="text-2xl font-mono tracking-widest mb-4">
                    {formatCardNumber(cardNumber) || "•••• •••• •••• ••••"}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs opacity-80 mb-1">Card Holder</div>
                      <div className="font-medium uppercase text-sm">
                        {watch("cardHolderName") || "YOUR NAME"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80 mb-1">Expires</div>
                      <div className="font-medium text-sm">
                        {expiryDate || "MM/YY"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Form */}
            <Card className="bg-white rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="w-5 h-5 text-[#ef4444]" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="cardNumber"
                    className="flex items-center gap-2 text-gray-900"
                  >
                    <CreditCard className="w-4 h-4 text-[#ef4444]" />
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    {...register("cardNumber")}
                    onChange={handleCardNumberChange}
                    placeholder="1234567890123456"
                    maxLength={16}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl font-mono"
                  />
                  {errors.cardNumber && (
                    <p className="text-sm text-red-600">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                {/* Card Holder Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="cardHolderName"
                    className="flex items-center gap-2 text-gray-900"
                  >
                    <User className="w-4 h-4 text-[#ef4444]" />
                    Card Holder Name
                  </Label>
                  <Input
                    id="cardHolderName"
                    {...register("cardHolderName")}
                    placeholder="John Doe"
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl"
                  />
                  {errors.cardHolderName && (
                    <p className="text-sm text-red-600">
                      {errors.cardHolderName.message}
                    </p>
                  )}
                </div>

                {/* Expiry Date & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="expiryDate"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <Calendar className="w-4 h-4 text-[#ef4444]" />
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      {...register("expiryDate")}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl font-mono"
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-red-600">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="cvv"
                      className="flex items-center gap-2 text-gray-900"
                    >
                      <Lock className="w-4 h-4 text-[#ef4444]" />
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      {...register("cvv")}
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl font-mono"
                    />
                    {errors.cvv && (
                      <p className="text-sm text-red-600">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium rounded-full py-6 text-lg shadow-lg shadow-red-500/30"
                >
                  {isPending ? "Processing..." : "Process Payment"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentPage;
