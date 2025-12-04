package com.ash7nly. delivery.Entity;

import com.ash7nly.common.enums.VehicleType;
import com. fasterxml.jackson.annotation. JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType. IDENTITY)
    private Long id;

    // Foreign key
    private Long userId;
    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;
    private String vehicleNumber;
    private String licenseNumber;
    private String serviceArea;
    private boolean isAvailable;

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Delivery> deliveries;

    public Driver() {
    }

    public Driver(Long id, Long userId, VehicleType vehicleType, String vehicleNumber,
                  String licenseNumber, String serviceArea, boolean isAvailable,
                  List<Delivery> deliveries) {
        this.id = id;
        this.userId = userId;
        this.vehicleType = vehicleType;
        this.vehicleNumber = vehicleNumber;
        this.licenseNumber = licenseNumber;
        this.serviceArea = serviceArea;
        this.isAvailable = isAvailable;
        this.deliveries = deliveries;
    }

    public Driver(Long userId, VehicleType vehicleType, String vehicleNumber,
                  String licenseNumber, String serviceArea, boolean isAvailable) {
        this.userId = userId;
        this.vehicleType = vehicleType;
        this.vehicleNumber = vehicleNumber;
        this.licenseNumber = licenseNumber;
        this.serviceArea = serviceArea;
        this.isAvailable = isAvailable;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public String getServiceArea() {
        return serviceArea;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public List<Delivery> getDeliveries() {
        return deliveries;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }

    public void setAvailable(boolean available) {
        this.isAvailable = available;
    }

    public void setDeliveries(List<Delivery> deliveries) {
        this.deliveries = deliveries;
    }

    public static class Builder {
        private Long id;
        private Long userId;
        private VehicleType vehicleType;
        private String vehicleNumber;
        private String licenseNumber;
        private String serviceArea;
        private boolean isAvailable = true; // Default value
        private List<Delivery> deliveries;

        public Builder id(Long id) {
            this. id = id;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder vehicleType(VehicleType vehicleType) {
            this.vehicleType = vehicleType;
            return this;
        }

        public Builder vehicleNumber(String vehicleNumber) {
            this. vehicleNumber = vehicleNumber;
            return this;
        }

        public Builder licenseNumber(String licenseNumber) {
            this.licenseNumber = licenseNumber;
            return this;
        }

        public Builder serviceArea(String serviceArea) {
            this.serviceArea = serviceArea;
            return this;
        }

        public Builder isAvailable(boolean isAvailable) {
            this. isAvailable = isAvailable;
            return this;
        }

        public Builder deliveries(List<Delivery> deliveries) {
            this.deliveries = deliveries;
            return this;
        }

        public Driver build() {
            return new Driver(id, userId, vehicleType, vehicleNumber,
                    licenseNumber, serviceArea, isAvailable, deliveries);
        }
    }

    public static Builder builder() {
        return new Builder();
    }



}