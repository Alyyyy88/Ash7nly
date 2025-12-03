package com.ash7nly.user.service;

import com.ash7nly.common.enums.UserRole;
import com.ash7nly.common.exception.BadRequestException;
import com.ash7nly.common.exception.UnauthorizedException;
import com.ash7nly.user.dto.req.LoginRequest;
import com.ash7nly.user.dto.req.RegisterRequest;
import com.ash7nly.user.dto.res.AuthResponse;
import com.ash7nly.user.entity.UserEntity;
import com.ash7nly.user.mapper.UserMapper;
import com.ash7nly.user.repository.UserRepository;
import com.ash7nly.user.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already in use");
        }

        if(request.getRole().equals(UserRole.ADMIN)) {
            throw new BadRequestException("Cannot register as ADMIN");
        }

        if(request.getRole().equals(UserRole.DRIVER)){
            throw new BadRequestException("Cannot register as DRIVER");
        }

        UserEntity user = UserEntity.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(request.getRole() != null ? request.getRole() : UserRole.CUSTOMER) // Default to Customer
                .isActive(true)
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user, user.getId(), user.getRole());

        return new AuthResponse(token, UserMapper.toDto(user));
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid email or password");
        }

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        String token = jwtService.generateToken(user, user.getId(), user.getRole());
        return new AuthResponse(token, UserMapper.toDto(user));
    }
}