package com.ash7nly.delivery.repository;

import com.ash7nly.delivery.Entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery,Long> {
    List<Delivery> findByDriverId(Long driverId);
}

