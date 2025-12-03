# Ash7nly - Microservices Architecture

This project is a microservices-based application built with Spring Boot and Spring Cloud, implementing a modern distributed system architecture.

## 📋 Project Status

### ✅ Production-Ready Services (PostgreSQL)
- **User Service** - Migrated to PostgreSQL with dedicated schema

### 🚧 Services In Development (H2 Database)
The following services are still using H2 in-memory database and require migration to PostgreSQL:
- **Shipment Service**
- **Payment Service**
- **Delivery Service**
- **Notification Service**
- **Analytics Service**

## 🏗️ Architecture Overview

### Infrastructure Services

1. **API Gateway** (Port 8080)
   - Entry point for all client requests
   - Routes requests to appropriate microservices
   - Handles JWT authentication and authorization
   - Built with Spring Cloud Gateway MVC

### Business Services

2. **User Service** (Port 8081) ✅
   - User Management & Authentication
   - Handles user registration, login, and profile management
   - **Database**: PostgreSQL (schema: `user_service`)
   - Endpoint: `/api/users/**`

3. **Shipment Service** (Port 8082) 🚧
   - Shipment tracking and logistics management
   - **Database**: H2 in-memory
   - Endpoint: `/api/shipments/**`

4. **Payment Service** (Port 8083) 🚧
   - Payment processing and billing
   - **Database**: H2 in-memory
   - Endpoint: `/api/payments/**`

5. **Delivery Service** (Port 8084) 🚧
   - Delivery scheduling and tracking
   - **Database**: H2 in-memory
   - Endpoint: `/api/deliveries/**`

6. **Notification Service** (Port 8085) 🚧
   - Sends notifications (email, SMS, push notifications)
   - **Database**: H2 in-memory
   - Endpoint: `/api/notifications/**`

7. **Analytics Service** (Port 8086) 🚧
   - Analytics and reporting
   - **Database**: H2 in-memory
   - Endpoint: `/api/analytics/**`

## 🛠️ Technology Stack

- **Java**: 21
- **Spring Boot**: 3.5.7
- **Spring Cloud**: 2025.0.0
- **Databases**: 
  - PostgreSQL 15 (Production)
  - H2 (Development/In-Progress Services)
- **API Gateway**: Spring Cloud Gateway MVC
- **Build Tool**: Maven
- **Container Platform**: Docker

## 🚀 Getting Started

### Prerequisites

- Java 21 or higher
- Maven 3.6 or higher
- Docker and Docker Compose (for PostgreSQL)

### 1. Start PostgreSQL Database

Start the PostgreSQL database using Docker Compose:

```bash
cd infra-swe
docker-compose up -d
```

This will:
- Start PostgreSQL 15 on port `5432`
- Create database: `ash7nly_db`
- Initialize schemas for all services (user_service, shipment_service, payment_service, etc.)

**PostgreSQL Connection Details:**
```
Host: localhost
Port: 5432
Database: ash7nly_db
Username: admin
Password: password
```

**Connecting to PostgreSQL:**

Using psql:
```bash
docker exec -it ash7nly-db psql -U admin -d ash7nly_db
```

Using pgAdmin or DBeaver:
- Create a new connection with the credentials above
- Each service has its own schema (e.g., `user_service`, `shipment_service`)

### 2. Build All Services

From the root directory:

```bash
mvn clean install
```

### 3. Running the Services

**Option A: Run Individual Services**

Start each service in a separate terminal:

```bash
# API Gateway (start this first)
cd api-gateway
mvnw spring-boot:run

# User Service (PostgreSQL)
cd user-service
mvnw spring-boot:run

# Other Services (H2 - as needed)
cd shipment-service
mvnw spring-boot:run

cd payment-service
mvnw spring-boot:run

cd delivery-service
mvnw spring-boot:run

cd notification-service
mvnw spring-boot:run

cd analytics-service
mvnw spring-boot:run
```

