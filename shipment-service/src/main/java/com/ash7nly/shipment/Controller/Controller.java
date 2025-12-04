package com.ash7nly.shipment.Controller;

import com.ash7nly.common.enums.UserRole;
import com.ash7nly.common.response.ApiResponse;
import com.ash7nly.common.security.RequiresRole;
import com.ash7nly.common.security.UserContext;
import com.ash7nly.shipment.DTOs.*;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Services.CRUDService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
public class Controller {
    private final CRUDService CRUDService;
    public Controller( CRUDService CRUDService) {
        this.CRUDService = CRUDService;
    }

    @PutMapping("/status")
    public ApiResponse<UpdateShipmentDTO> updateStatus(
            @RequestBody UpdateShipmentDTO request
    ) {
        return ApiResponse.success(CRUDService.updateShipmentStatus(request.getTrackingNumber(), request.getStatus()));
    }


    @PostMapping("/create")
    @RequiresRole(UserRole.MERCHANT)
    public ApiResponse<ShipmentEntity> createShipment(@RequestBody CreateShipmentDTO request) {
        Long userId = Long.valueOf(UserContext.getUserId());
        return ApiResponse.success(CRUDService.createShipment(request, userId));
    }


    @GetMapping("/tracking/{trackingNumber}")
    public ApiResponse<TrackShipmentDTO> TrackShipment(@PathVariable String trackingNumber) {
        return ApiResponse.success(CRUDService.TrackingInfo(trackingNumber));
    }

    @PostMapping("/cancel")
    public ApiResponse<CancelShipmentResponseDto> cancelShipment(
            @RequestBody CancelShipmentRequestDto request) {
        return ApiResponse.success(CRUDService.cancelShipment(request));
    }

    @GetMapping("/{trackingNumber}/history")
    public ApiResponse<List<TrackingHistoryDTO>> getTrackingHistory(@PathVariable String trackingNumber) {
        return ApiResponse.success(CRUDService.getTrackingHistory(trackingNumber));
    }

}


