package com.ash7nly.payment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "payment-service",
                "status", "UP"
        );
    }
}

