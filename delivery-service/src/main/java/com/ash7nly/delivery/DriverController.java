package com. ash7nly. delivery;

import com.ash7nly.common.response.ApiResponse;
import com.ash7nly.delivery.Entity.Driver;
import com.ash7nly.delivery.Services.DriverService;
import com.ash7nly.delivery.dto.CreateDriverRequest;
import com.ash7nly.delivery.dto. DriverResponse;
import com. ash7nly. delivery.dto.UpdateDriverRequest;
import com.ash7nly.delivery.mapper.DriverMapper;
import jakarta.validation.Valid;
import org.springframework.http. ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java. util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    // GET all drivers - returns list
    @GetMapping("/")
    public ApiResponse<List<DriverResponse>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        List<DriverResponse> driverResponses = new ArrayList<>();

        for (Driver driver : drivers) {
            driverResponses.add(DriverMapper.toResponse(driver));
        }

        return ApiResponse.success(driverResponses);
    }

    // GET driver by id
    @GetMapping("/{id}")
    public ApiResponse<DriverResponse> getDriver(@PathVariable Long id) {
        try {
            Driver driver = driverService.getDriver(id);
            DriverResponse response = DriverMapper.toResponse(driver);
            return ApiResponse.success(response);
        } catch (RuntimeException e) {
            return ApiResponse.error("Driver not found" );
        }
    }

    // create driver
    @PostMapping("/create")
    public ApiResponse<DriverResponse> createDriver(@Valid @RequestBody CreateDriverRequest request) {
        try {
            Driver driver = DriverMapper.toEntity(request);

            Driver savedDriver = driverService.createDriver(driver);

            DriverResponse response = DriverMapper.toResponse(savedDriver);

            return ApiResponse.success(response);
        } catch (Exception e) {
            return ApiResponse.error("Failed to create driver");
        }
    }

    // update driver
    @PutMapping("/update/{id}")
    public ApiResponse<DriverResponse> updateDriver(@PathVariable Long id,
                                                    @Valid @RequestBody UpdateDriverRequest request) {
        try {
            Driver savedDriver = driverService.updateDriver(id, request);

            DriverResponse response = DriverMapper.toResponse(savedDriver);

            return ApiResponse.success(response);

        } catch (RuntimeException e) {
            return ApiResponse.error("Driver not found: " + e.getMessage());
        }
    }

    //  GET driver's deliveries
    @GetMapping("/{id}/deliveries")
    public ResponseEntity<List<Object>> getDriverDeliveries(@PathVariable Long id) {
        try {
            Driver driver = driverService.getDriver(id);

            if (driver. getDeliveries() == null || driver.getDeliveries().isEmpty()) {
                return ResponseEntity.ok(new ArrayList<>());
            }

            List<Object> deliveries = new ArrayList<>(driver.getDeliveries());
            return ResponseEntity.ok(deliveries);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //  update availability
    @PutMapping("/{id}/availability")
    public ResponseEntity<DriverResponse> setAvailability(@PathVariable Long id,
                                                          @RequestParam boolean available) {
        try {
            Driver updatedDriver = driverService.updateAvailability(id, available);
            DriverResponse response = DriverMapper.toResponse(updatedDriver);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // GET available drivers only
    @GetMapping("/available")
    public ResponseEntity<List<DriverResponse>> getAvailableDrivers() {
        List<Driver> drivers = driverService. getAllDrivers();
        List<DriverResponse> availableDrivers = new ArrayList<>();

        for (Driver driver : drivers) {
            if (driver.isAvailable()) {
                availableDrivers. add(DriverMapper.toResponse(driver));
            }
        }

        return ResponseEntity. ok(availableDrivers);
    }

    // GET drivers by service area
    @GetMapping("/area/{serviceArea}")
    public ResponseEntity<List<DriverResponse>> getDriversByServiceArea(@PathVariable String serviceArea) {
        List<Driver> drivers = driverService.getAllDrivers();
        List<DriverResponse> areaDrivers = new ArrayList<>();

        for (Driver driver : drivers) {
            if (serviceArea.equals(driver.getServiceArea())) {
                areaDrivers.add(DriverMapper. toResponse(driver));
            }
        }

        return ResponseEntity.ok(areaDrivers);
    }
}