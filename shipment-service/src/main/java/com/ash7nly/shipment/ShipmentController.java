package com.ash7nly.shipment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "shipment-service",
                "status", "UP"
        );
    }
}

