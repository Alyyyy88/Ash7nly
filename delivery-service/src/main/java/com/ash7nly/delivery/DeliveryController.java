package com.ash7nly.delivery;

import com.ash7nly.delivery.Entity.Delivery;
import com.ash7nly.delivery.Entity.Driver;
import com.ash7nly.delivery.repository.DeliveryRepository;
import com.ash7nly.delivery.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {
    @Autowired
     private DeliveryRepository _deliveryRepository;
    @Autowired
    private DriverRepository _driverRepository;
     @GetMapping("/def")
     public List<Delivery> getDeliveries(){
         return _deliveryRepository.findAll();
     }
    @GetMapping("/deff")
    public List<Driver> getDrivers(){
        return _driverRepository.findAll();
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "service", "delivery-service",
                "status", "UP"
        );
    }
}

