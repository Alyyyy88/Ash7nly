package com.ash7nly.shipment.Controller;

import com.ash7nly.shipment.Services.CreateService;
import com.ash7nly.shipment.DTOs.CreateShipmentDTO;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.common.constant.Headers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments/create")
public class ShipmentController {

    private final CreateService cService;

    // Manual constructor (instead of @RequiredArgsConstructor)
    public ShipmentController(CreateService cService) {
        this.cService = cService;
    }

    @PostMapping
    public ResponseEntity<?> createShipment(
            @RequestBody CreateShipmentDTO request,
            @RequestHeader(Headers.USER_ID) Long userId,
            @RequestHeader(Headers.USER_ROLE) String role
    ) {
        if (!"MERCHANT".equals(role)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only merchants can create shipments");
        }

        ShipmentEntity shipment = cService.createShipment(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipment);
    }
}
