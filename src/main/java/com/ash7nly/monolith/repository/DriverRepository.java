package com.ash7nly.monolith.repository;

import com.ash7nly.monolith.entity.Driver;
import com.ash7nly.monolith.entity.ShipmentEntity;
import com.ash7nly.monolith.entity.ShipmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByUserId(Long userId);

    @Query("SELECT s FROM ShipmentEntity s " +
            "WHERE s.deliveryAdress = (SELECT dr.serviceArea FROM Driver dr WHERE dr.id = :driverId) " +
            "AND NOT EXISTS (" +
            "    SELECT 1 FROM Delivery d " +
            "    WHERE d.shipmentEntity. shipmentId = s.shipmentId " +
            "    AND d.driver IS NOT NULL" +
            ")")
    List<ShipmentEntity> findAvailableShipmentsForDriver(@Param("driverId") Long driverId);
}

