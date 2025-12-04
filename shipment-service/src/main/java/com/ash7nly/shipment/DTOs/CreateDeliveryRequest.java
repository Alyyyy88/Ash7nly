package com.ash7nly.shipment.DTOs;

import java.time.LocalDateTime;

public class CreateDeliveryRequest {

    private Long shipmentId;
    private String recipientName;
    private LocalDateTime assignedAt;
    private String deliveryNotes;
    private Long driverId;

    public CreateDeliveryRequest() {
    }

    public CreateDeliveryRequest(Long shipmentId, String recipientName) {
        this.shipmentId = shipmentId;
        this.recipientName = recipientName;
        this.assignedAt = null;
        this. driverId = null;
    }

    public CreateDeliveryRequest(Long shipmentId, String recipientName,
                                 LocalDateTime assignedAt, String deliveryNotes, Long driverId) {
        this.shipmentId = shipmentId;
        this.recipientName = recipientName;
        this.assignedAt = assignedAt;
        this.deliveryNotes = deliveryNotes;
        this.driverId = driverId;
    }

    public Long getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(Long shipmentId) {
        this. shipmentId = shipmentId;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this. recipientName = recipientName;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public String getDeliveryNotes() {
        return deliveryNotes;
    }

    public void setDeliveryNotes(String deliveryNotes) {
        this.deliveryNotes = deliveryNotes;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }


}