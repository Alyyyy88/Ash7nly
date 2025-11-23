package com.ash7nly.apigateway.filter;

import com.ash7nly.apigateway.config.SecurityConfig;
import com.ash7nly.apigateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.util.List;

@Component
public class JwtGatewayFilterFactory {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private SecurityConfig securityConfig;

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    public HandlerFilterFunction<ServerResponse, ServerResponse> apply() {
        return (request, next) -> {
            String requestPath = request.path();

            System.out.println("JwtGatewayFilter - Processing request: " + requestPath);

            // Check if the route is public
            if (isPublicRoute(requestPath)) {
                System.out.println("JwtGatewayFilter - Public route detected, allowing request");
                return next.handle(request);
            }

            // Extract JWT token from Authorization header
            String authHeader = request.headers().firstHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                System.out.println("JwtGatewayFilter - Missing or invalid Authorization header");
                return ServerResponse.status(HttpStatus.UNAUTHORIZED)
                        .header("Content-Type", "application/json")
                        .body("{\"error\": \"Missing or invalid Authorization header\"}");
            }

            String token = authHeader.substring(7);

            try {
                // Validate token
                if (!jwtUtil.isTokenValid(token)) {
                    System.out.println("JwtGatewayFilter - Invalid or expired token");
                    return ServerResponse.status(HttpStatus.UNAUTHORIZED)
                            .header("Content-Type", "application/json")
                            .body("{\"error\": \"Invalid or expired token\"}");
                }

                // Extract user information from token
                String userId = jwtUtil.extractUserId(token);
                String role = jwtUtil.extractRole(token);

                System.out.println("JwtGatewayFilter - Token valid for user: " + userId + ", role: " + role);

                // Add user information to headers for downstream services
                ServerRequest modifiedRequest = ServerRequest.from(request)
                        .header("X-User-Id", userId)
                        .header("X-User-Role", role)
                        .build();

                return next.handle(modifiedRequest);

            } catch (Exception e) {
                System.out.println("JwtGatewayFilter - Token validation failed: " + e.getMessage());
                return ServerResponse.status(HttpStatus.UNAUTHORIZED)
                        .header("Content-Type", "application/json")
                        .body("{\"error\": \"Token validation failed: " + e.getMessage() + "\"}");
            }
        };
    }

    private boolean isPublicRoute(String requestPath) {
        List<String> publicRoutes = securityConfig.getPublicRoutes();

        if (publicRoutes == null || publicRoutes.isEmpty()) {
            return false;
        }

        for (String pattern : publicRoutes) {
            if (pathMatcher.match(pattern, requestPath)) {
                System.out.println("JwtGatewayFilter - Matched public pattern: " + pattern);
                return true;
            }
        }

        return false;
    }
}

