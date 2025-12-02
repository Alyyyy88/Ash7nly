package com.ash7nly.shipment.Controller;

import com.ash7nly.shipment.Services.CreateService;
import com.ash7nly.shipment.DTOs.CreateShipmentRequest;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Services.CreateService;
import com.ash7nly.common.constant.Headers;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/shipments")
@RequiredArgsConstructor
public class ShipmentController {


    private final CreateService CService;

    @PostMapping
    public ResponseEntity<?> createShipment(@RequestBody CreateShipmentRequest request,
                                            @RequestHeader(Headers.USER_ID) Long userId,
                                            @RequestHeader(Headers.USER_ROLE) String role) {
        if (!"MERCHANT".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only merchants can create shipments");
        }

        ShipmentEntity shipment = CService.createShipment(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipment);
    }
}
