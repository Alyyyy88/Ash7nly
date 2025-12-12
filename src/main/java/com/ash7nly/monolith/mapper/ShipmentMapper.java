package com.ash7nly.monolith.mapper;

import com.ash7nly.monolith.dto.request.CreateShipmentDTO;
import com.ash7nly.monolith.dto.request.ShipmentListDTO;
import com.ash7nly.monolith.dto.request.UpdateShipmentDTO;
import com.ash7nly.monolith.dto.response.CancelShipmentResponseDto;
import com.ash7nly.monolith.entity.ShipmentEntity;
import com.ash7nly.monolith.enums.ShipmentStatus;
import com.ash7nly.monolith.exception.ForbiddenException;
import org.springframework.stereotype.Component;

@Component
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
        shipment.setCustomerEmail(request.getCustomerEmail());
        shipment.setPackageWeight(request.getPackageWeight());
        shipment.setPackageDimension(request.getPackageDimension());
        shipment.setPackageDescription(request.getPackageDescription());
        shipment.setCost(CalculateCost(request));
        shipment.setStatus(ShipmentStatus.CREATED);
        shipment.setTrackingNumber(trackingMapper.generateTrackingCode());
        shipment.setActive(true);

        return shipment;
    }

    public ShipmentListDTO toDTO(ShipmentEntity entity) {

        ShipmentListDTO shipment = new ShipmentListDTO();
        shipment.setMerchantId(entity.getMerchantId());
        shipment.setPickupAdress(entity.getPickupAdress());
        shipment.setDeliveryAdress(entity.getDeliveryAdress());
        shipment.setCustomerName(entity.getCustomerName());
        shipment.setCustomerEmail(entity.getCustomerEmail());
        shipment.setCost(entity.getCost());
        shipment.setStatus(entity.getStatus());
        shipment.setTrackingNumber(entity.getTrackingNumber());
        shipment.setActive(true);
        shipment.setShipmentId(entity.getShipmentId());

        return shipment;
    }
    public static CancelShipmentResponseDto toCancelResponse(ShipmentEntity shipment) {

        CancelShipmentResponseDto dto = new CancelShipmentResponseDto();
        dto.setId(shipment.getShipmentId());
        dto.setTrackingNumber(shipment.getTrackingNumber());
        dto.setStatus(shipment.getStatus().name());
        dto.setMessage("Shipment cancelled successfully");

        return dto;
    }
    public static UpdateShipmentDTO toUpdateShipment(ShipmentEntity shipment){
        UpdateShipmentDTO updateShipmentDTO = new UpdateShipmentDTO();
        updateShipmentDTO.setShipmentID(shipment.getShipmentId());
        updateShipmentDTO.setStatus(shipment.getStatus());
        return updateShipmentDTO;
    }
    public static double CalculateCost(CreateShipmentDTO createShipmentDTO){
        double weight = Double.parseDouble(createShipmentDTO.getPackageWeight().replace("kg","").trim());
        if(weight > 60 ){
            throw new ForbiddenException("Weight is Over 60kg , Not allowed ");
        }
        return switch (createShipmentDTO.getDeliveryAdress()) {
            case HELWAN -> createShipmentDTO.getCost() + 30;
            case FISAL -> createShipmentDTO.getCost() + 40;
            case HARAM -> createShipmentDTO.getCost() + 50;
            case MAADI -> createShipmentDTO.getCost() + 60;
            case DOKKI -> createShipmentDTO.getCost() + 70;
            case ZAMALEK -> createShipmentDTO.getCost() + 80;
            case IMBABA -> createShipmentDTO.getCost() + 120;
            case ROD_ELFARAG -> createShipmentDTO.getCost() + 90;
            case NASR_CITY -> createShipmentDTO.getCost() + 100;
        };
    }
}