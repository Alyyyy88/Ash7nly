import LoginPage from "@/pages/(auth)/LoginPage";
import RegisterPage from "@/pages/(auth)/RegisterPage";
import MerchantDashboard from "@/pages/(merchant)/page";
import TrackingPage from "@/pages/(merchant)/tracking/[trackingNumber]/page";
import TrackingSearchPage from "@/pages/(merchant)/tracking/page";
import ShipmentsPage from "@/pages/(merchant)/shipment/page";
import CreateShipmentPage from "@/pages/(merchant)/create-shipment/page";
import PaymentPage from "@/pages/(merchant)/payment/[shipmentId]/page";
import { createBrowserRouter } from "react-router";
import AuthRouter from "./AuthRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRouter />,
    children: [
      { path: "", element: <MerchantDashboard /> },
      { path: "dashboard", element: <MerchantDashboard /> },
      { path: "merchant", element: <MerchantDashboard /> },
      { path: "merchant/shipments", element: <ShipmentsPage /> },
      { path: "tracking", element: <TrackingSearchPage /> },
      { path: "create-shipment", element: <CreateShipmentPage /> },
      { path: "payment/:shipmentId", element: <PaymentPage /> },
      { path: "tracking/:trackingNumber", element: <TrackingPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);
