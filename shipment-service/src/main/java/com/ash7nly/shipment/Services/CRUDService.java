package com.ash7nly.shipment.Services;

import com.ash7nly.common.enums.ShipmentStatus;
import com.ash7nly.common.exception.NotFoundException;
import com.ash7nly.shipment.DTOs.*;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Entity.TrackingHistoryEntity;
import com.ash7nly.shipment.Mapper.ShipmentMapper;
import com.ash7nly.shipment.Mapper.TrackingMapper;
import com.ash7nly.shipment.Repository.ShipmentRepository;
import org.springframework.stereotype.Service;
import com.ash7nly.shipment.Repository.TrackingHistoryRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CRUDService {

    private final ShipmentRepository shipmentRepository;
    private final ShipmentMapper shipmentMapper;
    private final TrackingMapper trackingMapper;
    private final TrackingHistoryRepository trackingHistoryRepository;
    public CRUDService(ShipmentRepository shipmentRepository, TrackingMapper trackingMapper , ShipmentMapper shipmentMapper, TrackingHistoryRepository trackingHistoryRepository){
        this.shipmentRepository =shipmentRepository;
        this.trackingMapper = trackingMapper;
        this.shipmentMapper = shipmentMapper;
        this.trackingHistoryRepository= trackingHistoryRepository;
    }
    public TrackShipmentDTO TrackingInfo(String trackingNumber){
        ShipmentEntity shipment = shipmentRepository.findBytrackingNumber(trackingNumber)
                .orElseThrow(()->new NotFoundException(
                        "Tracking Code not found"));
            return trackingMapper.toDTO(shipment);
    }

    public ShipmentEntity createShipment(CreateShipmentDTO request, Long merchantId) {
        ShipmentEntity shipment = shipmentMapper.toEntity(request, merchantId);
        ShipmentEntity saved = shipmentRepository.save(shipment);

        TrackingHistoryEntity history = new TrackingHistoryEntity();
        history.setShipmentEntity(shipment);
        history.setShipmentStatus(ShipmentStatus.CREATED);
        trackingHistoryRepository.save(history);

        return saved ;
    }


    public CancelShipmentResponseDto cancelShipment(CancelShipmentRequestDto request) {
        ShipmentEntity shipment = shipmentRepository.findBytrackingNumber(request.getTrackingNumber())
                .orElseThrow(() -> new NotFoundException(
                        "Shipment Not found"));

        if (shipment.getStatus() != ShipmentStatus.ASSIGNED &&
                shipment.getStatus() != ShipmentStatus.CREATED) {
            throw new RuntimeException("Shipment cannot be cancelled after pickup");
        }

        shipment.setStatus(ShipmentStatus.CANCELLED);
        shipment.setCancellationReason(request.getCancellationReason());
        shipment.setActive(false);
        shipmentRepository.save(shipment);


        TrackingHistoryEntity history = new TrackingHistoryEntity();
        history.setShipmentEntity(shipment);
        history.setShipmentStatus(ShipmentStatus.CANCELLED);
        trackingHistoryRepository.save(history);

        return ShipmentMapper.toCancelResponse(shipment);
    }

    public UpdateShipmentDTO updateShipmentStatus(String trackingNumber, ShipmentStatus newStatus) {
        ShipmentEntity shipment = shipmentRepository.findBytrackingNumber(trackingNumber)
                .orElseThrow(() -> new NotFoundException("Shipment not found"));

        shipment.setStatus(newStatus);
        shipment.setUpdatedAt(LocalDateTime.now());
        ShipmentEntity savedShipment = shipmentRepository.save(shipment);

        // Save Tracking History
        TrackingHistoryEntity history = new TrackingHistoryEntity();
        history.setShipmentEntity(shipment); // <<< Foreign Key
        history.setShipmentStatus(newStatus);
        trackingHistoryRepository.save(history);

        return ShipmentMapper.toUpdateShipment(savedShipment);

    }

    public List<TrackingHistoryDTO> getTrackingHistory(String trackingNumber) {

        ShipmentEntity shipment = shipmentRepository.findBytrackingNumber(trackingNumber)
                .orElseThrow(() -> new NotFoundException("Shipment not found"));

        return trackingHistoryRepository.findByShipmentEntityOrderByTimestampAsc(shipment)
                .stream()
                .map(trackingMapper::toDTO)
                .toList();
    }

}
