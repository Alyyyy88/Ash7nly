package com.ash7nly.monolith.dto.request;

import java.util.List;

public class ShipmentTrackingDTO {
    private List<TrackingHistoryDTO> trackingHistoryDTOlist;
    private String driverName;
    private String Email;
    private String phoneNumber;

    public ShipmentTrackingDTO() {
    }


    public ShipmentTrackingDTO(List<TrackingHistoryDTO> trackingHistoryDTOlist, String phoneNumber, String driverName, String email) {
        this.trackingHistoryDTOlist = trackingHistoryDTOlist;
        this.phoneNumber = phoneNumber;
        this.driverName = driverName;
        Email = email;
    }

    public List<TrackingHistoryDTO> getTrackingHistoryDTOlist() {
        return trackingHistoryDTOlist;
    }

    public void setTrackingHistoryDTOlist(List<TrackingHistoryDTO> trackingHistoryDTOlist) {
        this.trackingHistoryDTOlist = trackingHistoryDTOlist;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }
}

