package com.ash7nly.monolith.dto.request;

import com.ash7nly.monolith.controller.ShipmentController;

import java.util.List;

public class MerchantShipmentsDTO {

    private List<ShipmentListDTO> shipmentListDTO;
    private long count;

    public MerchantShipmentsDTO(List<ShipmentListDTO> shipmentListDTO, long count) {
        this.shipmentListDTO = shipmentListDTO;
        this.count = count;
    }

    public MerchantShipmentsDTO() {
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public List<ShipmentListDTO> getShipmentListDTO() {
        return shipmentListDTO;
    }

    public void setShipmentListDTO(List<ShipmentListDTO> shipmentListDTO) {
        this.shipmentListDTO = shipmentListDTO;
    }
}
