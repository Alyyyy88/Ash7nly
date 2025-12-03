package com.ash7nly.shipment.Entity;

import com.ash7nly.common.enums.ShipmentStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Shipment")
public class ShipmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long shipmentId;

    @Column(unique = true, nullable = false)
    private String  trackingNumber;

    @Column(nullable = false)
    private String pickupAdress;

    private String deliveryAdress;
    private String customerName;
    private String customerphone;
    private String packageWeight;
    private String packageDimension;

    @Column(nullable = false)
    private Long merchantId;

    @Lob
    private String packageDescription;

    @Enumerated(EnumType.STRING)
    private ShipmentStatus status;

    @Column(nullable = false)
    private double cost;

    private boolean isActive = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String cancellationReason;

    // -------------------------
    // Constructors
    // -------------------------

    public ShipmentEntity() {}

    public ShipmentEntity(long shipmentId, String trackingNumber, String pickupAdress,
                          String deliveryAdress, String customerName, String customerphone,
                          String packageWeight, String packageDimension, Long merchantId,
                          String packageDescription, ShipmentStatus status, double cost,
                          boolean isActive, LocalDateTime createdAt, LocalDateTime updatedAt,String cancellationReason) {
        this.shipmentId = shipmentId;
        this.trackingNumber = trackingNumber;
        this.pickupAdress = pickupAdress;
        this.deliveryAdress = deliveryAdress;
        this.customerName = customerName;
        this.customerphone = customerphone;
        this.packageWeight = packageWeight;
        this.packageDimension = packageDimension;
        this.merchantId = merchantId;
        this.packageDescription = packageDescription;
        this.status = status;
        this.cost = cost;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.cancellationReason = cancellationReason;
    }

    // -------------------------
    // Getters & Setters
    // -------------------------
    public String getCancellationReason() {
        return cancellationReason;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }
    public long getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(long shipmentId) {
        this.shipmentId = shipmentId;
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

    public String getDeliveryAdress() {
        return deliveryAdress;
    }

    public void setDeliveryAdress(String deliveryAdress) {
        this.deliveryAdress = deliveryAdress;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerphone() {
        return customerphone;
    }

    public void setCustomerphone(String customerphone) {
        this.customerphone = customerphone;
    }

    public String getPackageWeight() {
        return packageWeight;
    }

    public void setPackageWeight(String packageWeight) {
        this.packageWeight = packageWeight;
    }

    public String getPackageDimension() {
        return packageDimension;
    }

    public void setPackageDimension(String packageDimension) {
        this.packageDimension = packageDimension;
    }

    public Long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Long merchantId) {
        this.merchantId = merchantId;
    }

    public String getPackageDescription() {
        return packageDescription;
    }

    public void setPackageDescription(String packageDescription) {
        this.packageDescription = packageDescription;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
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

    // -------------------------
    // Lifecycle Hooks
    // -------------------------

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
