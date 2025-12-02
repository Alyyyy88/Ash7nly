package com.ash7nly.shipment.DTOs;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class CreateShipmentRequest {
    private long merchantId;

    private String pickupAddress;
    private String deliveryAddress;
    private String customerName;
    private String customerPhone;

    private String packageWeight;
    private String packageDimension;
    private String packageDescription;

    private double cost;

}
