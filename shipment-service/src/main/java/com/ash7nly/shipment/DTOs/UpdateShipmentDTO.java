package com.ash7nly.shipment.DTOs;

import com.ash7nly.common.enums.ShipmentStatus;

public class UpdateShipmentDTO {
    private String trackingNumber;
    private ShipmentStatus status;

    public UpdateShipmentDTO(String trackingNumber, ShipmentStatus status) {
        this.trackingNumber = trackingNumber;
        this.status = status;
    }

    public UpdateShipmentDTO() {
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }
}
