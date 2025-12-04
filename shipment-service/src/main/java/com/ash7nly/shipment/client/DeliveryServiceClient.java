package com.ash7nly.shipment.client;

import com.ash7nly.common.response.ApiResponse;
import com.ash7nly.shipment.DTOs.CreateDeliveryRequest;
import com.ash7nly.shipment.DTOs.DeliveryResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "delivery-service", url = "http://localhost:8084")
public interface DeliveryServiceClient {
    @PostMapping("/api/deliveries/create")
    ResponseEntity<ApiResponse<DeliveryResponse>> createDelivery(@RequestBody CreateDeliveryRequest request);


}
