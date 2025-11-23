package com.ash7nly.notification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "notification-service",
                "status", "UP"
        );
    }
}

