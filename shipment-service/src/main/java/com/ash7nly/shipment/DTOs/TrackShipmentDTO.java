package com.ash7nly.shipment.DTOs;

import com.ash7nly.common.enums.DeliveryArea;
import com.ash7nly.common.enums.ShipmentStatus;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public class TrackShipmentDTO {

    private String trackingNumber;
    private String pickupAdress;
    private DeliveryArea deliveryAdress;
    private Long merchantId;

    @Enumerated(EnumType.STRING)
    private ShipmentStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TrackShipmentDTO() {}

    public TrackShipmentDTO(ShipmentEntity entity) {
        this.trackingNumber = entity.getTrackingNumber();
        this.pickupAdress = entity.getPickupAdress();
        this.deliveryAdress = entity.getDeliveryAdress();
        this.merchantId = entity.getMerchantId();
        this.status = entity.getStatus();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getPickupAdress() {
        return pickupAdress;
    }

    public void setPickupAdress(String pickupAdress) {
        this.pickupAdress = pickupAdress;
    }

    public DeliveryArea getDeliveryAdress() {
        return deliveryAdress;
    }

    public void setDeliveryAdress(DeliveryArea deliveryAdress) {
        this.deliveryAdress = deliveryAdress;
    }

    public Long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Long merchantId) {
        this.merchantId = merchantId;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
