package com.ash7nly.delivery.dto;

import com.ash7nly.common.enums.VehicleType;
import jakarta. validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateDriverRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Vehicle type is required")
    private VehicleType vehicleType;

    @NotBlank(message = "Vehicle number cannot be empty")
    private String vehicleNumber;

    @NotBlank(message = "License number cannot be empty")
    private String licenseNumber;

    @NotBlank(message = "Service area cannot be empty")
    private String serviceArea;

    private Boolean isAvailable = true;

    public CreateDriverRequest() {
    }

    public CreateDriverRequest(Long userId, VehicleType vehicleType, String vehicleNumber,
                               String licenseNumber, String serviceArea, Boolean isAvailable) {
        this. userId = userId;
        this.vehicleType = vehicleType;
        this. vehicleNumber = vehicleNumber;
        this.licenseNumber = licenseNumber;
        this.serviceArea = serviceArea;
        this.isAvailable = isAvailable;
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

    public Boolean getIsAvailable() {
        return isAvailable;
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

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }




}
