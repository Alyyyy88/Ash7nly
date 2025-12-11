package com.ash7nly.monolith.entity;
import com.ash7nly.monolith.enums.ShipmentStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="tracking_history")
public class TrackingHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "shipment_id" , nullable = false)
    private ShipmentEntity shipmentEntity;

    @Enumerated(EnumType.STRING)
    ShipmentStatus shipmentStatus;

    private LocalDateTime timestamp = LocalDateTime.now();

    public TrackingHistoryEntity() {
    }

    public TrackingHistoryEntity(long id, LocalDateTime timestamp, ShipmentStatus shipmentStatus, ShipmentEntity shipmentEntity) {
        this.id = id;
        this.timestamp = timestamp;
        this.shipmentStatus = shipmentStatus;
        this.shipmentEntity = shipmentEntity;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public ShipmentStatus getShipmentStatus() {
        return shipmentStatus;
    }

    public void setShipmentStatus(ShipmentStatus shipmentStatus) {
        this.shipmentStatus = shipmentStatus;
    }

    public ShipmentEntity getShipmentEntity() {
        return shipmentEntity;
    }

    public void setShipmentEntity(ShipmentEntity shipmentEntity) {
        this.shipmentEntity = shipmentEntity;
    }
}