package com.ash7nly.delivery.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "drivers")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id ;
    //fk
    private Long userId ;
    private String vehicleType;
    private String vehicleNumber;
    private String licenseNumber;
    private String serviceArea;
    private boolean is_available;
    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)

    private List<Delivery> Deliveries;
}
