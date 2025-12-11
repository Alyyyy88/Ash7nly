//package com.ash7nly.monolith.controller;
//
//import com.ash7nly.monolith.dto.response.ApiResponse;
//import com.ash7nly.monolith.dto.response.DeliveryResponse;
//import com.ash7nly.monolith.service.DeliveryService;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/deliveries")
//public class DeliveryController {
//
//    private final DeliveryService deliveryService;
//
//    public DeliveryController(DeliveryService deliveryService) {
//        this.deliveryService = deliveryService;
//    }
//
//    @GetMapping("/assigned")
//    public ApiResponse<List<DeliveryResponse>> getAssignedDeliveries(@RequestParam Long driverId) {
//        return ApiResponse.success(deliveryService.getAssignedDeliveries(driverId));
//    }
//
//    @PostMapping("/{id}/accept")
//    public ApiResponse<DeliveryResponse> acceptDelivery(@PathVariable Long id) {
//        return ApiResponse.success(deliveryService.acceptDelivery(id), "Delivery accepted");
//    }
//
//    @PostMapping("/{id}/reject")
//    public ApiResponse<DeliveryResponse> rejectDelivery(@PathVariable Long id) {
//        return ApiResponse.success(deliveryService.rejectDelivery(id), "Delivery rejected");
//    }
//
//    @PutMapping("/{id}/status")
//    public ApiResponse<DeliveryResponse> updateStatus(
//            @PathVariable Long id,
//            @RequestParam String status) {
//        return ApiResponse.success(deliveryService.updateStatus(id, status), "Status updated");
//    }
//
//    @PostMapping("/{id}/failed")
//    public ApiResponse<DeliveryResponse> reportFailed(
//            @PathVariable Long id,
//            @RequestParam String reason) {
//        return ApiResponse.success(deliveryService.reportFailed(id, reason), "Delivery marked as failed");
//    }
//
//    @GetMapping("/history")
//    public ApiResponse<List<DeliveryResponse>> getHistory(@RequestParam Long driverId) {
//        return ApiResponse.success(deliveryService.getHistory(driverId));
//    }
//
//    @PreAuthorize("hasAuthority('ADMIN')")
//    @PostMapping("/assign")
//    public ApiResponse<DeliveryResponse> assignDelivery(
//            @RequestParam Long shipmentId,
//            @RequestParam Long driverId) {
//        return ApiResponse.success(deliveryService.assignDelivery(shipmentId, driverId), "Delivery assigned");
//    }
//}
//
