package com.ash7nly.shipment.Mapper;

import com.ash7nly.common.enums.ShipmentStatus;
import com.ash7nly.shipment.DTOs.CreateShipmentRequest;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import org.springframework.stereotype.Component;

@Component
public class ShipmentMapper {

    public ShipmentEntity toEntity(CreateShipmentRequest request, Long merchantId) {
        return ShipmentEntity.builder()
                .merchantId(merchantId)
                .PickupAdress(request.getPickupAddress())
                .DeliveryAdress(request.getDeliveryAddress())
                .CustomerName(request.getCustomerName())
                .Customerphone(request.getCustomerPhone())
                .PackageWeight(request.getPackageWeight())
                .PackageDimension(request.getPackageDimension())
                .PackageDescription(request.getPackageDescription())
                .cost(request.getCost())
                .TrackingNumber(generateTrackingNumber())
                .Status(ShipmentStatus.CREATED)
                .build();
    }

    private long generateTrackingNumber() {
        return System.currentTimeMillis(); // simple unique tracking
    }
}
