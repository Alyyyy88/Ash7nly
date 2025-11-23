# Microservices Architecture

This project contains a complete microservices architecture with the following services:

## Services Overview

### Infrastructure Services

1. **Service Registry** (Port 8761)
   - Eureka Server for service discovery
   - All microservices register here

2. **API Gateway** (Port 8080)
   - Entry point for all client requests
   - Routes requests to appropriate microservices
   - Handles JWT authentication and authorization

### Business Services

3. **User Service** (Port 8081)
   - User Management Service
   - Handles user registration, authentication, and profile management
   - Endpoint: `/api/users/**`

4. **Shipment Service** (Port 8082)
   - Shipment Management Service
   - Manages shipment tracking and logistics
   - Endpoint: `/api/shipments/**`

5. **Payment Service** (Port 8083)
   - Payment & Billing Service
   - Handles payment processing and billing
   - Endpoint: `/api/payments/**`

6. **Delivery Service** (Port 8084)
   - Delivery Management Service
   - Manages delivery scheduling and tracking
   - Endpoint: `/api/deliveries/**`

7. **Notification Service** (Port 8085)
   - Notification Service
   - Sends notifications (email, SMS, push notifications)
   - Endpoint: `/api/notifications/**`

8. **Analytics Service** (Port 8086)
   - Analytics & Reporting Service
   - Generates reports and analytics
   - Endpoint: `/api/analytics/**`

## Technology Stack

- **Java**: 21
- **Spring Boot**: 3.5.7
- **Spring Cloud**: 2025.0.0
- **Database**: H2 (development), PostgreSQL (production)
- **Service Discovery**: Netflix Eureka
- **API Gateway**: Spring Cloud Gateway MVC
- **Build Tool**: Maven

## Running the Services

### Start Service Registry First
```bash
cd service-registry
mvnw spring-boot:run
```

### Start API Gateway
```bash
cd api-gateway
mvnw spring-boot:run
```

### Start Business Services
```bash
# User Service
cd user-service
mvnw spring-boot:run

# Shipment Service
cd shipment-service
mvnw spring-boot:run

# Payment Service
cd payment-service
mvnw spring-boot:run

# Delivery Service
cd delivery-service
mvnw spring-boot:run

# Notification Service
cd notification-service
mvnw spring-boot:run

# Analytics Service
cd analytics-service
mvnw spring-boot:run
```

## Service Endpoints

All requests should go through the API Gateway at `http://localhost:8080`:

- User Management: `http://localhost:8080/api/users/**`
- Shipment Management: `http://localhost:8080/api/shipments/**`
- Payment & Billing: `http://localhost:8080/api/payments/**`
- Delivery Management: `http://localhost:8080/api/deliveries/**`
- Notifications: `http://localhost:8080/api/notifications/**`
- Analytics & Reporting: `http://localhost:8080/api/analytics/**`

## Health Checks

Each service has a health endpoint:

- Service Registry: `http://localhost:8761`
- API Gateway: `http://localhost:8080/actuator/health`
- User Service: `http://localhost:8081/actuator/health`
- Shipment Service: `http://localhost:8082/actuator/health`
- Payment Service: `http://localhost:8083/actuator/health`
- Delivery Service: `http://localhost:8084/actuator/health`
- Notification Service: `http://localhost:8085/actuator/health`
- Analytics Service: `http://localhost:8086/actuator/health`

## H2 Database Console

Each service has its own H2 console for development:

- User Service: `http://localhost:8081/h2-console`
- Shipment Service: `http://localhost:8082/h2-console`
- Payment Service: `http://localhost:8083/h2-console`
- Delivery Service: `http://localhost:8084/h2-console`
- Notification Service: `http://localhost:8085/h2-console`
- Analytics Service: `http://localhost:8086/h2-console`

## Building All Services

From the root directory:
```bash
mvn clean install
```

## Docker Compose

Infrastructure services can be started using Docker Compose:
```bash
cd infra
docker-compose up -d
```

