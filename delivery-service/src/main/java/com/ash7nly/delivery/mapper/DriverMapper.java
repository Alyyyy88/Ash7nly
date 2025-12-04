package com.ash7nly.delivery.mapper;

import com. ash7nly. delivery.Entity.Driver;
import com.ash7nly.delivery.dto.CreateDriverRequest;
import com.ash7nly.delivery.dto.DriverResponse;
import com.ash7nly.delivery.dto.UpdateDriverRequest;

import java.time.LocalDateTime;

public class DriverMapper {

    public static Driver toEntity(CreateDriverRequest request) {
        Driver driver = new Driver();
        driver.setUserId(request.getUserId());
        driver.setVehicleType(request.getVehicleType());
        driver.setVehicleNumber(request. getVehicleNumber());
        driver. setLicenseNumber(request.getLicenseNumber());
        driver.setServiceArea(request.getServiceArea());
        driver.setAvailable(request.getIsAvailable() != null ? request. getIsAvailable() : true);
        return driver;
    }
    public static Driver toEntityForUpdate(UpdateDriverRequest request) {
        Driver driver = new Driver();
        driver.setUserId(request.getUserId());
        driver.setVehicleType(request.getVehicleType());
        driver.setVehicleNumber(request.getVehicleNumber());
        driver.setLicenseNumber(request. getLicenseNumber());
        driver.setServiceArea(request. getServiceArea());
        driver.setAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true);
        return driver;
    }

    public static DriverResponse toResponse(Driver driver) {
        DriverResponse response = new DriverResponse();
        response.setId(driver.getId());
        response.setUserId(driver.getUserId());
        response.setVehicleType(driver.getVehicleType());
        response.setVehicleNumber(driver.getVehicleNumber());
        response.setLicenseNumber(driver. getLicenseNumber());
        response.setServiceArea(driver. getServiceArea());
        response.setIsAvailable(driver. isAvailable());

        int deliveriesCount = 0;
        if (driver.getDeliveries() != null) {
            deliveriesCount = driver. getDeliveries(). size();
        }
        response.setDeliveriesCount(deliveriesCount);

        response.setCreatedAt(LocalDateTime.now());

        return response;
    }

    public static DriverResponse toResponseWithConstructor(Driver driver) {
        int deliveriesCount = driver.getDeliveries() != null ? driver.getDeliveries().size() : 0;

        return new DriverResponse(
                driver.getId(),
                driver.getUserId(),
                driver. getVehicleType(),
                driver. getVehicleNumber(),
                driver. getLicenseNumber(),
                driver.getServiceArea(),
                driver.isAvailable(),
                deliveriesCount,
                LocalDateTime.now()
        );
    }

    public static void updateEntityFromDTO(Driver existingDriver, UpdateDriverRequest request) {
        if (existingDriver == null || request == null) return;

        if (request.getUserId() != null) {
            existingDriver.setUserId(request.getUserId());
        }

        if (request. getVehicleType() != null && !request. getVehicleType().toString().trim(). isEmpty()) {
            existingDriver. setVehicleType(request.getVehicleType());
        }

        if (request. getVehicleNumber() != null && ! request.getVehicleNumber().trim(). isEmpty()) {
            existingDriver.setVehicleNumber(request.getVehicleNumber());
        }

        if (request.getLicenseNumber() != null && !request. getLicenseNumber(). trim().isEmpty()) {
            existingDriver.setLicenseNumber(request.getLicenseNumber());
        }

        if (request. getServiceArea() != null && !request. getServiceArea().trim().isEmpty()) {
            existingDriver. setServiceArea(request.getServiceArea());
        }

        if (request.getIsAvailable() != null) {
            existingDriver.setAvailable(request.getIsAvailable());
        }
    }
}