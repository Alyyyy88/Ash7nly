package com.ash7nly.monolith.service;

import com.ash7nly.monolith.entity.Delivery;
import com.ash7nly.monolith.entity.ShipmentEntity;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationService {

    private final EmailService emailService;

    public NotificationService(EmailService emailService) {
        this.emailService = emailService;
    }


    public void sendShipmentCreatedNotification(ShipmentEntity shipment, String customerEmail) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("trackingNumber", shipment.getTrackingNumber());
        variables.put("customerName", shipment.getCustomerName());
        variables.put("status", shipment.getStatus().toString());
        variables.put("packageWeight", shipment.getPackageWeight());
        variables.put("packageDimension", shipment.getPackageDimension());
        variables.put("deliveryArea", shipment.getDeliveryAdress().toString());
        variables.put("cost", String.format("%.2f", shipment.getCost()));

        System.out.println("📧 Sending shipment notification to: " + customerEmail);

        emailService.sendTemplatedEmail(
                customerEmail,
                "Shipment Created - " + shipment.getTrackingNumber(),
                "shipment-created",
                variables
        );
    }


    public void sendStatusUpdateNotification(Delivery delivery, String customerEmail) {
        try {
            if (delivery == null || delivery.getShipment() == null || customerEmail == null || customerEmail.isBlank()) {
                System.err.println("⚠️ Cannot send status update:  invalid parameters");
                return;
            }

            ShipmentEntity shipment = delivery.getShipment();

            Map<String, Object> variables = new HashMap<>();
            variables.put("trackingNumber", shipment.getTrackingNumber() != null ? shipment.getTrackingNumber() : "N/A");
            variables.put("customerName", shipment.getCustomerName() != null ? shipment.getCustomerName() : "Customer");
            variables.put("status", shipment.getStatus() != null ? shipment.getStatus().toString() : "UNKNOWN");
            variables.put("currentLocation", shipment.getDeliveryAdress() != null ? shipment.getDeliveryAdress() : "Unknown");
            variables.put("updatedAt", java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMM dd, yyyy HH:mm")));

            // Add driver info if available
            if (delivery.getDriver() != null && delivery.getDriver().getUser() != null) {
                variables.put("driverName", delivery.getDriver().getUser().getFullName());
            } else {
                variables.put("driverName", null);
            }

            String subject = getStatusSubject(shipment.getStatus().toString(), shipment.getTrackingNumber());

            emailService.sendTemplatedEmail(
                    customerEmail,
                    subject,
                    "update-status",
                    variables
            );

            System.out.println("✅Status update notification sent successfully for status: " + shipment.getStatus());

        } catch (Exception e) {
            System.err. println(" Failed to send status update notification: " + e. getMessage());
            e.printStackTrace();
        }
    }


    private String getStatusSubject(String status, String trackingNumber) {
        return switch (status) {
            case "ASSIGNED" -> "Driver Assigned - " + trackingNumber;
            case "PICKED_UP" -> "Package Picked Up - " + trackingNumber;
            case "IN_TRANSIT" -> "Your Package is On The Way - " + trackingNumber;
            case "DELIVERED" -> "Package Delivered!  - " + trackingNumber;
            case "FAILED" -> "Delivery Attempt Failed - " + trackingNumber;
            case "CANCELLED" -> "Shipment Cancelled - " + trackingNumber;
            default -> "Shipment Status Update - " + trackingNumber;
        };
    }
}