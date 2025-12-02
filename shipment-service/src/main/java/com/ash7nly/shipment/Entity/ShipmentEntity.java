package com.ash7nly.shipment.Entity;

import com.ash7nly.common.enums.ShipmentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name ="Shipment")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Shipment_id;

    @Column(unique = true,nullable = false)
    private long TrackingNumber;

    @Column(nullable = false)
    private String PickupAdress;
    private String DeliveryAdress;
    private String CustomerName;
    private String Customerphone;
    private String PackageWeight;
    private String PackageDimension;

    @Column(nullable = false)
    private Long merchantId;

    @Lob
    private String PackageDescription;

    @Enumerated(EnumType.STRING)
    private ShipmentStatus Status;

    @Column(nullable = false)
    private double cost;

    @Builder.Default
    private boolean isActive = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
