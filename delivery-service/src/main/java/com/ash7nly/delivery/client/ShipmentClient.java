package com.ash7nly.delivery.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "shipment-service", url = "http://localhost:8082")
public interface ShipmentClient {
    @GetMapping(value = "/api/shipments/")
    public String getShipments();
}
