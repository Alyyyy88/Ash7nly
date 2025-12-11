//package com.ash7nly.monolith.service;
//
//import com.ash7nly.monolith.dto.response.DeliveryResponse;
//import com.ash7nly.monolith.entity.Delivery;
//import com.ash7nly.monolith.entity.Driver;
//import com.ash7nly.monolith.entity.ShipmentEntity;
//import com.ash7nly.monolith.enums.ShipmentStatus;
//import com.ash7nly.monolith.exception.ForbiddenException;
//import com.ash7nly.monolith.exception.NotFoundException;
//import com.ash7nly.monolith.mapper.DeliveryMapper;
//import com.ash7nly.monolith.repository.DeliveryRepository;
//import com.ash7nly.monolith.repository.DriverRepository;
//import com.ash7nly.monolith.repository.ShipmentRepository;
//import com.ash7nly.monolith.security.CurrentUserService;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class DeliveryService {
//
//    private final DeliveryRepository deliveryRepository;
//    private final DriverRepository driverRepository;
//    private final ShipmentRepository shipmentRepository;
//    private final DeliveryMapper deliveryMapper;
//    private final CurrentUserService currentUserService;
//
//    public DeliveryService(DeliveryRepository deliveryRepository, DriverRepository driverRepository,
//                           ShipmentRepository shipmentRepository, DeliveryMapper deliveryMapper,
//                           CurrentUserService currentUserService) {
//        this.deliveryRepository = deliveryRepository;
//        this.driverRepository = driverRepository;
//        this.shipmentRepository = shipmentRepository;
//        this.deliveryMapper = deliveryMapper;
//        this.currentUserService = currentUserService;
//    }
//
//    public List<DeliveryResponse> getAssignedDeliveries(Long driverId) {
//        validateDriverAccess(driverId);
//        return deliveryRepository.findByDriverIdAndDeliveredAtIsNull(driverId).stream()
//                .map(deliveryMapper::toResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public DeliveryResponse acceptDelivery(Long deliveryId) {
//        Delivery delivery = getDeliveryById(deliveryId);
//        validateDriverAccess(delivery.getDriver().getId());
//
//        delivery.setAcceptedAt(LocalDateTime.now());
//        delivery = deliveryRepository.save(delivery);
//
//        return deliveryMapper.toResponse(delivery);
//    }
//
//    @Transactional
//    public DeliveryResponse rejectDelivery(Long deliveryId) {
//        Delivery delivery = getDeliveryById(deliveryId);
//        validateDriverAccess(delivery.getDriver().getId());
//
//        delivery.setDriver(null);
//        delivery = deliveryRepository.save(delivery);
//
//        // Update shipment status back to CREATED
//        if (delivery.getShipment() != null) {
//            ShipmentEntity shipmentEntity = delivery.getShipment();
//            shipmentEntity.setStatus(ShipmentStatus.CREATED);
//            shipmentRepository.save(shipmentEntity);
//        }
//
//        return deliveryMapper.toResponse(delivery);
//    }
//
//    @Transactional
//    public DeliveryResponse updateStatus(Long deliveryId, String status) {
//        Delivery delivery = getDeliveryById(deliveryId);
//        validateDriverAccess(delivery.getDriver().getId());
//
//        if ("PICKED_UP".equalsIgnoreCase(status)) {
//            delivery.setPickedUpAt(LocalDateTime.now());
//            if (delivery.getShipment() != null) {
//                delivery.getShipment().setStatus(ShipmentStatus.PICKED_UP);
//                shipmentRepository.save(delivery.getShipment());
//            }
//        }
//
//        if ("DELIVERED".equalsIgnoreCase(status)) {
//            delivery.setDeliveredAt(LocalDateTime.now());
//            if (delivery.getShipment() != null) {
//                delivery.getShipment().setStatus(ShipmentStatus.DELIVERED);
//                shipmentRepository.save(delivery.getShipment());
//            }
//        }
//
//        if ("IN_TRANSIT".equalsIgnoreCase(status) && delivery.getShipment() != null) {
//            delivery.getShipment().setStatus(ShipmentStatus.IN_TRANSIT);
//            shipmentRepository.save(delivery.getShipment());
//        }
//
//        delivery = deliveryRepository.save(delivery);
//        return deliveryMapper.toResponse(delivery);
//    }
//
//    @Transactional
//    public DeliveryResponse reportFailed(Long deliveryId, String reason) {
//        Delivery delivery = getDeliveryById(deliveryId);
//        validateDriverAccess(delivery.getDriver().getId());
//
//        delivery.setDeliveryNotes(reason);
//        if (delivery.getShipment() != null) {
//            delivery.getShipment().setStatus(ShipmentStatus.FAILED);
//            shipmentRepository.save(delivery.getShipment());
//        }
//
//        delivery = deliveryRepository.save(delivery);
//        return deliveryMapper.toResponse(delivery);
//    }
//
//    public List<DeliveryResponse> getHistory(Long driverId) {
//        validateDriverAccess(driverId);
//        return deliveryRepository.findByDriverId(driverId).stream()
//                .map(deliveryMapper::toResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public DeliveryResponse assignDelivery(Long shipmentId, Long driverId) {
//        if (!currentUserService.isAdmin()) {
//            throw new ForbiddenException("Only admins can assign deliveries");
//        }
//
//        ShipmentEntity shipmentEntity = shipmentRepository.findById(shipmentId)
//                .orElseThrow(() -> new NotFoundException("ShipmentEntity not found"));
//
//        Driver driver = driverRepository.findById(driverId)
//                .orElseThrow(() -> new NotFoundException("Driver not found"));
//
//        Delivery delivery = new Delivery();
//        delivery.setShipment(shipmentEntity);
//        delivery.setDriver(driver);
//        delivery.setAssignedAt(LocalDateTime.now());
//
//        shipmentEntity.setStatus(ShipmentStatus.ASSIGNED);
//        shipmentRepository.save(shipmentEntity);
//
//        delivery = deliveryRepository.save(delivery);
//        return deliveryMapper.toResponse(delivery);
//    }
//
//    private Delivery getDeliveryById(Long id) {
//        return deliveryRepository.findById(id)
//                .orElseThrow(() -> new NotFoundException("Delivery not found with id: " + id));
//    }
//
//    private void validateDriverAccess(Long driverId) {
//        if (currentUserService.isAdmin()) {
//            return;
//        }
//
//        Long currentUserId = currentUserService.getCurrentUserId();
//        Driver driver = driverRepository.findById(driverId)
//                .orElseThrow(() -> new NotFoundException("Driver not found"));
//
//        if (!driver.getUser().getId().equals(currentUserId)) {
//            throw new ForbiddenException("Access denied");
//        }
//    }
//}
//
