package com.ash7nly.monolith.controller;

import com.ash7nly.monolith.dto.request.*;
import com.ash7nly.monolith.dto.response.ApiResponse;
import com.ash7nly.monolith.dto.response.CancelShipmentResponseDto;
import com.ash7nly.monolith.entity.ShipmentEntity;
import com.ash7nly.monolith.enums.DeliveryArea;
import com.ash7nly.monolith.security.CurrentUserService;
import com.ash7nly.monolith.service.ShipmentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {
    private final ShipmentService ShipmentService;
    private final CurrentUserService currentUserService;
    public ShipmentController( ShipmentService ShipmentService,CurrentUserService currentUserService) {
        this.ShipmentService = ShipmentService;
        this.currentUserService = currentUserService;
    }

    @PutMapping("/status")
    public ApiResponse<UpdateShipmentDTO> updateStatus(
            @RequestBody UpdateShipmentDTO request
    ) {
        return ApiResponse.success(ShipmentService.updateShipmentStatus(request.getShipmentID(), request.getStatus()));
    }


    @PostMapping("/create")
    @PreAuthorize("hasAuthority('MERCHANT')")
    public ApiResponse<ShipmentEntity> createShipment(@RequestBody CreateShipmentDTO request) {
        Long userId = Long.valueOf(CurrentUserService.getCurrentUserId());
        return ApiResponse.success(ShipmentService.createShipment(request, userId));
    }


    @GetMapping("/tracking/{trackingNumber}")
    public ApiResponse<TrackShipmentDTO> TrackShipment(@PathVariable String trackingNumber) {
        return ApiResponse.success(ShipmentService.TrackingInfo(trackingNumber));
    }

    @PostMapping("/cancel")
    public ApiResponse<CancelShipmentResponseDto> cancelShipment(
            @RequestBody CancelShipmentRequestDto request) {
        return ApiResponse.success(ShipmentService.cancelShipment(request));
    }

    @GetMapping("/{id}/history")
    public ApiResponse<List<TrackingHistoryDTO>> getTrackingHistory(@PathVariable long id) {
        return ApiResponse.success(ShipmentService.getTrackingHistory(id));
    }

    @GetMapping("/area/{serviceArea}")
    public ApiResponse<List<ShipmentListDTO>> getByServiceArea(@PathVariable DeliveryArea serviceArea) {
        return ApiResponse.success(ShipmentService.getShipmentsByServiceArea(serviceArea));
    }

    @GetMapping("/{shipmentId}")
    public ApiResponse<ShipmentListDTO> getShipmentById(@PathVariable long shipmentId){
        return ApiResponse.success(ShipmentService.getShipmentById(shipmentId));
    }

}