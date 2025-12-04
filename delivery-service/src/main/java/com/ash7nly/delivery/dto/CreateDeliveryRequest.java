package com.ash7nly.delivery.dto;

import java.time.LocalDateTime;

public class CreateDeliveryRequest {

    private Long shipmentId;
    private String recipientName;
    private LocalDateTime assignedAt;

    public CreateDeliveryRequest() {
    }

    public CreateDeliveryRequest(Long shipmentId, String recipientName, LocalDateTime assignedAt) {
        this. shipmentId = shipmentId;
        this.recipientName = recipientName;
        this.assignedAt = assignedAt;
    }

    public Long getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(Long shipmentId) {
        this.shipmentId = shipmentId;
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

}