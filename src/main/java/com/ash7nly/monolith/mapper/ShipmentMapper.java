package com.ash7nly.monolith.mapper;

import com.ash7nly.monolith.dto.request.CreateShipmentRequest;
import com.ash7nly.monolith.dto.response.CancelShipmentResponse;
import com.ash7nly.monolith.dto.response.ShipmentResponse;
import com.ash7nly.monolith.entity.Shipment;
import com.ash7nly.monolith.entity.User;
import com.ash7nly.monolith.enums.ShipmentStatus;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ShipmentMapper {

    public Shipment toEntity(CreateShipmentRequest request, User merchant) {
        Shipment shipment = new Shipment();
        shipment.setMerchant(merchant);
        shipment.setPickupAddress(request.getPickupAddress());
        shipment.setDeliveryAddress(request.getDeliveryAddress());
        shipment.setCustomerName(request.getCustomerName());
        shipment.setCustomerPhone(request.getCustomerPhone());
        shipment.setPackageWeight(request.getPackageWeight());
        shipment.setPackageDimension(request.getPackageDimension());
        shipment.setPackageDescription(request.getPackageDescription());
        shipment.setCost(request.getCost());
        shipment.setStatus(ShipmentStatus.CREATED);
        shipment.setTrackingNumber(generateTrackingCode());
        shipment.setActive(true);
        return shipment;
    }

    public ShipmentResponse toResponse(Shipment entity) {
        if (entity == null) return null;

        ShipmentResponse response = new ShipmentResponse();
        response.setId(entity.getId());
        response.setTrackingNumber(entity.getTrackingNumber());
        response.setPickupAddress(entity.getPickupAddress());
        response.setDeliveryAddress(entity.getDeliveryAddress());
        response.setCustomerName(entity.getCustomerName());
        response.setCustomerPhone(entity.getCustomerPhone());
        response.setPackageWeight(entity.getPackageWeight());
        response.setPackageDimension(entity.getPackageDimension());
        response.setPackageDescription(entity.getPackageDescription());
        response.setMerchantId(entity.getMerchant() != null ? entity.getMerchant().getId() : null);
        response.setStatus(entity.getStatus());
        response.setCost(entity.getCost());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }

    public CancelShipmentResponse toCancelResponse(Shipment shipment) {
        return new CancelShipmentResponse(
                shipment.getTrackingNumber(),
                shipment.getStatus().name(),
                "Shipment cancelled successfully"
        );
    }

    public String generateTrackingCode() {
        String uuid = UUID.randomUUID().toString();
        String uniqueBase = uuid.replace("-", "").toUpperCase(); // 32 chars
        String uniqueCode = uniqueBase.substring(0, 12);

        return "TRK" + uniqueCode;
    }
}

