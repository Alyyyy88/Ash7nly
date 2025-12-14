package com.ash7nly.monolith.mapper;

import com.ash7nly.monolith.dto.request.CreateDriverRequest;
import com.ash7nly.monolith.dto.request.UpdateDriverRequest;
import com.ash7nly.monolith.dto.response.DriverResponse;
import com.ash7nly.monolith.entity.Driver;
import com.ash7nly.monolith.entity.User;
import com.ash7nly.monolith.enums.DeliveryArea;
import org.springframework.stereotype.Component;

@Component
public class DriverMapper {

    public Driver toEntity(CreateDriverRequest request, User user) {
        Driver driver = new Driver();
        driver.setUser(user);
        driver.setVehicleType(request.getVehicleType());
        driver.setVehicleNumber(request.getVehicleNumber());
        driver.setLicenseNumber(request.getLicenseNumber());
        driver.setServiceArea(request.getServiceArea());
        driver.setAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true);
        return driver;
    }

    public DriverResponse toResponse(Driver driver) {
        if (driver == null) return null;

        DriverResponse response = new DriverResponse();
        response.setId(driver.getId());
        response.setEmail(driver.getUser() != null ? driver.getUser().getEmail() : null);
        response.setFullName(driver.getUser() != null ? driver.getUser().getFullName() : null);
        response.setUserId(driver.getUser() != null ? driver.getUser().getId() : null);
        response.setVehicleType(driver.getVehicleType().toString());
        response.setVehicleNumber(driver.getVehicleNumber());
        response.setLicenseNumber(driver.getLicenseNumber());
        response.setServiceArea(driver.getServiceArea().toString());
        response.setAvailable(driver.isAvailable());
        response.setPhoneNumber(driver.getUser() != null ? driver.getUser().getPhoneNumber() : null);
        return response;
    }

    public void updateEntityFromRequest(Driver driver, UpdateDriverRequest request) {
        if (request.getVehicleType() != null) {
            driver.setVehicleType(request.getVehicleType());
        }
        if (request.getVehicleNumber() != null && !request.getVehicleNumber().isBlank()) {
            driver.setVehicleNumber(request.getVehicleNumber());
        }
        if (request.getLicenseNumber() != null && !request.getLicenseNumber().isBlank()) {
            driver.setLicenseNumber(request.getLicenseNumber());
        }
        if (request.getServiceArea() != null && !request.getServiceArea().isBlank()) {
            driver.setServiceArea(DeliveryArea.valueOf(request.getServiceArea()));
        }
        if (request.getIsAvailable() != null) {
            driver.setAvailable(request.getIsAvailable());

        }

        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            driver.getUser().setFullName(request.getFullName());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            driver.getUser().setEmail(request.getEmail());
        }

        if(request.getPhoneNumber() != null && !request.getPhoneNumber().isBlank()) {
            driver.getUser().setPhoneNumber(request.getPhoneNumber());
        }



    }



    public DriverResponse buildDriverResponse(Driver driver, User user) {
        DriverResponse response = new DriverResponse();
        response.setId(driver.getId());
        response.setUserId(user.getId());
        response.setUsername(user. getUsername());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setVehicleType(driver.getVehicleType().toString());
        response.setVehicleNumber(driver.getVehicleNumber());
        response.setLicenseNumber(driver.getLicenseNumber());
        response.setServiceArea(driver.getServiceArea().toString());
        response.setAvailable(driver.isAvailable());
        response.setPhoneNumber(user.getPhoneNumber());
        return response;
    }
}

