package com.ash7nly.monolith.dto. request;

import com.ash7nly.monolith.enums.VehicleType;
import jakarta.validation.constraints.*;

public class CreateDriverUserRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 10, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Vehicle type is required")
    private VehicleType vehicleType;

    @NotBlank(message = "Vehicle number is required")
    private String vehicleNumber;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    @NotBlank(message = "Service area is required")
    private String serviceArea;

    public CreateDriverUserRequest() {
    }

    public CreateDriverUserRequest(String username, String fullName, String email, String password,
                                   VehicleType vehicleType, String vehicleNumber, String licenseNumber,
                                   String serviceArea) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.vehicleType = vehicleType;
        this.vehicleNumber = vehicleNumber;
        this.licenseNumber = licenseNumber;
        this.serviceArea = serviceArea;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getServiceArea() {
        return serviceArea;
    }

    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }
}