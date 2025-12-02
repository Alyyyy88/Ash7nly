package com.ash7nly.shipment.Services;

import com.ash7nly.shipment.DTOs.CreateShipmentRequest;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Mapper.ShipmentMapper;
import com.ash7nly.shipment.Repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateService {


    private final ShipmentRepository shipmentRepository;

    private final ShipmentMapper shipmentMapper;

    public ShipmentEntity createShipment(CreateShipmentRequest request, Long merchantId) {
        ShipmentEntity shipment = shipmentMapper.toEntity(request, merchantId);
        return shipmentRepository.save(shipment);
    }
}
