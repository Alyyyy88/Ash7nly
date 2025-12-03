package com.ash7nly.shipment.Services;

import com.ash7nly.shipment.DTOs.CreateShipmentDTO;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Mapper.ShipmentMapper;
import com.ash7nly.shipment.Repository.ShipmentRepository;
import org.springframework.stereotype.Service;

@Service
public class CreateService {

    private final ShipmentRepository shipmentRepository;
    private final ShipmentMapper shipmentMapper;

    // Manual constructor instead of @RequiredArgsConstructor
    public CreateService(ShipmentRepository shipmentRepository, ShipmentMapper shipmentMapper) {
        this.shipmentRepository = shipmentRepository;
        this.shipmentMapper = shipmentMapper;
    }

    public ShipmentEntity createShipment(CreateShipmentDTO request, Long merchantId) {
        ShipmentEntity shipment = shipmentMapper.toEntity(request, merchantId);
        return shipmentRepository.save(shipment);
    }
}
