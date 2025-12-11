package com.ash7nly.monolith.dto.request;

import com.ash7nly.monolith.enums.DeliveryArea;
import com.ash7nly.monolith.enums.ShipmentStatus;

import java.time.LocalDateTime;

public class ShipmentListDTO {
    private long shipmentId;
    private String trackingNumber;
    private DeliveryArea deliveryAdress;
    private ShipmentStatus status;
    private String customerEmail;
    private boolean active;
    private LocalDateTime createdAt;
    private long merchantId;
    private String pickupAdress;
    private String customerName;
    private double cost;

    public ShipmentListDTO(String trackingNumber, String customerName, String pickupAdress, long merchantId, LocalDateTime createdAt, ShipmentStatus status,String customerEmail, boolean active, DeliveryArea deliveryAdress,double cost, long shipmentId) {
        this.trackingNumber = trackingNumber;
        this.customerName = customerName;
        this.pickupAdress = pickupAdress;
        this.merchantId = merchantId;
        this.createdAt = createdAt;
        this.status = status;
        this.customerEmail = customerEmail;
        this.active = active;
        this.deliveryAdress = deliveryAdress;
        this.cost = cost;
        this.shipmentId =shipmentId;
    }

    public ShipmentListDTO() {
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPickupAdress() {
        return pickupAdress;
    }

    public void setPickupAdress(String pickupAdress) {
        this.pickupAdress = pickupAdress;
    }

    public long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(long merchantId) {
        this.merchantId = merchantId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public DeliveryArea getDeliveryAdress() {
        return deliveryAdress;
    }

    public void setDeliveryAdress(DeliveryArea deliveryAdress) {
        this.deliveryAdress = deliveryAdress;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public long getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(long shipmentId) {
        this.shipmentId = shipmentId;
    }
}