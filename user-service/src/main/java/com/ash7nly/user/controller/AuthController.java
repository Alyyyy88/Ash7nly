package com.ash7nly.user.controller;

import com.ash7nly.common.response.ApiResponse;
import com.ash7nly.user.dto.req.LoginRequest;
import com.ash7nly.user.dto.req.RegisterRequest;
import com.ash7nly.user.dto.res.AuthResponse;
import com.ash7nly.user.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ApiResponse.success(authService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@RequestBody LoginRequest request) {
        return ApiResponse.success(authService.login(request));
    }
}
