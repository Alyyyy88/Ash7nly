package com.ash7nly.monolith.dto.request;

import com.ash7nly.monolith.enums.ShipmentStatus;

import java.time.LocalDateTime;

public class TrackingHistoryDTO {
    private ShipmentStatus status;
    private LocalDateTime timestamp;

    public TrackingHistoryDTO(ShipmentStatus status, LocalDateTime timestamp) {
        this.status = status;
        this.timestamp = timestamp;
    }

    public TrackingHistoryDTO() {
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }

}