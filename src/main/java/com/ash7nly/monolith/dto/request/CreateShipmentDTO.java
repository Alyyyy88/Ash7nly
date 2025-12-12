package com.ash7nly.monolith.dto.request;

import com.ash7nly.monolith.enums.DeliveryArea;
import com.ash7nly.monolith.enums.ShipmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;


public class CreateShipmentDTO {

    private long merchantId;
    private String pickupAdress;
    private DeliveryArea deliveryAdress;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String packageWeight;
    private String packageDimension;
    private String packageDescription;
    private double cost;


    private ShipmentStatus status;
    private boolean isActive;

    private String trackingNumber;

    // -------------------------
    // Constructors
    // -------------------------

    public CreateShipmentDTO() {
    }

    public CreateShipmentDTO(long merchantId, String pickupAdress, DeliveryArea deliveryAdress,
                             String customerName, String customerPhone,String customerEmail,
                             String packageWeight, String packageDimension,
                             String packageDescription, double cost,String trackingNumber,
                             boolean isActive , ShipmentStatus status

    ) {
        this.merchantId = merchantId;
        this.pickupAdress = pickupAdress;
        this.deliveryAdress = deliveryAdress;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.packageWeight = packageWeight;
        this.packageDimension = packageDimension;
        this.packageDescription = packageDescription;
        this.cost = cost;
        this.trackingNumber = trackingNumber;
        this.status =status;
        this.isActive = isActive;
        this.customerEmail = customerEmail;
    }

    // -------------------------
    // Getters & Setters
    // -------------------------

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(long merchantId) {
        this.merchantId = merchantId;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
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

    public String getPackageDescription() {
        return packageDescription;
    }

    public void setPackageDescription(String packageDescription) {
        this.packageDescription = packageDescription;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

}