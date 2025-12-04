package com.ash7nly.delivery.dto;

import com.ash7nly.common.enums.VehicleType;
import com.fasterxml.jackson. annotation.JsonFormat;
import java.time.LocalDateTime;

public class DriverResponse {

    private Long id;
    private Long userId;
    private VehicleType vehicleType;
    private String vehicleNumber;
    private String licenseNumber;
    private String serviceArea;
    private Boolean isAvailable;
    private Integer deliveriesCount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    public DriverResponse() {
    }

    public DriverResponse(Long id, Long userId, VehicleType vehicleType, String vehicleNumber,
                          String licenseNumber, String serviceArea, Boolean isAvailable,
                          Integer deliveriesCount, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.vehicleType = vehicleType;
        this.vehicleNumber = vehicleNumber;
        this.licenseNumber = licenseNumber;
        this.serviceArea = serviceArea;
        this.isAvailable = isAvailable;
        this. deliveriesCount = deliveriesCount;
        this.createdAt = createdAt;
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

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public Integer getDeliveriesCount() {
        return deliveriesCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this. id = id;
    }

    public void setUserId(Long userId) {
        this. userId = userId;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this. licenseNumber = licenseNumber;
    }

    public void setServiceArea(String serviceArea) {
        this. serviceArea = serviceArea;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this. isAvailable = isAvailable;
    }

    public void setDeliveriesCount(Integer deliveriesCount) {
        this. deliveriesCount = deliveriesCount;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}