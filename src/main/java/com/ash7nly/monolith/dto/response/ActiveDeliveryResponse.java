package com.ash7nly.monolith.dto.response;

import java.util.List;

public class ActiveDeliveryResponse {
    private List<DeliveryResponse> deliveries;
    private Long total;

    public ActiveDeliveryResponse() {
    }

    public ActiveDeliveryResponse(List<DeliveryResponse> deliveries, Long total) {
        this.deliveries = deliveries;
        this.total = total;
    }

    public List<DeliveryResponse> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<DeliveryResponse> deliveries) {
        this.deliveries = deliveries;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
