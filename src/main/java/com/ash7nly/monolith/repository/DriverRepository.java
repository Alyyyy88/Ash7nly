package com.ash7nly.monolith.repository;

import com.ash7nly.monolith.entity.Driver;
import com.ash7nly.monolith.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByUserId(Long userId);

    @Query("SELECT s FROM Shipment s " +
            "JOIN Delivery d ON d.shipment. id = s.id " +
            "WHERE s.deliveryAddress = (SELECT dr.serviceArea FROM Driver dr WHERE dr.id = :driverId) " +
            "AND d.driver IS NULL")
    List<Shipment> findAvailableShipmentsForDriver(@Param("driverId") Long driverId);
}

