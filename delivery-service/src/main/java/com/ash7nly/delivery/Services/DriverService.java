package com.ash7nly.delivery.Services;

import com.ash7nly.delivery.Entity.Driver;
import com.ash7nly.delivery.dto.UpdateDriverRequest;
import com.ash7nly.delivery.mapper.DriverMapper;
import com.ash7nly.delivery.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private final DriverRepository _driverRepository;

    public DriverService(DriverRepository _driverRepository) {
        this._driverRepository = _driverRepository;
    }

    public List<Driver> getAllDrivers() {
        return _driverRepository.findAll();
    }

    public Driver getDriver(Long id) {
        return _driverRepository.findById(id)
                . orElseThrow(() -> new IllegalArgumentException("Driver not found: " + id));
    }

    public Driver createDriver(Driver driver) {
        driver.setAvailable(true);
        return _driverRepository.save(driver);
    }

    public Driver updateDriver(Long id, UpdateDriverRequest request) {
        Driver existingDriver = getDriver(id);

        DriverMapper.updateEntityFromDTO(existingDriver, request);

        return _driverRepository.save(existingDriver);
    }

    public Driver updateAvailability(Long id, boolean available) {
        Driver d = getDriver(id);
        d.setAvailable(available);
        return _driverRepository.save(d);
    }
}