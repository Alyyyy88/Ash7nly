package com.ash7nly.shipment.Services;
import com.ash7nly.common.enums.ShipmentStatus;
import com.ash7nly.common.exception.NotFoundException;
import com.ash7nly.shipment.DTOs.CancelShipmentRequestDto;
import com.ash7nly.shipment.DTOs.CancelShipmentResponseDto;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Mapper.ShipmentMapper;
import com.ash7nly.shipment.Repository.ShipmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


@Service
public class CancelService {

    private final ShipmentRepository shipmentRepository;
    public  CancelService(ShipmentRepository shipmentRepository){
        this.shipmentRepository = shipmentRepository;
    }

    public CancelShipmentResponseDto cancelShipment(CancelShipmentRequestDto request) {

        ShipmentEntity shipment = shipmentRepository.findBytrackingNumber(request.getTrackingNumber())
                .orElseThrow(() -> new NotFoundException(
                        "Shipment Not found"));

        // Check that shipment is eligible for cancellation
        if (shipment.getStatus() != ShipmentStatus.ASSIGNED &&
                shipment.getStatus() != ShipmentStatus.CREATED) {
            throw new RuntimeException("Shipment cannot be cancelled after pickup");
        }

        // hna bn update status
        shipment.setStatus(ShipmentStatus.CANCELLED);
        shipment.setCancellationReason(request.getCancellationReason());

        // hna bn8yer el active soft delete zy ma omar 2al
        shipment.setActive(false);


        shipmentRepository.save(shipment);

        return ShipmentMapper.toCancelResponse(shipment);
}
}