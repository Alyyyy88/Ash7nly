package com.ash7nly.apigateway.config;

import com.ash7nly.apigateway.filter.JwtGatewayFilterFactory;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.web.servlet.function.RequestPredicates.path;

@Configuration
public class GatewayConfig {

    private final JwtGatewayFilterFactory jwtGatewayFilterFactory;

    public GatewayConfig(JwtGatewayFilterFactory jwtGatewayFilterFactory) {
        this.jwtGatewayFilterFactory = jwtGatewayFilterFactory;
    }

    @Bean
    public RouterFunction<ServerResponse> gatewayRoutes() {
        return GatewayRouterFunctions.route("user-service")
                .route(path("/api/auth/**").or(path("/api/users/**")), http("http://localhost:8081"))
                .filter(jwtGatewayFilterFactory.apply())
                .build()

                .and(GatewayRouterFunctions.route("delivery-service")
                        .route(path("/api/deliveries/**").or(path("/api/drivers/**")), http("http://localhost:8084"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())

                .and(GatewayRouterFunctions.route("shipment-service")
                        .route(path("/api/shipments/**"), http("http://localhost:8082"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())

                .and(GatewayRouterFunctions.route("payment-service")
                        .route(path("/api/payments/**"), http("http://localhost:8083"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())

                .and(GatewayRouterFunctions.route("notification-service")
                        .route(path("/api/notifications/**"), http("http://localhost:8085"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())

                .and(GatewayRouterFunctions.route("analytics-service")
                        .route(path("/api/analytics/**"), http("http://localhost:8086"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build());
    }
}

