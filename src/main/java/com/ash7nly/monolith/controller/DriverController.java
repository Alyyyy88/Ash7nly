package com.ash7nly.monolith.controller;

import com.ash7nly.monolith.dto.request.*;
import com.ash7nly.monolith.dto.response.*;
import com.ash7nly.monolith.enums.ShipmentStatus;
import com.ash7nly.monolith.service.DeliveryService;
import com.ash7nly.monolith.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;
    private final DeliveryService deliveryService;

    public DriverController(DriverService driverService, DeliveryService deliveryService) {
        this.driverService = driverService;
        this.deliveryService = deliveryService;
    }

    // GET ALL DRIVERS - ADMIN ONLY
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ApiResponse<List<DriverResponse>> getAllDrivers() {
        return ApiResponse.success(driverService.getAllDrivers());
    }

    // GET DRIVER BY ID - ADMIN ONLY
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ApiResponse<DriverResponse> getDriver(@PathVariable Long id) {
        return ApiResponse.success(driverService.getDriver(id));
    }

    // DRIVER REGISTRATION

    @PostMapping("/register")
    public ApiResponse<DriverResponse> registerDriver(@Valid @RequestBody CreateDriverUserRequest request) {
        return ApiResponse.success(
                driverService.registerDriverUser(request),
                "Driver registered successfully"
        );
    }

    // GET MY DRIVER PROFILE
    @PreAuthorize("hasAuthority('DRIVER')")
    @GetMapping("/profile")
    public ApiResponse<DriverResponse> getMyDriverProfile() {
        return ApiResponse.success(driverService.getMyDriverProfile());
    }



    // UPDATE DRIVER PROFILE
    @PreAuthorize("hasAuthority('DRIVER')")
    @PutMapping("/{id}")
    public ApiResponse<DriverResponse> updateDriver(
            @PathVariable Long id,
            @Valid @RequestBody UpdateDriverRequest request) {
        return ApiResponse.success(driverService.updateDriver(id, request), "Driver profile updated successfully");
    }

    // UPDATE DRIVER AVAILABILITY

    @PreAuthorize("hasAuthority('DRIVER')")
    @PutMapping("/{id}/availability")
    public ApiResponse<DriverResponse> updateAvailability(
            @PathVariable Long id,
            @RequestParam boolean available) {
        return ApiResponse.success(driverService.updateAvailability(id, available));
    }



    // GET AVAILABLE DELIVERIES FOR DRIVER'S SERVICE AREA
    @PreAuthorize("hasAuthority('DRIVER')")
    @GetMapping("/deliveries/available")
    public ApiResponse<List<ShipmentListDTO>> getAvailableDeliveries() {
        return ApiResponse.success(
                deliveryService.getAvailableDeliveries(),
                "Available deliveries retrieved successfully"
        );
    }


    // ACCEPT A DELIVERY ASSIGNMENT

    @PreAuthorize("hasAuthority('DRIVER')")
    @PostMapping("/deliveries/{deliveryId}/accept")
    public ApiResponse<DeliveryResponse> acceptDelivery(@PathVariable Long deliveryId) {
        AcceptDeliveryRequest request = new AcceptDeliveryRequest(deliveryId);

        return ApiResponse. success(
                driverService.acceptDelivery(request),
                "Delivery accepted successfully"
        );
    }

    // UPDATE DELIVERY STATUS

    @PreAuthorize("hasAuthority('DRIVER')")
    @PutMapping("/deliveries/status")
    public ApiResponse<DeliveryResponse> updateDeliveryStatus(@Valid @RequestBody UpdateDeliveryStatusRequest request) {
        return ApiResponse. success(
                deliveryService.updateDeliveryStatus(request) ,
                "Delivery status updated successfully"
        );
    }




    /**
     * Get driver's active (ongoing) deliveries
     * Returns deliveries that are ASSIGNED, PICKED_UP, or IN_TRANSIT
     */
    @PreAuthorize("hasAuthority('DRIVER')")
    @GetMapping("/deliveries/active")
    public ApiResponse<ActiveDeliveryResponse> getMyActiveDeliveries() {
        return ApiResponse.success(
                driverService.getMyActiveDeliveries(),
                "Active deliveries retrieved successfully"
        );
    }

    /**
     * Get driver's completed delivery history
     * Returns only DELIVERED deliveries
     */
    @PreAuthorize("hasAuthority('DRIVER')")
    @GetMapping("/deliveries/history")
    public ApiResponse<DeliveryHistoryResponse> getMyCompletedDeliveries() {
        return ApiResponse.success(
                driverService.getMyCompletedDeliveries(),
                "Delivery history retrieved successfully"
        );
    }

    /**
     * Get driver's delivery history with optional status filter
     */
    @PreAuthorize("hasAuthority('DRIVER')")
    @GetMapping("/deliveries")
    public ApiResponse<List<DeliveryResponse>> getMyDeliveries(
            @RequestParam(required = false) ShipmentStatus status) {
        return ApiResponse.success(
                driverService.getMyDeliveries(status),
                "Delivery history retrieved successfully"
        );
    }

}

