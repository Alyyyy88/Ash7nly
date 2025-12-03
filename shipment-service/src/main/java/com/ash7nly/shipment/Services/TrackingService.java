package com.ash7nly.shipment.Services;

import com.ash7nly.common.exception.BadRequestException;
import com.ash7nly.common.exception.NotFoundException;
import com.ash7nly.shipment.DTOs.TrackShipmentDTO;
import com.ash7nly.shipment.Entity.ShipmentEntity;
import com.ash7nly.shipment.Mapper.ShipmentMapper;
import com.ash7nly.shipment.Mapper.TrackingMapper;
import com.ash7nly.shipment.Repository.ShipmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TrackingService {

    private final ShipmentRepository shipmentRepository;
    private final TrackingMapper trackingMapper;
    public TrackingService(ShipmentRepository shipmentRepository, TrackingMapper trackingMapper){
        this.shipmentRepository =shipmentRepository;
        this.trackingMapper = trackingMapper;
    }
    public TrackShipmentDTO TrackingInfo(String trackingNumber){
        ShipmentEntity shipment = shipmentRepository.findBytrackingNumber(trackingNumber)
                .orElseThrow(()->new NotFoundException(
                        "Tracking Code not found"));
            return trackingMapper.toDTO(shipment);
    }
}
