package com.ash7nly.apigateway.filter;

import com.ash7nly.apigateway.config.SecurityConfig;
import com.ash7nly.apigateway.service.JwtService;
import com.ash7nly.common.constant.Headers;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtGatewayFilterFactory {

    private static final Logger log = LoggerFactory.getLogger(JwtGatewayFilterFactory.class);

    private final JwtService jwtService;
    private final SecurityConfig securityConfig;
    private final ObjectMapper objectMapper;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    public JwtGatewayFilterFactory(JwtService jwtService, SecurityConfig securityConfig, ObjectMapper objectMapper) {
        this.jwtService = jwtService;
        this.securityConfig = securityConfig;
        this.objectMapper = objectMapper;
    }

    public HandlerFilterFunction<ServerResponse, ServerResponse> apply() {
        return (request, next) -> {
            String requestPath = request.path();

            if (isPublicRoute(requestPath)) {
                return next.handle(request);
            }

            String authHeader = request.headers().firstHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                log.warn("Missing Authorization header: {}", requestPath);
                return onError(HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
            }

            String token = authHeader.substring(7);

            try {
                if (!jwtService.isTokenValid(token)) {
                    log.warn("Invalid token for path: {}", requestPath);
                    return onError(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
                }

                String userId = jwtService.extractUserId(token);
                String role = jwtService.extractRole(token);

                ServerRequest modifiedRequest = ServerRequest.from(request)
                        .header(Headers.USER_ID, userId)
                        .header(Headers.USER_ROLE, role)
                        .build();

                return next.handle(modifiedRequest);

            } catch (Exception e) {
                log.error("Token error: {}", e.getMessage());
                return onError(HttpStatus.UNAUTHORIZED, "Token validation failed");
            }
        };
    }

    private boolean isPublicRoute(String requestPath) {
        if (securityConfig.getPublicRoutes() == null) return false;
        return securityConfig.getPublicRoutes().stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, requestPath));
    }

    private ServerResponse onError(HttpStatus status, String message) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("success", false);
        errorBody.put("message", message);
        errorBody.put("status", status.value());
        errorBody.put("timestamp", System.currentTimeMillis());

        try {
            String json = objectMapper.writeValueAsString(errorBody);
            return ServerResponse.status(status)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(json);
        } catch (JsonProcessingException e) {
            return ServerResponse.status(status).build();
        }
    }
}

