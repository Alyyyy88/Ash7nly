package com.ash7nly.monolith.repository;

import com.ash7nly.monolith.entity.Delivery;
import com.ash7nly.monolith.enums.ShipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByDriverId(Long driverId);
    List<Delivery> findByDriverIdAndDeliveredAtIsNull(Long driverId);
    @Query("SELECT d FROM Delivery d WHERE d.shipmentEntity.shipmentId = :shipmentId")
    Optional<Delivery> findByShipmentId(@Param("shipmentId") Long shipmentId);


    @Query("SELECT d FROM Delivery d " +
            "JOIN FETCH d.shipmentEntity s " +
            "WHERE d.driver.id = :driverId " +
            "AND s.status = :status " +
            "ORDER BY d.assignedAt DESC")
    List<Delivery> findByDriverIdAndStatus(@Param("driverId") Long driverId,
                                           @Param("status") ShipmentStatus status);


    @Query("SELECT d FROM Delivery d " +
            "JOIN FETCH d.shipmentEntity s " +
            "WHERE d.driver.id = :driverId " +
            "AND s.status NOT IN :excludedStatuses " +
            "ORDER BY d.assignedAt DESC")
    List<Delivery> findActiveDeliveriesByDriverId(@Param("driverId") Long driverId,
                                                  @Param("excludedStatuses") List<ShipmentStatus> excludedStatuses);


    @Query("SELECT d FROM Delivery d " +
            "JOIN FETCH d.shipmentEntity s " +
            "WHERE d.driver. id = :driverId " +
            "AND s.status = 'DELIVERED' " +
            "ORDER BY d.deliveredAt DESC")
    List<Delivery> findCompletedDeliveriesByDriverId(@Param("driverId") Long driverId);

    @Query("SELECT COUNT(d) FROM Delivery d " +
            "JOIN d.shipmentEntity s " +
            "WHERE d.driver.id = :driverId " +
            "AND s.status = 'DELIVERED'")
    Long countCompletedDeliveriesByDriverId(@Param("driverId") Long driverId);


    @Query("SELECT COUNT(d) FROM Delivery d " +
            "JOIN d.shipmentEntity s " +
            "WHERE d.driver.id = :driverId " +
            "AND s.status NOT IN :excludedStatuses ")
    Long countActiveDeliveriesByDriverId(@Param("driverId") Long driverId ,
                                         @Param("excludedStatuses") List<ShipmentStatus> excludedStatuses);



}

