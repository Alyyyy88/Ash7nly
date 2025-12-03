package com.ash7nly.shipment.Repository;

import com.ash7nly.shipment.Entity.ShipmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShipmentRepository extends JpaRepository<ShipmentEntity,Long> {
    Optional<ShipmentEntity> findBytrackingNumber(String trackingNumber);
}