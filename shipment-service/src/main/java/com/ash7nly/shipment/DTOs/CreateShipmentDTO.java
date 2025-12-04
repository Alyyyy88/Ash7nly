package com.ash7nly.shipment.DTOs;

import com.ash7nly.common.enums.DeliveryArea;

public class CreateShipmentDTO {

    private long merchantId;
    private String pickupAdress;
    private DeliveryArea deliveryAdress;
    private String customerName;
    private String customerPhone;

    private String packageWeight;
    private String packageDimension;
    private String packageDescription;

    private double cost;

    private String trackingNumber;

    // -------------------------
    // Constructors
    // -------------------------

    public CreateShipmentDTO() {
    }

    public CreateShipmentDTO(long merchantId, String pickupAdress, DeliveryArea deliveryAdress,
                             String customerName, String customerPhone,
                             String packageWeight, String packageDimension,
                             String packageDescription, double cost,String trackingNumber) {
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
    }

    // -------------------------
    // Getters & Setters
    // -------------------------

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

    // -------------------------
    // Manual Builder
    // -------------------------

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private long merchantId;
        private String pickupAdress;
        private DeliveryArea deliveryAdress;
        private String customerName;
        private String customerPhone;

        private String packageWeight;
        private String packageDimension;
        private String packageDescription;



        private String trackingNumber;

        private double cost;

        public String getTrackingNumber() {
            return trackingNumber;
        }

        public void setTrackingNumber(String trackingNumber) {
            this.trackingNumber = trackingNumber;
        }

        public Builder merchantId(long merchantId) {
            this.merchantId = merchantId;
            return this;
        }

        public Builder pickupAdress(String pickupAdress) {
            this.pickupAdress = pickupAdress;
            return this;
        }

        public Builder deliveryAdress(DeliveryArea deliveryAdress) {
            this.deliveryAdress = deliveryAdress;
            return this;
        }

        public Builder customerName(String customerName) {
            this.customerName = customerName;
            return this;
        }

        public Builder customerPhone(String customerPhone) {
            this.customerPhone = customerPhone;
            return this;
        }

        public Builder packageWeight(String packageWeight) {
            this.packageWeight = packageWeight;
            return this;
        }

        public Builder packageDimension(String packageDimension) {
            this.packageDimension = packageDimension;
            return this;
        }

        public Builder packageDescription(String packageDescription) {
            this.packageDescription = packageDescription;
            return this;
        }

        public Builder cost(double cost) {
            this.cost = cost;
            return this;
        }

        public CreateShipmentDTO build() {
            return new CreateShipmentDTO(
                    merchantId, pickupAdress, deliveryAdress,
                    customerName, customerPhone,
                    packageWeight, packageDimension, packageDescription,
                    cost,trackingNumber
            );
        }
    }
}
