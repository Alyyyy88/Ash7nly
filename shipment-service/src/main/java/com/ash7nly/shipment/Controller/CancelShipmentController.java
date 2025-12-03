package com.ash7nly.shipment.Controller;
import com.ash7nly.shipment.DTOs.CancelShipmentRequestDto;
import com.ash7nly.shipment.DTOs.CancelShipmentResponseDto;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Services.CancelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments")

public class CancelShipmentController {

    private final CancelService cancelShipmentService;
    public CancelShipmentController(CancelService cancelShipmentServicee){
        this.cancelShipmentService =cancelShipmentServicee;
    }

    @PostMapping("/cancel")
    public ResponseEntity<CancelShipmentResponseDto> cancelShipment(
            @RequestBody CancelShipmentRequestDto request) {
        CancelShipmentResponseDto response = cancelShipmentService.cancelShipment(request);
        return ResponseEntity.ok(response);
}
}