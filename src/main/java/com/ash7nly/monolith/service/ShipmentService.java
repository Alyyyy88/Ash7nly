package com.ash7nly.monolith.service;

import com.ash7nly.monolith.dto.request.*;
import com.ash7nly.monolith.dto.response.CancelShipmentResponseDto;
import com.ash7nly.monolith.enums.DeliveryArea;
import com.ash7nly.monolith.enums.ShipmentStatus;
import com.ash7nly.monolith.exception.NotFoundException;
import com.ash7nly.monolith.entity.*;
import com.ash7nly.monolith.mapper.*;
import com.ash7nly.monolith.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private ShipmentMapper shipmentMapper;
    @Autowired
    private TrackingMapper trackingMapper;
    @Autowired
    private TrackingHistoryRepository trackingHistoryRepository;
    @Autowired
    private DeliveryRepository deliveryRepository;
    @Autowired
    private NotificationService notificationService;


    @Autowired
    public ShipmentService(ShipmentRepository shipmentRepository, TrackingMapper trackingMapper, ShipmentMapper shipmentMapper, TrackingHistoryRepository trackingHistoryRepository, DeliveryRepository deliveryRepository, NotificationService notificationService) {

    }

    public ShipmentService() {
    }

    public TrackShipmentDTO TrackingInfo(long shipmentId) {
        ShipmentEntity shipment = shipmentRepository.findByShipmentId(shipmentId)
                .orElseThrow(() -> new NotFoundException(
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


        Delivery delivery = new Delivery();
        delivery.setShipment(shipment);
        delivery.setRecipientName(shipment.getCustomerName());
        deliveryRepository.save(delivery);
        shipment = shipmentRepository.save(shipment);

        System.out.println("Attempting to send shipment created notification email for shipment: " + shipment.getTrackingNumber());


        try {
            String emailAddress = Objects.requireNonNullElse(
                    shipment.getCustomerEmail(),
                    "test@test.com"
            );

            notificationService.sendShipmentCreatedNotification(
                    shipment,
                    emailAddress
            );
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());

        }


        return saved;
    }


    public CancelShipmentResponseDto cancelShipment(CancelShipmentRequestDto request) {
        ShipmentEntity shipment = shipmentRepository.findByShipmentId(request.getId())
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

    public ShipmentTrackingDTO getTrackingHistory(String TrackingNumber) {

        ShipmentEntity shipment = shipmentRepository.findBytrackingNumber(TrackingNumber)
                .orElseThrow(() -> new NotFoundException("ShipmentEntity not found"));

             Delivery delivery = shipment.getDelivery();


        List<TrackingHistoryDTO> trackingHistoryDTOS = trackingHistoryRepository.findByShipmentEntityOrderByTimestampAsc(shipment)
                .stream()
                .map(trackingMapper::toDTO)
                .toList();
        if(delivery.getDriver()==null){
           return new ShipmentTrackingDTO(trackingHistoryDTOS,"n/a","n/a","n/a");
        }
        else {
            Driver driver = delivery.getDriver();
            return new ShipmentTrackingDTO(trackingHistoryDTOS,driver.getUser().getPhoneNumber(),driver.getUser().getFullName(),driver.getUser().getEmail());
        }
    }

    public List<ShipmentListDTO> getShipmentsByServiceArea(DeliveryArea serviceArea) {
        List<ShipmentEntity> shipments = shipmentRepository.findByDeliveryAdress(serviceArea);

        return shipments.stream()
                .map(shipmentMapper::toDTO)
                .toList();
    }


    public ShipmentListDTO getShipmentById(long shipmentId) {
        ShipmentEntity shipments = shipmentRepository.findByShipmentId(shipmentId)
                .orElseThrow(() -> new NotFoundException("ShipmentEntity not Found"));
        return shipmentMapper.toDTO(shipments);
    }

    public MerchantShipmentsDTO getShipmentByMerhcantID(long MerchantID){
        List<ShipmentEntity> shipmentEntities = shipmentRepository.findByMerchantId(MerchantID);
        List<ShipmentListDTO> shipmentListDTOS= shipmentEntities.stream().map(shipmentMapper::toDTO).toList();
        long count = shipmentRepository.countByMerchantId(MerchantID);
        return new MerchantShipmentsDTO(shipmentListDTOS,count);
    }

}