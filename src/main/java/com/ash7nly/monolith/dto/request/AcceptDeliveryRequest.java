package com.ash7nly.monolith. dto. request;

import jakarta.validation.constraints.NotNull;

public class AcceptDeliveryRequest {

    @NotNull(message = "Delivery ID is required")
    private Long deliveryId;

    // Constructors
    public AcceptDeliveryRequest() {
    }

    public AcceptDeliveryRequest(Long deliveryId) {
        this.deliveryId = deliveryId;
    }

    // Getters and Setters
    public Long getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(Long deliveryId) {
        this.deliveryId = deliveryId;
    }
}