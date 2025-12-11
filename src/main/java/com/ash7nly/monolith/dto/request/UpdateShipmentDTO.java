package com.ash7nly.monolith.dto.request;


import com.ash7nly.monolith.enums.ShipmentStatus;

public class UpdateShipmentDTO {
    private long shipmentID;
    private ShipmentStatus status;

    public UpdateShipmentDTO(long shipmentID, ShipmentStatus status) {
        this.shipmentID = shipmentID;
        this.status = status;
    }

    public UpdateShipmentDTO() {
    }

    public long getShipmentID() {
        return shipmentID;
    }

    public void setShipmentID(long shipmentID) {
        this.shipmentID = shipmentID;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }
}