**Option B: Run from Root Using Maven**

```bash
# Run a specific module
mvn spring-boot:run -pl user-service
mvn spring-boot:run -pl api-gateway
```

## 🔌 Database Connections

### PostgreSQL (Production Services)

**User Service:**
```yaml
URL: jdbc:postgresql://localhost:5432/ash7nly_db?currentSchema=user_service
Schema: user_service
Username: admin
Password: password
```

**Accessing via Docker:**
```bash
# Connect to PostgreSQL container
docker exec -it ash7nly-db psql -U admin -d ash7nly_db

# List all schemas
\dn

# Connect to user_service schema
SET search_path TO user_service;

# List tables in schema
\dt
```

**Connecting via GUI Tools (pgAdmin, DBeaver, etc.):**
```
Host: localhost
Port: 5432
Database: ash7nly_db
Username: admin
Password: password
Schema: user_service (or other service schemas)
```

### H2 Database (Development Services)

Services still using H2 have web-based consoles available:

**Shipment Service:**
- Console URL: `http://localhost:8082/h2-console`
- JDBC URL: `jdbc:h2:mem:shipmentdb`
- Username: `sa`
- Password: _(empty)_

**Payment Service:**
- Console URL: `http://localhost:8083/h2-console`
- JDBC URL: `jdbc:h2:mem:paymentdb`
- Username: `sa`
- Password: _(empty)_

**Delivery Service:**
- Console URL: `http://localhost:8084/h2-console`
- JDBC URL: `jdbc:h2:mem:deliverydb`
- Username: `sa`
- Password: _(empty)_

**Notification Service:**
- Console URL: `http://localhost:8085/h2-console`
- JDBC URL: `jdbc:h2:mem:notificationdb`
- Username: `sa`
- Password: _(empty)_

**Analytics Service:**
- Console URL: `http://localhost:8086/h2-console`
- JDBC URL: `jdbc:h2:mem:analyticsdb`
- Username: `sa`
- Password: _(empty)_

> **Note:** H2 is an in-memory database. Data will be lost when the service stops.

## 📡 API Endpoints

All requests should go through the API Gateway at `http://localhost:8080`:

| Service | Endpoint | Status | Database |
|---------|----------|--------|----------|
| User Management | `http://localhost:8080/api/users/**` | ✅ Production | PostgreSQL |
| Shipment Management | `http://localhost:8080/api/shipments/**` | 🚧 Development | H2 |
| Payment & Billing | `http://localhost:8080/api/payments/**` | 🚧 Development | H2 |
| Delivery Management | `http://localhost:8080/api/deliveries/**` | 🚧 Development | H2 |
| Notifications | `http://localhost:8080/api/notifications/**` | 🚧 Development | H2 |
| Analytics & Reporting | `http://localhost:8080/api/analytics/**` | 🚧 Development | H2 |

### Direct Service Access (Development Only)

While the API Gateway is the recommended entry point, you can access services directly:

- User Service: `http://localhost:8081/api/users/**`
- Shipment Service: `http://localhost:8082/api/shipments/**`
- Payment Service: `http://localhost:8083/api/payments/**`
- Delivery Service: `http://localhost:8084/api/deliveries/**`
- Notification Service: `http://localhost:8085/api/notifications/**`
- Analytics Service: `http://localhost:8086/api/analytics/**`

## ❤️ Health Checks & Monitoring

Each service exposes health and monitoring endpoints via Spring Boot Actuator:

| Service | Health Check | Port |
|---------|-------------|------|
| API Gateway | `http://localhost:8080/actuator/health` | 8080 |
| User Service | `http://localhost:8081/actuator/health` | 8081 |
| Shipment Service | `http://localhost:8082/actuator/health` | 8082 |
| Payment Service | `http://localhost:8083/actuator/health` | 8083 |
| Delivery Service | `http://localhost:8084/actuator/health` | 8084 |
| Notification Service | `http://localhost:8085/actuator/health` | 8085 |
| Analytics Service | `http://localhost:8086/actuator/health` | 8086 |

