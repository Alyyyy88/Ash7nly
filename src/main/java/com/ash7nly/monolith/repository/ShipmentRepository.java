package com.ash7nly.monolith.repository;

import com.ash7nly.monolith.entity.ShipmentEntity;
import com.ash7nly.monolith.enums.DeliveryArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<ShipmentEntity, Long> {
    Optional<ShipmentEntity> findBytrackingNumber(String trackingNumber);
    Optional<ShipmentEntity> findByShipmentId(long shipmentId);
    List<ShipmentEntity> findByDeliveryAdress(DeliveryArea deliveryArea);
}

