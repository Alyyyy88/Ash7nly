package com.ash7nly.delivery.Services;

import com.ash7nly.delivery.Entity.Delivery;
import com.ash7nly.delivery. repository.DeliveryRepository;
import org.springframework.stereotype. Service;
import org.springframework.web. client.RestTemplate;

import java.time.LocalDateTime;
import java.util. List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final RestTemplate restTemplate; // injected from config

    // Base URL for shipment service (use discovery or env var in prod)
    private final String SHIPMENT_BASE = "http://localhost:8082/api/shipments";

    public DeliveryService(DeliveryRepository deliveryRepository, RestTemplate restTemplate) {
        this.deliveryRepository = deliveryRepository;
        this.restTemplate = restTemplate;
    }

    public List<Delivery> getAssignedDeliveries(Long driverId) {
        return deliveryRepository.findByDriverIdAndDeliveredAtIsNull(driverId);
    }

    public Delivery acceptDelivery(Long id) {
        Delivery d = deliveryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found: " + id));
        d.setAcceptedAt(LocalDateTime.now());
        return deliveryRepository. save(d);
    }

    public Delivery rejectDelivery(Long id) {
        Delivery d = deliveryRepository.findById(id)
                . orElseThrow(() -> new IllegalArgumentException("Delivery not found: " + id));
        d. setDriver(null);
        return deliveryRepository.save(d);
    }

    public Delivery updateStatus(Long id, String status) {
        Delivery d = deliveryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found: " + id));

        if ("PICKED_UP".equalsIgnoreCase(status)) d.setPickedUpAt(LocalDateTime.now());
        if ("DELIVERED". equalsIgnoreCase(status)) d.setDeliveredAt(LocalDateTime.now());

        // Example RestTemplate call to update shipment status remotely (no body)
        if (d.getShipmentId() != null) {
            String url = SHIPMENT_BASE + "/" + d.getShipmentId() + "/status?status=" + status;
            restTemplate.put(url, null);
        }

        return deliveryRepository.save(d);
    }

    public Delivery reportFailed(Long id, String reason) {
        Delivery d = deliveryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found: " + id));
        d.setDeliveryNotes(reason);
        return deliveryRepository.save(d);
    }

    public List<Delivery> getHistory(Long driverId) {
        return deliveryRepository. findByDriverId(driverId);
    }
}