package com.ash7nly.delivery;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "delivery-service",
                "status", "UP"
        );
    }
}

