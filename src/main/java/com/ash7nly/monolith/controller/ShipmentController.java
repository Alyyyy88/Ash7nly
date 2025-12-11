package com.ash7nly.monolith.controller;

import com.ash7nly.monolith.dto.request.CancelShipmentRequest;
import com.ash7nly.monolith.dto.request.CreateShipmentRequest;
import com.ash7nly.monolith.dto.response.ApiResponse;
import com.ash7nly.monolith.dto.response.CancelShipmentResponse;
import com.ash7nly.monolith.dto.response.ShipmentResponse;
import com.ash7nly.monolith.service.ShipmentService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @PreAuthorize("hasAuthority('MERCHANT')")
    @PostMapping("/create")
    public ApiResponse<ShipmentResponse> createShipment(@Valid @RequestBody CreateShipmentRequest request) {
        return ApiResponse.success(shipmentService.createShipment(request), "Shipment created successfully");
    }

    // Public endpoint - anyone can track
    @GetMapping("/tracking/{trackingNumber}")
    public ApiResponse<ShipmentResponse> trackShipment(@PathVariable String trackingNumber) {
        return ApiResponse.success(shipmentService.trackShipment(trackingNumber));
    }

    @PostMapping("/cancel")
    public ApiResponse<CancelShipmentResponse> cancelShipment(@Valid @RequestBody CancelShipmentRequest request) {
        return ApiResponse.success(shipmentService.cancelShipment(request), "Shipment cancelled successfully");
    }

    @PreAuthorize("hasAuthority('MERCHANT')")
    @GetMapping("/my-shipments")
    public ApiResponse<List<ShipmentResponse>> getMyShipments() {
        return ApiResponse.success(shipmentService.getMyShipments());
    }
}

