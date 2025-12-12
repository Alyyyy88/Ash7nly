package com.ash7nly.monolith.dto.request;

public class CancelShipmentRequestDto {
    private String cancellationReason;
    private long id;

    public String getCancellationReason() {
        return cancellationReason;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}