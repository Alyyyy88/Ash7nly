# Ash7nly - Delivery Management Application

A monolithic Spring Boot application for delivery management with JWT authentication and role-based access control.

## Features

- **User Management**: Registration, login, profile management
- **Shipment Management**: Create, track, and cancel shipments
- **Driver Management**: Driver profiles and availability
- **Delivery Management**: Assign and track deliveries
- **JWT Authentication**: Secure API endpoints with JWT tokens
- **Role-Based Access Control**: ADMIN, MERCHANT, DRIVER, CUSTOMER roles

## Project Structure

```
ash7nly/
├── pom.xml
├── mvnw, mvnw.cmd
├── src/main/java/com/ash7nly/monolith/
│   ├── MonolithApplication.java      # Main entry point
│   ├── config/                       # Security & App configuration
│   ├── controller/                   # REST API controllers
│   ├── dto/                          # Data Transfer Objects
│   ├── entity/                       # JPA entities
│   ├── enums/                        # Enumerations
│   ├── exception/                    # Exception handling
│   ├── mapper/                       # Entity-DTO mappers
│   ├── repository/                   # JPA repositories
│   ├── security/                     # JWT & auth services
│   └── service/                      # Business logic
└── src/main/resources/
    └── application.yml               # Configuration
```

## Running the Application

### Prerequisites
- Java 21
- PostgreSQL (or use H2 for development)
- Maven (or use included wrapper)

### Development Mode (H2 Database)
```bash
# Windows - Set profile then run
$env:SPRING_PROFILES_ACTIVE="dev"
.\mvnw.cmd spring-boot:run

# Or use IntelliJ Run Configuration: "Ash7nly Application"
```

#### Accessing H2 Database

**Option 1: H2 Web Console**
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:ash7nly_db`
- Username: `sa`
- Password: `password`

**Option 2: DBeaver / External Tools (TCP Server)**
- Driver: H2 Server
- Host: `localhost`
- Port: `9092`
- Database: `mem:ash7nly_db`
- URL: `jdbc:h2:tcp://localhost:9092/mem:ash7nly_db`
- Username: `sa`
- Password: `password`

### Production Mode (PostgreSQL)
1. Configure PostgreSQL connection in `application.yml`
2. Run:
```bash
.\mvnw.cmd spring-boot:run
```

### Building
```bash
.\mvnw.cmd clean package
java -jar target/ash7nly-1.0-SNAPSHOT.jar
```

## API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users (Authenticated)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users/{id}` - Get user by ID (Admin only)

### Shipments
- `POST /api/shipments` - Create shipmentEntity (Merchant only)
- `GET /api/shipments/tracking/{trackingNumber}` - Track shipmentEntity (Public)
- `POST /api/shipments/cancel` - Cancel shipmentEntity
- `GET /api/shipments/my-shipments` - Get merchant's shipments

### Drivers
- `GET /api/drivers` - Get all drivers (Admin only)
- `GET /api/drivers/{id}` - Get driver by ID
- `POST /api/drivers/users/{userId}` - Create driver for user (Admin only)
- `PUT /api/drivers/{id}` - Update driver

### Deliveries
- `GET /api/deliveries/assigned?driverId={id}` - Get assigned deliveries
- `POST /api/deliveries/{id}/accept` - Accept delivery
- `PUT /api/deliveries/{id}/status?status={status}` - Update delivery status
- `POST /api/deliveries/assign?shipmentId={id}&driverId={id}` - Assign delivery (Admin only)

### Health Check
- `GET /api/health` - Application health status

## User Roles

| Role | Description |
|------|-------------|
| ADMIN | Full system access |
| MERCHANT | Can create and manage shipments |
| DRIVER | Can view and update assigned deliveries |
| CUSTOMER | Can track shipments |

## Authentication

All protected endpoints require a JWT token:
```
Authorization: Bearer <your-jwt-token>
```

## Example Requests

### Register
```json
POST /api/auth/register
{
    "email": "merchant@example.com",
    "password": "password123",
    "fullName": "Test Merchant",
    "role": "MERCHANT"
}
```

### Create Shipment
```json
POST /api/shipments
Authorization: Bearer <token>
{
    "pickupAddress": "123 Main St",
    "deliveryAddress": "456 Oak Ave",
    "customerName": "John Doe",
    "customerPhone": "+1234567890",
    "packageWeight": "2kg",
    "cost": 25.00
}
```

## Configuration

Key settings in `application.yml`:

```yaml
# Server
server.port: 8080

# Database (PostgreSQL)
spring.datasource.url: jdbc:postgresql://localhost:5432/ash7nly_db
spring.datasource.username: admin
spring.datasource.password: password

# JWT
application.security.jwt.secret-key: <your-secret-key>
application.security.jwt.expiration: 86400000  # 1 day
```