**Available Actuator Endpoints:**
- `/actuator/health` - Health status
- `/actuator/info` - Application information
- `/actuator/metrics` - Application metrics

## 🧪 Testing the Services

### Example: User Service (PostgreSQL)

```bash
# Register a new user
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

## 🔧 Development Guide

### Migrating a Service from H2 to PostgreSQL

To migrate a service from H2 to PostgreSQL (following the User Service pattern):

1. **Update dependencies** in `pom.xml`:
   ```xml
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

2. **Update `application.yml`**:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/ash7nly_db?currentSchema=your_service_name
       username: admin
       password: password
       driver-class-name: org.postgresql.Driver
     jpa:
       database: postgresql
       database-platform: org.hibernate.dialect.PostgreSQLDialect
       hibernate:
         ddl-auto: update
       properties:
         hibernate:
           default_schema: your_service_name
   ```

3. **Verify schema** exists in `infra-swe/init.sql`

4. **Test the migration**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Docker Commands

```bash
# Start PostgreSQL
cd infra-swe
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# View logs
docker-compose logs -f

# Restart PostgreSQL (preserves data)
docker-compose restart

# Stop and remove data
docker-compose down -v
```

## 📁 Project Structure

```
ash7nly/
├── api-gateway/              # API Gateway service
├── user-service/            # User management (PostgreSQL) ✅
├── shipment-service/        # Shipment tracking (H2) 🚧
├── payment-service/         # Payment processing (H2) 🚧
├── delivery-service/        # Delivery management (H2) 🚧
├── notification-service/    # Notifications (H2) 🚧
├── analytics-service/       # Analytics & reporting (H2) 🚧
├── common/                  # Shared libraries and utilities
├── infra-swe/              # Infrastructure (Docker Compose, init scripts)
│   ├── docker-compose.yml  # PostgreSQL configuration
│   └── init.sql           # Database initialization script
├── pom.xml                 # Parent POM
└── README.md              # This file
```

## 🐛 Troubleshooting

### PostgreSQL Connection Issues

**Problem:** Service can't connect to PostgreSQL

**Solutions:**
```bash
# Check if PostgreSQL is running
docker ps | grep ash7nly-db

# Check PostgreSQL logs
docker logs ash7nly-db

# Restart PostgreSQL
cd infra-swe
docker-compose restart

# Verify connection
docker exec -it ash7nly-db psql -U admin -d ash7nly_db -c "\l"
```

### H2 Console Not Accessible

**Problem:** H2 console returns 404

**Solutions:**
1. Verify the service is running on the correct port
2. Check that `spring.h2.console.enabled=true` in application.yml
3. Access using the exact URL: `http://localhost:<port>/h2-console`

### Port Already in Use

**Problem:** `Address already in use` error

**Solutions:**
```bash
# Windows - Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Maven Build Failures

**Problem:** Build fails with dependency issues

**Solutions:**
```bash
# Clean Maven cache
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests

# Build specific module
mvn clean install -pl user-service -am
```

## 🎯 Roadmap

- [ ] Migrate Shipment Service to PostgreSQL
- [ ] Migrate Payment Service to PostgreSQL
- [ ] Migrate Delivery Service to PostgreSQL
- [ ] Migrate Notification Service to PostgreSQL
- [ ] Migrate Analytics Service to PostgreSQL
- [ ] Implement service discovery (Eureka)
- [ ] Add distributed tracing (Zipkin/Sleuth)
- [ ] Add centralized configuration (Spring Cloud Config)
- [ ] Implement circuit breakers (Resilience4j)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement event-driven architecture (Kafka/RabbitMQ)

## 📝 License

This project is private and proprietary.

## 👤 Contact

For questions or support, please contact the development team.

---

**Last Updated:** December 3, 2025

