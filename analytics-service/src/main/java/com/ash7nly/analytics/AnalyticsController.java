package com.ash7nly.analytics;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "analytics-service",
                "status", "UP"
        );
    }
}

