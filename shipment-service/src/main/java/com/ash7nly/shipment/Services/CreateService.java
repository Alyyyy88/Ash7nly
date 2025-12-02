package com.ash7nly.shipment.Services;

import com.ash7nly.common.enums.ShipmentStatus;
import com.ash7nly.shipment.DTOs.CreateShipmentRequest;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateService {

    private final ShipmentRepository shipmentRepository;
    public ShipmentEntity createShipment(CreateShipmentRequest request, Long merchantId) {
    Long tracking=GenerateTrackingNumber();
    ShipmentEntity shipment = ShipmentEntity.builder().
            merchantId(merchantId)
            .PickupAdress(request.getPickupAddress())
            .DeliveryAdress(request.getDeliveryAddress())
            .CustomerName(request.getCustomerName())
            .Customerphone(request.getCustomerPhone())
            .PackageWeight(request.getPackageWeight())
            .PackageDimension(request.getPackageDimension())
            .PackageDescription(request.getPackageDescription())
            .cost(request.getCost())
            .TrackingNumber(tracking)
            .Status(ShipmentStatus.CREATED)
            .build();
        return shipmentRepository.save(shipment);
}
    private long GenerateTrackingNumber() {
        return System.currentTimeMillis(); // da random tracking number
    }

}
