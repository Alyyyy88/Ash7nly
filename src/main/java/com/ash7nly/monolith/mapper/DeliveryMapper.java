//package com.ash7nly.monolith.mapper;
//
//import com.ash7nly.monolith.dto.response.DeliveryResponse;
//import com.ash7nly.monolith.entity.Delivery;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DeliveryMapper {
//
//    public DeliveryResponse toResponse(Delivery delivery) {
//        if (delivery == null) return null;
//
//        DeliveryResponse response = new DeliveryResponse();
//        response.setId(delivery.getId());
//        response.setShipmentId(delivery.getShipment() != null ? delivery.getShipment().getId() : null);
//        response.setDriverId(delivery.getDriver() != null ? delivery.getDriver().getId() : null);
//        response.setAssignedAt(delivery.getAssignedAt());
//        response.setAcceptedAt(delivery.getAcceptedAt());
//        response.setDeliveredAt(delivery.getDeliveredAt());
//        response.setPickedUpAt(delivery.getPickedUpAt());
//        response.setRecipientName(delivery.getRecipientName());
//        response.setDeliveryNotes(delivery.getDeliveryNotes());
//        return response;
//    }
//}
//
