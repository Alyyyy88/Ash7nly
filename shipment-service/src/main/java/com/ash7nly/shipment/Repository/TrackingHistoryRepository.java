package com.ash7nly.shipment.Repository;

import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Entity.TrackingHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackingHistoryRepository extends JpaRepository<TrackingHistoryEntity, Long> {
    List<TrackingHistoryEntity> findByShipmentEntityOrderByTimestampAsc(ShipmentEntity shipment);
}

