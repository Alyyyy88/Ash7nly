package com.ash7nly.monolith.dto.request;

import com.ash7nly.monolith.enums.VehicleType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDriverRequest {

    private VehicleType vehicleType;

    @Size(min = 1, max = 20, message = "Vehicle number must be between 1 and 20 characters")
    private String vehicleNumber;

    @Size(min = 1, max = 50, message = "License number must be between 1 and 50 characters")
    private String licenseNumber;

    private String serviceArea;

    private Boolean isAvailable;

    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    private String fullName;

    @Email(message = "Invalid email format")
    private String email;

    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 characters")
    private String phoneNumber;
}
