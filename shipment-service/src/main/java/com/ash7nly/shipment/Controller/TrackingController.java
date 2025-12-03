package com.ash7nly.shipment.Controller;

import com.ash7nly.shipment.DTOs.TrackShipmentDTO;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Repository.ShipmentRepository;
import com.ash7nly.shipment.Services.TrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/shipments")
public class TrackingController {
    private final TrackingService trackingService;
    public  TrackingController(TrackingService trackingService){
        this.trackingService = trackingService;
    }

    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<?> TrackShipment(@PathVariable String trackingNumber) {
        TrackShipmentDTO dto = trackingService.TrackingInfo(trackingNumber);
        return ResponseEntity.ok(dto);
    }

}
