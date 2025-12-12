package com.ash7nly.monolith.service;

import com.ash7nly.monolith.dto.request.ShipmentListDTO;
import com.ash7nly.monolith.dto.request.UpdateDeliveryStatusRequest;
import com.ash7nly.monolith.dto.response.DeliveryResponse;
import com.ash7nly.monolith.entity.Delivery;
import com.ash7nly.monolith.entity.Driver;
import com.ash7nly.monolith.entity.ShipmentEntity;
import com.ash7nly.monolith.enums.ShipmentStatus;
import com.ash7nly.monolith.exception.BadRequestException;
import com.ash7nly.monolith.exception.ForbiddenException;
import com.ash7nly.monolith.exception.NotFoundException;
import com.ash7nly.monolith.mapper.DeliveryMapper;
import com.ash7nly.monolith.mapper.ShipmentMapper;
import com.ash7nly.monolith.repository.DeliveryRepository;
import com.ash7nly.monolith.repository.DriverRepository;
import com.ash7nly.monolith.repository.ShipmentRepository;
import com.ash7nly.monolith.security.CurrentUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final DriverRepository driverRepository;
    private final ShipmentRepository shipmentRepository;
    private final DeliveryMapper deliveryMapper;
    private final CurrentUserService currentUserService;
    private final NotificationService notificationService;
    private final ShipmentMapper shipmentMapper;
    private final ShipmentService shipmentService;




    public DeliveryService(DeliveryRepository deliveryRepository, DriverRepository driverRepository,
                           ShipmentRepository shipmentRepository, DeliveryMapper deliveryMapper,
                           CurrentUserService currentUserService, NotificationService notificationService,
                           ShipmentMapper shipmentMapper,
                            ShipmentService shipmentService
    ) {
        this.deliveryRepository = deliveryRepository;
        this.driverRepository = driverRepository;
        this.shipmentRepository = shipmentRepository;
        this.deliveryMapper = deliveryMapper;
        this.currentUserService = currentUserService;
        this.notificationService = notificationService;
        this.shipmentMapper = shipmentMapper;
        this.shipmentService = shipmentService;
    }


    public List<DeliveryResponse> getAssignedDeliveries(Long driverId) {
        validateDriverAccess(driverId);
        return deliveryRepository.findByDriverIdAndDeliveredAtIsNull(driverId).stream()
                .map(deliveryMapper::toResponse)
                .collect(Collectors.toList());
    }


    @Transactional
    public DeliveryResponse reportFailed(Long deliveryId, String reason) {
        Delivery delivery = getDeliveryById(deliveryId);
        validateDriverAccess(delivery.getDriver().getId());

        delivery.setDeliveryNotes(reason);
        if (delivery.getShipment() != null) {
            delivery.getShipment().setStatus(ShipmentStatus.FAILED);
            shipmentRepository.save(delivery.getShipment());
        }

        delivery = deliveryRepository.save(delivery);
        return deliveryMapper.toResponse(delivery);
    }


    private Delivery getDeliveryById(Long id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Delivery not found with id: " + id));
    }

    private void validateDriverAccess(Long driverId) {
        if (currentUserService.isAdmin()) {
            return;
        }

        Long currentUserId = CurrentUserService.getCurrentUserId();
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new NotFoundException("Driver not found"));

        if (!driver.getUser().getId().equals(currentUserId)) {
            throw new ForbiddenException("Access denied");
        }
    }

    // GET DELIVERIES FOR THE SAME SERVICE AREA OF THE DRIVER

    public List<ShipmentListDTO> getAvailableDeliveries() {

        Long userId = CurrentUserService. getCurrentUserId();

        if (!currentUserService.isDriver()) {
            throw new ForbiddenException("Only drivers can access this endpoint");
        }

        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Driver profile not found"));

        List<ShipmentEntity> shipments = driverRepository.findAvailableShipmentsForDriver(driver.getId());

        return shipments.stream()
                .map(shipmentMapper::toDTO)
                .collect(Collectors.toList());
    }


    // update DELIVERY STATUS
    @Transactional
    public DeliveryResponse updateDeliveryStatus(UpdateDeliveryStatusRequest request) {
        Long userId = currentUserService.getCurrentUserId();

        if (!currentUserService.isDriver()) {
            throw new ForbiddenException("Only drivers can update delivery status");
        }
        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Driver profile not found"));

        Delivery delivery = deliveryRepository.findById(request.getDeliveryId())
                .orElseThrow(() -> new NotFoundException("Delivery not found with id: " + request. getDeliveryId()));

        if (delivery.getDriver() == null || ! delivery.getDriver().getId().equals(driver.getId())) {
            throw new ForbiddenException("This delivery is not assigned to you");
        }

        ShipmentEntity shipment = delivery.getShipment();

        validateStatusTransition(shipment.getStatus(), request.getStatus());

        LocalDateTime now = LocalDateTime.now();

        Long id = shipment.getShipmentId();
        System.out.println("Shipment ID: " + id);



        switch (request.getStatus()) {
            case PICKED_UP:
                delivery.setPickedUpAt(now);
                shipment.setStatus(ShipmentStatus. PICKED_UP);
                shipmentService.updateShipmentStatus(id, ShipmentStatus. PICKED_UP); ;
                break;

            case IN_TRANSIT:
                if (delivery.getPickedUpAt() == null) {
                    throw new BadRequestException("Cannot set IN_TRANSIT before PICKED_UP");
                }
                shipment.setStatus(ShipmentStatus.IN_TRANSIT);
                shipmentService.updateShipmentStatus(id, ShipmentStatus. IN_TRANSIT); ;

                break;

            case DELIVERED:
                if (delivery.getPickedUpAt() == null) {
                    throw new BadRequestException("Cannot set DELIVERED before PICKED_UP");
                }
                delivery.setDeliveredAt(now);
                shipment.setStatus(ShipmentStatus.DELIVERED);
                shipmentService.updateShipmentStatus(id, ShipmentStatus. DELIVERED); ;

                shipment.setActive(false);
                break;

            case FAILED:
                delivery.setDeliveredAt(now);
                shipment.setStatus(ShipmentStatus.FAILED);
                shipment.setActive(false);
                shipmentService.updateShipmentStatus(id, ShipmentStatus. FAILED); ;


                break;

            default:
                throw new BadRequestException("Invalid status update:  " + request.getStatus());
        }

        if (request. getDeliveryNotes() != null && !request.getDeliveryNotes().isBlank()) {
            delivery. setDeliveryNotes(request.getDeliveryNotes());
        }

        deliveryRepository.save(delivery);
        shipmentRepository.save(shipment);

        try {
            String customerEmail = shipment.getCustomerEmail() != null ? shipment.getCustomerEmail() : "test@test.com";
            notificationService.sendStatusUpdateNotification(delivery, customerEmail);
        } catch (Exception e) {
            System.err.println(" Warning: Failed to send status update email:  " + e.getMessage());
        }

        return deliveryMapper.buildDeliveryResponse(delivery);
    }

    /**
     * Validate that status transition is allowed
     * Prevents invalid state changes (e.g., DELIVERED -> PICKED_UP)
     */
    private void validateStatusTransition(ShipmentStatus currentStatus, ShipmentStatus newStatus) {
        switch (currentStatus) {
            case ASSIGNED:
                if (newStatus != ShipmentStatus.PICKED_UP && newStatus != ShipmentStatus. FAILED) {
                    throw new BadRequestException("From ASSIGNED, can only transition to PICKED_UP or FAILED");
                }
                break;

            case PICKED_UP:
                if (newStatus != ShipmentStatus. IN_TRANSIT && newStatus != ShipmentStatus.DELIVERED && newStatus != ShipmentStatus. FAILED) {
                    throw new BadRequestException("From PICKED_UP, can only transition to IN_TRANSIT, DELIVERED, or FAILED");
                }
                break;

            case IN_TRANSIT:
                if (newStatus != ShipmentStatus.DELIVERED && newStatus != ShipmentStatus.FAILED) {
                    throw new BadRequestException("From IN_TRANSIT, can only transition to DELIVERED or FAILED");
                }
                break;

            case DELIVERED:
            case CANCELLED:
                throw new BadRequestException("Cannot update status from " + currentStatus);

            default:
                throw new BadRequestException("Invalid current status: " + currentStatus);
        }
    }




}

