package com.ash7nly.monolith.mapper;

import com.ash7nly.monolith.dto.response.DeliveryResponse;
import com.ash7nly.monolith.entity.Delivery;
import org.springframework.stereotype.Component;

@Component
public class DeliveryMapper {

    public DeliveryResponse toResponse(Delivery delivery) {
        if (delivery == null) return null;

        DeliveryResponse response = new DeliveryResponse();
        response.setId(delivery.getId());
        response.setShipmentId(delivery.getShipment() != null ? delivery.getShipment().getShipmentId() : null);
        response.setDriverId(delivery.getDriver() != null ? delivery.getDriver().getId() : null);
        response.setAssignedAt(delivery.getAssignedAt());
        response.setAcceptedAt(delivery.getAcceptedAt());
        response.setDeliveredAt(delivery.getDeliveredAt());
        response.setPickedUpAt(delivery.getPickedUpAt());
        response.setRecipientName(delivery.getRecipientName());
        response.setDeliveryNotes(delivery.getDeliveryNotes());
        response.setPickedUpAt(delivery.getPickedUpAt());
        response.setDeliveredAt(delivery.getDeliveredAt());
        response.setDeliveryNotes(delivery.getDeliveryNotes());
        response.setShipmentStatus(
                delivery.getShipment() != null ? delivery.getShipment().getStatus().toString() : null
        );
        response.setTrackingNumber(
                delivery.getShipment() != null ? delivery.getShipment().getTrackingNumber() : null
        );
        response.setDriverName(
                delivery.getDriver() != null && delivery.getDriver().getUser() != null ?
                        delivery.getDriver().getUser().getFullName() : null
        );

        return response;
    }

    public DeliveryResponse buildDeliveryResponse(Delivery delivery) {
        DeliveryResponse response = new DeliveryResponse();

        // Basic delivery info
        response.setId(delivery.getId());

        // Shipment info
        if (delivery.getShipment() != null) {
            response. setShipmentId(delivery. getShipment().getShipmentId());
            response.setTrackingNumber(delivery.getShipment().getTrackingNumber());
            response.setShipmentStatus(delivery.getShipment().getStatus().toString());
        }

        // Driver info
        if (delivery.getDriver() != null) {
            response.setDriverId(delivery.getDriver().getId());
            if (delivery.getDriver().getUser() != null) {
                response.setDriverName(delivery.getDriver().getUser().getFullName());
            }
        }

        // Timestamps
        response.setAssignedAt(delivery.getAssignedAt());
        response.setAcceptedAt(delivery.getAcceptedAt());
        response.setPickedUpAt(delivery. getPickedUpAt());
        response.setDeliveredAt(delivery.getDeliveredAt());

        // Delivery details
        response.setRecipientName(delivery.getRecipientName());
        response.setDeliveryNotes(delivery.getDeliveryNotes());

        return response;
    }
}

