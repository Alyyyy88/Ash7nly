package com.ash7nly.delivery.Entity;

import com.fasterxml. jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "deliveries")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType. IDENTITY)
    private Long id;

    private LocalDateTime assignedAt;
    private LocalDateTime acceptedAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime pickedUpAt;
    private String recipientName;
    private String deliveryNotes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driverId")
    @JsonIgnore
    private Driver driver;

    private Long shipmentId;

    public Delivery() {
    }

    public Delivery(Long id, LocalDateTime assignedAt, LocalDateTime acceptedAt,
                    LocalDateTime deliveredAt, LocalDateTime pickedUpAt, String recipientName,
                    String deliveryNotes, Driver driver, Long shipmentId) {
        this.id = id;
        this.assignedAt = assignedAt;
        this. acceptedAt = acceptedAt;
        this.deliveredAt = deliveredAt;
        this. pickedUpAt = pickedUpAt;
        this.recipientName = recipientName;
        this.deliveryNotes = deliveryNotes;
        this. driver = driver;
        this. shipmentId = shipmentId;
    }

    public Delivery(LocalDateTime assignedAt, LocalDateTime acceptedAt, LocalDateTime deliveredAt,
                    LocalDateTime pickedUpAt, String recipientName, String deliveryNotes,
                    Driver driver, Long shipmentId) {
        this.assignedAt = assignedAt;
        this. acceptedAt = acceptedAt;
        this.deliveredAt = deliveredAt;
        this. pickedUpAt = pickedUpAt;
        this.recipientName = recipientName;
        this.deliveryNotes = deliveryNotes;
        this. driver = driver;
        this. shipmentId = shipmentId;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public LocalDateTime getAcceptedAt() {
        return acceptedAt;
    }

    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }

    public LocalDateTime getPickedUpAt() {
        return pickedUpAt;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public String getDeliveryNotes() {
        return deliveryNotes;
    }

    public Driver getDriver() {
        return driver;
    }

    public Long getShipmentId() {
        return shipmentId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public void setAcceptedAt(LocalDateTime acceptedAt) {
        this.acceptedAt = acceptedAt;
    }

    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public void setPickedUpAt(LocalDateTime pickedUpAt) {
        this.pickedUpAt = pickedUpAt;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public void setDeliveryNotes(String deliveryNotes) {
        this.deliveryNotes = deliveryNotes;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public void setShipmentId(Long shipmentId) {
        this.shipmentId = shipmentId;
    }

    public static class Builder {
        private Long id;
        private LocalDateTime assignedAt;
        private LocalDateTime acceptedAt;
        private LocalDateTime deliveredAt;
        private LocalDateTime pickedUpAt;
        private String recipientName;
        private String deliveryNotes;
        private Driver driver;
        private Long shipmentId;

        public Builder id(Long id) {
            this. id = id;
            return this;
        }

        public Builder assignedAt(LocalDateTime assignedAt) {
            this.assignedAt = assignedAt;
            return this;
        }

        public Builder acceptedAt(LocalDateTime acceptedAt) {
            this.acceptedAt = acceptedAt;
            return this;
        }

        public Builder deliveredAt(LocalDateTime deliveredAt) {
            this.deliveredAt = deliveredAt;
            return this;
        }

        public Builder pickedUpAt(LocalDateTime pickedUpAt) {
            this.pickedUpAt = pickedUpAt;
            return this;
        }

        public Builder recipientName(String recipientName) {
            this. recipientName = recipientName;
            return this;
        }

        public Builder deliveryNotes(String deliveryNotes) {
            this.deliveryNotes = deliveryNotes;
            return this;
        }

        public Builder driver(Driver driver) {
            this. driver = driver;
            return this;
        }

        public Builder shipmentId(Long shipmentId) {
            this. shipmentId = shipmentId;
            return this;
        }

        public Delivery build() {
            return new Delivery(id, assignedAt, acceptedAt, deliveredAt, pickedUpAt,
                    recipientName, deliveryNotes, driver, shipmentId);
        }
    }

    public static Builder builder() {
        return new Builder();
    }




}