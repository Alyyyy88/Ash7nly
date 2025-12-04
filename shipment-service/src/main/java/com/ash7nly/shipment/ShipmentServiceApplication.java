package com.ash7nly.shipment;

import com.ash7nly.shipment.Entity.ShipmentEntity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {
        "com.ash7nly.shipment",
        "com.ash7nly.common"
})
@EnableFeignClients
@SpringBootApplication
public class ShipmentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShipmentServiceApplication.class, args);
    }

}

