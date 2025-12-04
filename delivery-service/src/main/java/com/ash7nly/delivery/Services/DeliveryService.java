package com.ash7nly.delivery. Services;

import com.ash7nly.delivery.Entity.Delivery;
import com.ash7nly.delivery. repository.DeliveryRepository;
import org. springframework.stereotype.Service;

import java.time. LocalDateTime;
import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public Delivery createDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getAssignedDeliveries(Long driverId) {
        return deliveryRepository.findByDriverIdAndDeliveredAtIsNull(driverId);
    }

    public Delivery acceptDelivery(Long id) {
        Delivery d = deliveryRepository. findById(id)
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
        if ("DELIVERED". equalsIgnoreCase(status)) d. setDeliveredAt(LocalDateTime.now());


        return deliveryRepository.save(d);
    }

    public Delivery reportFailed(Long id, String reason) {
        Delivery d = deliveryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found: " + id));
        d.setDeliveryNotes(reason);
        return deliveryRepository.save(d);
    }

    public List<Delivery> getHistory(Long driverId) {
        return deliveryRepository.findByDriverId(driverId);
    }
}