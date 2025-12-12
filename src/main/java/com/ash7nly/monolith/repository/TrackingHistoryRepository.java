package com.ash7nly.monolith.repository;

import com.ash7nly.monolith.entity.ShipmentEntity;
import com.ash7nly.monolith.entity.TrackingHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackingHistoryRepository extends JpaRepository<TrackingHistoryEntity, Long> {
    List<TrackingHistoryEntity> findByShipmentEntityOrderByTimestampAsc(ShipmentEntity shipment);
}