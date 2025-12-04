// ✅ DeliveryMapper.java (in DELIVERY service)
package com. ash7nly. delivery.mapper;

import com.ash7nly.delivery. Entity.Delivery;
import com.ash7nly.delivery. dto.CreateDeliveryRequest;
import com.ash7nly.delivery.dto.DeliveryResponse;

public class DeliveryMapper {

    public static Delivery toEntity(CreateDeliveryRequest request) {
        if (request == null) return null;

        Delivery delivery = new Delivery();
        delivery.setShipmentId(request.getShipmentId());
        delivery.setRecipientName(request.getRecipientName());
        delivery.setAssignedAt(request.getAssignedAt());
        delivery.setDriver(null);

        return delivery;
    }

    public static DeliveryResponse toResponse(Delivery delivery) {
        if (delivery == null) return null;

        DeliveryResponse response = new DeliveryResponse();
        response. setId(delivery. getId());
        response.setShipmentId(delivery.getShipmentId());
        response.setRecipientName(delivery.getRecipientName());
        response.setAssignedAt(delivery. getAssignedAt());
        response. setAcceptedAt(delivery.getAcceptedAt());
        response.setDeliveredAt(delivery.getDeliveredAt());
        response.setPickedUpAt(delivery.getPickedUpAt());
        response.setDeliveryNotes(delivery.getDeliveryNotes());

        response.setDriverId(delivery.getDriver() != null ? delivery. getDriver().getId() : null);

        return response;
    }
}