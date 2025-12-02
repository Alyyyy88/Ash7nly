package com.ash7nly.delivery.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Long shipmentId;
    // private Long driverId;
    private LocalDateTime assignedAt;
    private LocalDateTime acceptedAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime  pickedUpAt;
    private String recipientName;
    private String deliveryNotes;
}

