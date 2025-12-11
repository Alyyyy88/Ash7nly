package com.ash7nly.monolith.service;

import com.ash7nly.monolith.dto.request.*;
import com.ash7nly.monolith.dto.response.CancelShipmentResponseDto;
import com.ash7nly.monolith.enums.DeliveryArea;
import com.ash7nly.monolith.enums.ShipmentStatus;
import com.ash7nly.monolith.exception.NotFoundException;
import com.ash7nly.monolith.entity.*;
import com.ash7nly.monolith.mapper.*;
import com.ash7nly.monolith.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final ShipmentMapper shipmentMapper;
    private final TrackingMapper trackingMapper;
    private final TrackingHistoryRepository trackingHistoryRepository;


    public ShipmentService  (ShipmentRepository shipmentRepository, TrackingMapper trackingMapper , ShipmentMapper shipmentMapper, TrackingHistoryRepository trackingHistoryRepository){
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

    @Transactional
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
                        "ShipmentEntity Not found"));

        if (shipment.getStatus() != ShipmentStatus.ASSIGNED &&
                shipment.getStatus() != ShipmentStatus.CREATED) {
            throw new RuntimeException("ShipmentEntity cannot be cancelled after pickup");
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

    public UpdateShipmentDTO updateShipmentStatus(long shipmentId, ShipmentStatus newStatus) {
        ShipmentEntity shipment = shipmentRepository.findByShipmentId(shipmentId)
                .orElseThrow(() -> new NotFoundException("ShipmentEntity not found"));

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
                .orElseThrow(() -> new NotFoundException("ShipmentEntity not found"));

        return trackingHistoryRepository.findByShipmentEntityOrderByTimestampAsc(shipment)
                .stream()
                .map(trackingMapper::toDTO)
                .toList();
    }

    public List<ShipmentListDTO> getShipmentsByServiceArea(DeliveryArea serviceArea) {
        List<ShipmentEntity> shipments = shipmentRepository.findByDeliveryAdress(serviceArea);

        return shipments.stream()
                .map(shipmentMapper::toDTO)
                .toList();
    }


    public ShipmentListDTO getShipmentById(long shipmentId){
        ShipmentEntity shipments = shipmentRepository.findByShipmentId(shipmentId)
                .orElseThrow(()-> new NotFoundException("ShipmentEntity not Found"));
        return shipmentMapper.toDTO(shipments);
    }

}