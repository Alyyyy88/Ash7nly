package com.ash7nly.delivery;

import com.ash7nly.common.response.ApiResponse;
import com.ash7nly.delivery.Entity.Delivery;
import com.ash7nly.delivery.Entity.Driver;
import com.ash7nly.delivery.Services.DeliveryService;

import com.ash7nly.delivery.dto.CreateDeliveryRequest;
import com.ash7nly.delivery.dto.DeliveryResponse;
import com.ash7nly.delivery.mapper.DeliveryMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "delivery-service",
                "status", "UP"
        );
    }

    @PostMapping("/create")
    public ApiResponse<DeliveryResponse> createDelivery(@RequestBody CreateDeliveryRequest request) {
        try {
            Delivery delivery = DeliveryMapper.toEntity(request);

            Delivery savedDelivery = deliveryService.createDelivery(delivery);

            DeliveryResponse response = DeliveryMapper.toResponse(savedDelivery);

            return ApiResponse.success(response);

        } catch (Exception e) {
            return ApiResponse.error("Failed to create delivery" + e.getMessage());
        }
    }



    @GetMapping("/assigned")
    public List<Delivery> assigned(@RequestParam Long driverId) {
        return deliveryService.getAssignedDeliveries(driverId);
    }


    @PostMapping("/{id}/accept")
    public Delivery accept(@PathVariable Long id) {
        return deliveryService.acceptDelivery(id);
    }


    @PostMapping("/{id}/reject")
    public Delivery reject(@PathVariable Long id) {
        return deliveryService.rejectDelivery(id);
    }


    @PutMapping("/{id}/status")
    public Delivery updateStatus(@PathVariable Long id, @RequestParam String status) {
        return deliveryService.updateStatus(id, status);
    }





    @PostMapping("/{id}/failed")
    public Delivery failed(@PathVariable Long id, @RequestParam String reason) {
        return deliveryService.reportFailed(id, reason);
    }


    @GetMapping("/history")
    public List<Delivery> history(@RequestParam Long driverId) {
        return deliveryService.getHistory(driverId);
    }
}

