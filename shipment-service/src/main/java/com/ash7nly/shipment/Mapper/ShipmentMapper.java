package com.ash7nly.shipment.Mapper;

import com.ash7nly.common.enums.ShipmentStatus;
import com.ash7nly.shipment.DTOs.CancelShipmentResponseDto;
import com.ash7nly.shipment.DTOs.CreateShipmentDTO;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import org.springframework.stereotype.Component;

@Component   // <<< ADD THIS
public class ShipmentMapper {
        private final TrackingMapper trackingMapper;
        public ShipmentMapper(TrackingMapper trackingMapper){
            this.trackingMapper=trackingMapper;

        }
    public ShipmentEntity toEntity(CreateShipmentDTO request, Long merchantId) {

        ShipmentEntity shipment = new ShipmentEntity();
        shipment.setMerchantId(merchantId);
        shipment.setPickupAdress(request.getPickupAdress());
        shipment.setDeliveryAdress(request.getDeliveryAdress());
        shipment.setCustomerName(request.getCustomerName());
        shipment.setCustomerphone(request.getCustomerPhone());
        shipment.setPackageWeight(request.getPackageWeight());
        shipment.setPackageDimension(request.getPackageDimension());
        shipment.setPackageDescription(request.getPackageDescription());
        shipment.setCost(request.getCost());
        shipment.setStatus(ShipmentStatus.CREATED);
        shipment.setTrackingNumber(trackingMapper.generateTrackingCode());
        shipment.setActive(true);

        return shipment;
    }

    public static CancelShipmentResponseDto toCancelResponse(ShipmentEntity shipment) {

        CancelShipmentResponseDto dto = new CancelShipmentResponseDto();
        dto.setTrackingNumber(shipment.getTrackingNumber());
        dto.setStatus(shipment.getStatus().name());
        dto.setMessage("Shipment cancelled successfully");

        return dto;
    }
}
