package com.ash7nly.apigateway.config;

import com.ash7nly.apigateway.filter.JwtGatewayFilterFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;

@Configuration
public class GatewayConfig {

    @Autowired
    private JwtGatewayFilterFactory jwtGatewayFilterFactory;

    @Bean
    public RouterFunction<ServerResponse> gatewayRoutes() {
        return GatewayRouterFunctions.route("user-service")
                .route(RequestPredicates.path("/api/users/**"), http("lb://USER-SERVICE"))
                .filter(jwtGatewayFilterFactory.apply())
                .build()
                .and(GatewayRouterFunctions.route("shipment-service")
                        .route(RequestPredicates.path("/api/shipments/**"), http("lb://SHIPMENT-SERVICE"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())
                .and(GatewayRouterFunctions.route("payment-service")
                        .route(RequestPredicates.path("/api/payments/**"), http("lb://PAYMENT-SERVICE"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())
                .and(GatewayRouterFunctions.route("delivery-service")
                        .route(RequestPredicates.path("/api/deliveries/**"), http("lb://DELIVERY-SERVICE"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())
                .and(GatewayRouterFunctions.route("notification-service")
                        .route(RequestPredicates.path("/api/notifications/**"), http("lb://NOTIFICATION-SERVICE"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build())
                .and(GatewayRouterFunctions.route("analytics-service")
                        .route(RequestPredicates.path("/api/analytics/**"), http("lb://ANALYTICS-SERVICE"))
                        .filter(jwtGatewayFilterFactory.apply())
                        .build());
    }
}

