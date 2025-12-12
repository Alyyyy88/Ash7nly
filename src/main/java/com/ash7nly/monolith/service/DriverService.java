package com.ash7nly.monolith.service;

import com.ash7nly.monolith.dto.request.AcceptDeliveryRequest;
import com.ash7nly.monolith.dto.request.CreateDriverUserRequest;
import com.ash7nly.monolith.dto.request.UpdateDriverRequest;
import com.ash7nly.monolith.dto.response.ActiveDeliveryResponse;
import com.ash7nly.monolith.dto.response.DeliveryHistoryResponse;
import com.ash7nly.monolith.dto.response.DeliveryResponse;
import com.ash7nly.monolith.dto.response.DriverResponse;
import com.ash7nly.monolith.entity.Delivery;
import com.ash7nly.monolith.entity.Driver;
import com.ash7nly.monolith.entity.ShipmentEntity;
import com.ash7nly.monolith.entity.User;
import com.ash7nly.monolith.enums.DeliveryArea;
import com.ash7nly.monolith.enums.ShipmentStatus;
import com.ash7nly.monolith.enums.UserRole;
import com.ash7nly.monolith.exception.BadRequestException;
import com.ash7nly.monolith.exception.ForbiddenException;
import com.ash7nly.monolith.exception.NotFoundException;
import com.ash7nly.monolith.mapper.DeliveryMapper;
import com.ash7nly.monolith.mapper.DriverMapper;
import com.ash7nly.monolith.repository.DeliveryRepository;
import com.ash7nly.monolith.repository.DriverRepository;
import com.ash7nly.monolith.repository.ShipmentRepository;
import com.ash7nly.monolith.repository.UserRepository;
import com.ash7nly.monolith.security.CurrentUserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;
    private final DriverMapper driverMapper;
    private final CurrentUserService currentUserService;


    private final PasswordEncoder passwordEncoder;
    private final DeliveryRepository deliveryRepository;
    private final ShipmentRepository shipmentRepository;
    private final DeliveryMapper deliveryMapper;
    private final DriverMapper DriverMapper;


    public DriverService(DriverRepository driverRepository, UserRepository userRepository,
                         PasswordEncoder passwordEncoder,
                         DriverMapper driverMapper,
                         CurrentUserService currentUserService,
                         DeliveryRepository deliveryRepository,
                         DriverMapper DriverMapper,
                         ShipmentRepository shipmentRepository, DeliveryMapper deliveryMapper) {
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
        this.driverMapper = driverMapper;
        this.currentUserService = currentUserService;
        this.passwordEncoder = passwordEncoder;
        this.deliveryRepository = deliveryRepository;
        this.shipmentRepository = shipmentRepository;
        this.deliveryMapper = deliveryMapper;
        this.DriverMapper = DriverMapper;
    }




    @Transactional
    public DriverResponse registerDriverUser(CreateDriverUserRequest request) {
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.DRIVER);
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        user = userRepository.save(user);

        Driver driver = new Driver();
        driver.setUser(user);
        driver.setVehicleType(request.getVehicleType());
        driver.setVehicleNumber(request. getVehicleNumber());
        driver.setLicenseNumber(request.getLicenseNumber());
        driver.setServiceArea(DeliveryArea.valueOf(request.getServiceArea()));
        driver.setAvailable(true);

        driver = driverRepository.save(driver);

        return DriverMapper.buildDriverResponse(driver, user);
    }


    public List<DriverResponse> getAllDrivers() {
        if (!currentUserService.isAdmin()) {
            throw new ForbiddenException("Only admins can view all drivers");
        }
        return driverRepository.findAll().stream()
                .map(driverMapper::toResponse)
                .collect(Collectors.toList());
    }

    public DriverResponse getDriver(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Driver not found with id: " + id));
        return driverMapper.toResponse(driver);
    }

    public DriverResponse getMyDriverProfile() {
        Long userId = currentUserService.getCurrentUserId();
        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Driver profile not found"));
        return driverMapper.toResponse(driver);
    }



    @Transactional
    public DriverResponse updateDriver(Long id, UpdateDriverRequest request) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Driver not found"));

        // Only admin or the driver themselves can update
        Long currentUserId = currentUserService.getCurrentUserId();
        if (!currentUserService.isAdmin() && !driver.getUser().getId().equals(currentUserId)) {
            throw new ForbiddenException("Access denied");
        }

        driverMapper.updateEntityFromRequest(driver, request);
        driver = driverRepository.save(driver);

        return driverMapper.toResponse(driver);
    }

    @Transactional
    public DriverResponse updateAvailability(Long id, boolean available) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Driver not found"));

        Long currentUserId = currentUserService.getCurrentUserId();
        if (!driver.getUser().getId().equals(currentUserId) && !currentUserService.isAdmin()) {
            throw new ForbiddenException("Access denied");
        }

        driver.setAvailable(available);
        driver = driverRepository.save(driver);

        return driverMapper.toResponse(driver);
    }

    @Transactional
    public DeliveryResponse acceptDelivery(AcceptDeliveryRequest request) {
        Long userId = currentUserService.getCurrentUserId();

        if (!currentUserService.isDriver()) {
            throw new ForbiddenException("Only drivers can accept deliveries");
        }

        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Driver profile not found"));

        Delivery delivery = deliveryRepository.findById(request.getDeliveryId())
                .orElseThrow(() -> new NotFoundException("Delivery not found with id: " + request.getDeliveryId()));

        if (delivery. getDriver() != null) {
            throw new BadRequestException("Delivery is already assigned to another driver");
        }

        ShipmentEntity shipment = delivery.getShipment();
        if (!shipment.getDeliveryAdress().toString().equalsIgnoreCase(driver.getServiceArea().toString())) {
            throw new BadRequestException("Shipment delivery address is not in your service area");
        }

        delivery. setDriver(driver);
        delivery.setAssignedAt(LocalDateTime.now());
        delivery.setAcceptedAt(LocalDateTime.now());

        shipment.setStatus(ShipmentStatus.ASSIGNED);

        deliveryRepository.save(delivery);
        shipmentRepository.save(shipment);

        return deliveryMapper.buildDeliveryResponse(delivery);
    }


    public List<DeliveryResponse> getMyDeliveries(ShipmentStatus status) {
        Long userId = currentUserService.getCurrentUserId();

        if (! currentUserService.isDriver()) {
            throw new ForbiddenException("Only drivers can access delivery history");
        }

        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Driver profile not found"));

        List<ShipmentStatus> excludedStatuses = Arrays.asList(
                ShipmentStatus.DELIVERED,
                ShipmentStatus. CANCELLED,
                ShipmentStatus.FAILED
        );

        List<Delivery> deliveries = deliveryRepository.findActiveDeliveriesByDriverId(
                driver.getId(),
                excludedStatuses
        );

        if (status != null) {
            deliveries = deliveryRepository.findByDriverIdAndStatus(driver.getId(), status);
        } else {
            deliveries = deliveryRepository.findByDriverId(driver. getId());
        }


        return deliveries.stream()
                .map(deliveryMapper::toResponse)
                .collect(Collectors.toList());
    }


    public ActiveDeliveryResponse getMyActiveDeliveries() {
        Long userId = currentUserService.getCurrentUserId();

        if (!currentUserService.isDriver()) {
            throw new ForbiddenException("Only drivers can access delivery history");
        }

        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Driver profile not found"));

        List<Delivery> deliveries = deliveryRepository.findActiveDeliveriesByDriverId(driver.getId() ,
                Arrays.asList(
                        ShipmentStatus.DELIVERED,
                        ShipmentStatus.CANCELLED,
                        ShipmentStatus.FAILED
                )


        );

        Long activeCount = deliveryRepository.countActiveDeliveriesByDriverId(driver.getId(),
                Arrays.asList(
                        ShipmentStatus.DELIVERED,
                        ShipmentStatus.CANCELLED,
                        ShipmentStatus.FAILED
                )
        );

        List <DeliveryResponse> responses = deliveries.stream()
                .map(deliveryMapper:: toResponse)
                .toList();

        return new ActiveDeliveryResponse(responses, activeCount);
    }

    /**
     * Get driver's completed delivery history
     */
    public DeliveryHistoryResponse getMyCompletedDeliveries() {
        Long userId = currentUserService.getCurrentUserId();

        if (!currentUserService. isDriver()) {
            throw new ForbiddenException("Only drivers can access delivery history");
        }

        Driver driver = driverRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Driver profile not found"));

        List<Delivery> deliveries = deliveryRepository.findCompletedDeliveriesByDriverId(driver.getId());

        Long completedCount = deliveryRepository.countCompletedDeliveriesByDriverId(driver.getId());

        List<DeliveryResponse> responses = deliveries.stream()
                .map(deliveryMapper:: toResponse)
                .toList();

        return new DeliveryHistoryResponse(responses, completedCount);
    }



}

