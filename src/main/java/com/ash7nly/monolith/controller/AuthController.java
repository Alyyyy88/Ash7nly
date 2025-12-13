package com.ash7nly.monolith.controller;

import com.ash7nly.monolith.aspect.RateLimit;
import com.ash7nly.monolith.dto.request.LoginRequest;
import com.ash7nly.monolith.dto.request.RegisterRequest;
import com.ash7nly.monolith.dto.response.ApiResponse;
import com.ash7nly.monolith.dto.response.AuthResponse;
import com.ash7nly.monolith.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @RateLimit(requests = 5, seconds = 60)
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.success(authService.register(request));
    }

    @PostMapping("/login")
    @RateLimit(requests = 10, seconds = 60)
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success(authService.login(request));
    }
}

