package com.ash7nly.monolith.controller;

import com.ash7nly.monolith.dto.response.ApiResponse;
import com.ash7nly.monolith.dto.response.DeliveryResponse;
import com.ash7nly.monolith.dto.response.ShipmentResponse;
import com.ash7nly.monolith.service.DeliveryService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/assigned")
    public ApiResponse<List<DeliveryResponse>> getAssignedDeliveries(@RequestParam Long driverId) {
        return ApiResponse.success(deliveryService.getAssignedDeliveries(driverId));
    }





    @PostMapping("/{id}/failed")
    public ApiResponse<DeliveryResponse> reportFailed(
            @PathVariable Long id,
            @RequestParam String reason) {
        return ApiResponse.success(deliveryService.reportFailed(id, reason), "Delivery marked as failed");
    }

}





