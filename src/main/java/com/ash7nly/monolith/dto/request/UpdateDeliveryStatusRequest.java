package com.ash7nly. monolith.dto. request;

import com.ash7nly.monolith.enums.ShipmentStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateDeliveryStatusRequest {

    @NotNull(message = "Delivery ID is required")
    private Long deliveryId;

    @NotNull(message = "Status is required")
    private ShipmentStatus status;

    private String deliveryNotes;

    // Constructors
    public UpdateDeliveryStatusRequest() {
    }

    public UpdateDeliveryStatusRequest(Long deliveryId, ShipmentStatus status, String deliveryNotes) {
        this.deliveryId = deliveryId;
        this. status = status;
        this. deliveryNotes = deliveryNotes;
    }

    // Getters and Setters
    public Long getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(Long deliveryId) {
        this.deliveryId = deliveryId;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }

    public String getDeliveryNotes() {
        return deliveryNotes;
    }

    public void setDeliveryNotes(String deliveryNotes) {
        this.deliveryNotes = deliveryNotes;
    }
}