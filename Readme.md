# Software Requirements Specification (SRS)

## Ash7nly - Delivery Management Application

---

**Document Version:** 1.0  
**Date:** December 15, 2025  
**Project Name:** Ash7nly Delivery Management System

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   - 1.4 [References](#14-references)
   - 1.5 [Overview](#15-overview)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)
3. [System Architecture](#3-system-architecture)
   - 3.1 [Architecture Overview](#31-architecture-overview)
   - 3.2 [Component Description](#32-component-description)
   - 3.3 [Database Design](#33-database-design)
4. [Specific Requirements](#4-specific-requirements)
   - 4.1 [Functional Requirements](#41-functional-requirements)
   - 4.2 [External Interface Requirements](#42-external-interface-requirements)
   - 4.3 [Non-Functional Requirements](#43-non-functional-requirements)
5. [Data Requirements](#5-data-requirements)
   - 5.1 [Data Entities](#51-data-entities)
   - 5.2 [Enumerations](#52-enumerations)
6. [API Specification](#6-api-specification)
   - 6.1 [Authentication API](#61-authentication-api)
   - 6.2 [Shipment API](#62-shipment-api)
   - 6.3 [Delivery API](#63-delivery-api)
   - 6.4 [Driver API](#64-driver-api)
   - 6.5 [Payment API](#65-payment-api)
   - 6.6 [User API](#66-user-api)
7. [Security Requirements](#7-security-requirements)
8. [Appendices](#8-appendices)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a comprehensive description of the Ash7nly Delivery Management Application. It details the functional and non-functional requirements, system architecture, data models, and API specifications for the delivery management platform. This document serves as a reference for developers, testers, and stakeholders involved in the development and maintenance of the system.

### 1.2 Scope

The Ash7nly Delivery Management Application is a multi-module web-based platform designed to facilitate delivery operations between merchants and drivers. The system enables:

- Merchant registration and authentication
- Driver registration and profile management
- Shipment creation and management
- Delivery assignment and tracking
- Payment processing
- Real-time status notifications via email

The application consists of three main modules:
- **Backend Service**: Spring Boot monolith application handling business logic
- **API Gateway**: Spring Cloud Gateway for request routing
- **Frontend**: React-based user interface & Mobile App

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| API | Application Programming Interface |
| JWT | JSON Web Token |
| SRS | Software Requirements Specification |
| REST | Representational State Transfer |
| CRUD | Create, Read, Update, Delete |
| DTO | Data Transfer Object |
| JPA | Java Persistence API |
| CORS | Cross-Origin Resource Sharing |
| AOP | Aspect-Oriented Programming |

### 1.4 References

- Spring Boot 3.x Documentation
- Spring Cloud Gateway Documentation
- PostgreSQL 15 Documentation
- JWT (JSON Web Token) Specification RFC 7519

### 1.5 Overview

This document is organized into eight sections covering all aspects of the Ash7nly system requirements. Section 2 provides an overall description of the product. Section 3 details the system architecture. Section 4 specifies functional and non-functional requirements. Section 5 describes data requirements. Section 6 documents the API specification. Section 7 covers security requirements. Section 8 contains appendices with additional information.

---

## 2. Overall Description

### 2.1 Product Perspective

Ash7nly is a standalone delivery management platform that operates as a multi-module Spring Boot application. The system architecture follows a gateway pattern where:

```
                    ┌─────────────────────────────────────────────────────┐
                    │                    DOCKER COMPOSE                   │
                    │                                                     │
   HTTP :80         │  ┌─────────────┐      ┌─────────────┐               │
────────────────────┼─►│   Gateway   │─────►│  Frontend   │               │
                    │  │  (Port 80)  │      │   (Nginx)   │               │
                    │  └─────────────┘      └─────────────┘               │
                    │         │                                           │
                    │         │ /api/**                                   │
                    │         ▼                                           │
                    │  ┌─────────────┐      ┌─────────────┐               │
                    │  │   Backend   │─────►│  PostgreSQL │               │
                    │  │ (Port 8080) │      │ (Port 5432) │               │
                    │  └─────────────┘      └─────────────┘               │
                    │                                                     │
                    └─────────────────────────────────────────────────────┘
```

### 2.2 Product Functions

The main functions of the Ash7nly system include:

1. **User Authentication and Authorization**
   - Merchant registration and login
   - Driver registration and login
   - JWT-based token authentication
   - Role-based access control (ADMIN, MERCHANT, DRIVER)

2. **Shipment Management**
   - Create new shipments with package details
   - Track shipments using tracking numbers
   - View shipment history and status
   - Cancel shipments (when in cancellable state)
   - Automatic cost calculation based on delivery area

3. **Delivery Management**
   - View available deliveries for drivers
   - Accept delivery assignments
   - Update delivery status (PICKED_UP, IN_TRANSIT, DELIVERED)
   - Report failed deliveries
   - View delivery history

4. **Driver Management**
   - Driver profile management
   - Availability status toggle
   - Service area assignment
   - Vehicle information management

5. **Payment Processing**
   - Automatic payment record creation for shipments
   - Process payments with card details
   - Payment status tracking
   - Transaction ID generation

6. **Notification System**
   - Email notifications for shipment creation
   - Status update notifications
   - Templated HTML email support

### 2.3 User Classes and Characteristics

The system supports three user roles:

| User Role | Description | Permissions |
|-----------|-------------|-------------|
| **ADMIN** | System administrator | Full access to all resources, manage users, view all shipments and deliveries |
| **MERCHANT** | Business users who create shipments | Create shipments, manage own shipments, process payments, view tracking |
| **DRIVER** | Delivery personnel | Accept deliveries, update delivery status, manage availability, view assigned deliveries |

### 2.4 Operating Environment

**Server Environment:**
- Operating System: Linux (Docker containers) or Windows
- Java Runtime: JDK 17 or higher
- Database: PostgreSQL 15 (Production) / H2 (Development)
- Container Runtime: Docker with Docker Compose

**Client Environment:**
- Modern web browsers (Chrome, Firefox, Safari, Edge)
- HTTP/HTTPS protocol support

**Development Environment:**
- IDE: IntelliJ IDEA or VS Code
- Build Tool: Apache Maven
- Version Control: Git

### 2.5 Design and Implementation Constraints

1. **Technology Stack:**
   - Backend: Spring Boot 3.x with Java 17+
   - Gateway: Spring Cloud Gateway
   - Database: PostgreSQL 15 with JPA/Hibernate
   - Security: Spring Security with JWT
   - Email: Spring Mail with Thymeleaf templates

2. **Architecture Constraints:**
   - Stateless REST API design
   - Microservices-ready monolith structure
   - Docker containerization required for production

3. **Security Constraints:**
   - All passwords must be encrypted using BCrypt
   - JWT tokens expire after 3 days (259200000 ms)
   - Rate limiting on authentication endpoints

### 2.6 Assumptions and Dependencies

**Assumptions:**
- Users have stable internet connectivity
- Email service (SMTP) is available for notifications
- PostgreSQL database is accessible and properly configured

**Dependencies:**
- PostgreSQL 15 database server
- SMTP mail server for email notifications
- Docker and Docker Compose for containerized deployment

---

## 3. System Architecture

### 3.1 Architecture Overview

The Ash7nly application follows a multi-module architecture with the following structure:

```
ash7nly/
├── pom.xml                    # Parent POM (multi-module)
├── docker-compose.yml         # Docker orchestration
├── backend/                   # Spring Boot monolith
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/java/com/ash7nly/monolith/
│       ├── MonolithApplication.java
│       ├── config/            # Security & App configuration
│       ├── controller/        # REST API controllers
│       ├── dto/               # Data Transfer Objects
│       ├── entity/            # JPA entities
│       ├── enums/             # Enumerations
│       ├── exception/         # Exception handling
│       ├── mapper/            # Entity-DTO mappers
│       ├── repository/        # JPA repositories
│       ├── security/          # JWT & auth services
│       └── service/           # Business logic
├── gateway/                   # Spring Cloud Gateway
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/java/com/ash7nly/gateway/
│       └── GatewayApplication.java
└── frontend/                  # React application (placeholder)
    ├── pom.xml
    ├── Dockerfile
    └── nginx.conf
```

### 3.2 Component Description

#### 3.2.1 Backend Module

The backend module is a Spring Boot monolith containing:

| Layer | Components | Description |
|-------|------------|-------------|
| Controller | AuthController, ShipmentController, DeliveryController, DriverController, PaymentController, UserController, HealthController | REST API endpoints |
| Service | AuthService, ShipmentService, DeliveryService, DriverService, PaymentService, UserService, EmailService, NotificationService, PricingService | Business logic layer |
| Repository | UserRepository, ShipmentRepository, DeliveryRepository, DriverRepository, PaymentRepository, TrackingHistoryRepository | Data access layer |
| Security | JwtService, JwtAuthenticationFilter, CurrentUserService | Authentication and authorization |
| Configuration | SecurityConfig, CorsConfig, ApplicationConfig, H2ServerConfig | Application configuration |

#### 3.2.2 Gateway Module

The Spring Cloud Gateway provides:
- Single entry point for all requests
- Route management for backend API (/api/**)
- Route management for frontend (/*)
- Request/Response header modification
- Actuator endpoints for monitoring

#### 3.2.3 Frontend Module

The frontend module serves as a placeholder for the React application, currently configured with:
- Nginx web server
- Static file serving
- Proxy configuration

### 3.3 Database Design

The system uses PostgreSQL as the primary database with the following entity relationships:

```
┌──────────────┐       ┌───────────────┐       ┌──────────────┐
│    User      │       │   Shipment    │       │   Payment    │
├──────────────┤       ├───────────────┤       ├──────────────┤
│ id (PK)      │◄──────│ merchant_id   │       │ paymentId    │
│ email        │       │ shipmentId    │◄──────│ shipment_id  │
│ passwordHash │       │ trackingNumber│       │ amount       │
│ fullName     │       │ pickupAddress │       │ status       │
│ phoneNumber  │       │ deliveryAddr  │       │ transactionId│
│ role         │       │ customerName  │       │ cardLastFour │
│ isActive     │       │ customerPhone │       │ paidAt       │
└──────────────┘       │ customerEmail │       └──────────────┘
       │               │ packageWeight │
       │               │ packageDim    │
       │               │ packageDesc   │
       │               │ status        │
       │               │ cost          │
       │               │ isActive      │
       │               └───────────────┘
       │                      │
       │                      │
       ▼                      ▼
┌──────────────┐       ┌───────────────┐       ┌──────────────────┐
│   Driver     │       │   Delivery    │       │ TrackingHistory  │
├──────────────┤       ├───────────────┤       ├──────────────────┤
│ id (PK)      │◄──────│ driver_id     │       │ id (PK)          │
│ user_id (FK) │       │ id (PK)       │       │ shipment_id (FK) │
│ vehicleType  │       │ shipment_id   │───────│ shipmentStatus   │
│ vehicleNumber│       │ assignedAt    │       │ timestamp        │
│ licenseNumber│       │ acceptedAt    │       └──────────────────┘
│ serviceArea  │       │ deliveredAt   │
│ isAvailable  │       │ pickedUpAt    │
└──────────────┘       │ recipientName │
                       │ deliveryNotes │
                       └───────────────┘
```

---

## 4. Specific Requirements

### 4.1 Functional Requirements

#### 4.1.1 Authentication Module (FR-AUTH)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-AUTH-001 | Merchant Registration | System shall allow new merchants to register with email, password, and full name |
| FR-AUTH-002 | Driver Registration | System shall allow new drivers to register with personal info, vehicle details, and service area |
| FR-AUTH-003 | User Login | System shall authenticate users with email and password, returning a JWT token |
| FR-AUTH-004 | Token Validation | System shall validate JWT tokens for protected endpoints |
| FR-AUTH-005 | Rate Limiting | System shall limit registration to 5 requests per 60 seconds per IP |
| FR-AUTH-006 | Rate Limiting | System shall limit login to 10 requests per 60 seconds per IP |

#### 4.1.2 Shipment Module (FR-SHIP)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-SHIP-001 | Create Shipment | Merchants shall be able to create shipments with pickup address, delivery area, customer details, and package information |
| FR-SHIP-002 | View Shipments | Merchants shall be able to view all their shipments |
| FR-SHIP-003 | View Shipment Details | Merchants and Admins shall view individual shipment details |
| FR-SHIP-004 | Cancel Shipment | Merchants shall cancel shipments only when status is CREATED or ASSIGNED |
| FR-SHIP-005 | Track Shipment | Public users shall track shipments using tracking number |
| FR-SHIP-006 | Tracking History | System shall maintain a history of all status changes for each shipment |
| FR-SHIP-007 | Auto Cost Calculation | System shall calculate shipping cost based on delivery area |

#### 4.1.3 Delivery Module (FR-DEL)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-DEL-001 | View Available Deliveries | Drivers shall view deliveries available in their service area |
| FR-DEL-002 | Accept Delivery | Drivers shall accept available deliveries matching their service area |
| FR-DEL-003 | Update Delivery Status | Drivers shall update delivery status (PICKED_UP, IN_TRANSIT, DELIVERED) |
| FR-DEL-004 | Report Failed Delivery | Drivers shall report failed deliveries with reason |
| FR-DEL-005 | View Active Deliveries | Drivers shall view their current active deliveries |
| FR-DEL-006 | View Delivery History | Drivers shall view completed delivery history |
| FR-DEL-007 | View Assigned Deliveries | Admins shall view deliveries assigned to specific drivers |

#### 4.1.4 Driver Module (FR-DRV)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-DRV-001 | View All Drivers | Admins shall view all registered drivers |
| FR-DRV-002 | View Driver Details | Admins shall view individual driver details |
| FR-DRV-003 | Update Driver | Admins shall update driver information |
| FR-DRV-004 | View Own Profile | Drivers shall view their own profile |
| FR-DRV-005 | Update Own Profile | Drivers shall update their own profile |
| FR-DRV-006 | Toggle Availability | Drivers shall toggle their availability status |

#### 4.1.5 Payment Module (FR-PAY)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-PAY-001 | Auto Payment Creation | System shall automatically create a pending payment when shipment is created |
| FR-PAY-002 | View Payment | Merchants shall view payment details for their shipments |
| FR-PAY-003 | Process Payment | Merchants shall process payments using card details |
| FR-PAY-004 | Payment Activation | System shall activate shipment after successful payment |
| FR-PAY-005 | Transaction ID Generation | System shall generate unique transaction IDs for completed payments |

#### 4.1.6 User Module (FR-USR)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-USR-001 | View Own Profile | Users shall view their own profile information |
| FR-USR-002 | Update Own Profile | Users shall update their profile information |
| FR-USR-003 | Admin View User | Admins shall view any user's profile |
| FR-USR-004 | Admin Update User | Admins shall update any user's profile |

#### 4.1.7 Notification Module (FR-NOT)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-NOT-001 | Shipment Created Email | System shall send email notification when shipment is created |
| FR-NOT-002 | Status Update Email | System shall send email notification when shipment status changes |
| FR-NOT-003 | Template Support | System shall use HTML templates for email notifications |

### 4.2 External Interface Requirements

#### 4.2.1 User Interface Requirements

| ID | Requirement |
|----|-------------|
| UI-001 | Frontend shall be accessible via web browser on port 80 |
| UI-002 | Frontend shall communicate with backend through the gateway |
| UI-003 | Frontend shall support responsive design for various screen sizes |

#### 4.2.2 Hardware Interface Requirements

| ID | Requirement |
|----|-------------|
| HI-001 | System shall run on servers with minimum 2GB RAM |
| HI-002 | System shall support containerized deployment via Docker |

#### 4.2.3 Software Interface Requirements

| ID | Requirement |
|----|-------------|
| SI-001 | System shall interface with PostgreSQL 15 database |
| SI-002 | System shall interface with SMTP mail server for notifications |
| SI-003 | System shall support H2 in-memory database for development |

#### 4.2.4 Communication Interface Requirements

| ID | Requirement |
|----|-------------|
| CI-001 | All API communication shall use HTTP/HTTPS protocol |
| CI-002 | API shall follow RESTful design principles |
| CI-003 | All API responses shall be in JSON format |
| CI-004 | Authentication shall use Bearer token in Authorization header |

### 4.3 Non-Functional Requirements

#### 4.3.1 Performance Requirements

| ID | Requirement |
|----|-------------|
| NFR-PERF-001 | API response time shall be under 500ms for standard requests |
| NFR-PERF-002 | System shall handle concurrent requests efficiently using stateless design |
| NFR-PERF-003 | Database queries shall be optimized with proper indexing |

#### 4.3.2 Security Requirements

| ID | Requirement |
|----|-------------|
| NFR-SEC-001 | All passwords shall be encrypted using BCrypt |
| NFR-SEC-002 | Authentication shall use JWT with HS256 algorithm |
| NFR-SEC-003 | JWT tokens shall expire after 3 days (configurable) |
| NFR-SEC-004 | CORS shall be configured to allow authorized origins |
| NFR-SEC-005 | Rate limiting shall prevent brute force attacks |
| NFR-SEC-006 | Sensitive endpoints shall require authentication |

#### 4.3.3 Reliability Requirements

| ID | Requirement |
|----|-------------|
| NFR-REL-001 | System shall include health check endpoint for monitoring |
| NFR-REL-002 | Database connections shall be managed with connection pooling |
| NFR-REL-003 | Docker containers shall auto-restart unless stopped |

#### 4.3.4 Maintainability Requirements

| ID | Requirement |
|----|-------------|
| NFR-MNT-001 | Code shall follow layered architecture pattern |
| NFR-MNT-002 | DTOs shall separate API contracts from entities |
| NFR-MNT-003 | Mappers shall handle entity-DTO conversions |
| NFR-MNT-004 | Exceptions shall be handled globally |

---

## 5. Data Requirements

### 5.1 Data Entities

#### 5.1.1 User Entity

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Long | Primary Key, Auto-generated | Unique user identifier |
| email | String | Unique, Not Null | User email address |
| passwordHash | String | Not Null | BCrypt encrypted password |
| fullName | String | - | User's full name |
| phoneNumber | String | - | User's phone number |
| role | UserRole | Enum | User role (ADMIN, MERCHANT, DRIVER) |
| isActive | Boolean | Default: true | Account active status |
| createdAt | LocalDateTime | Auto-generated | Creation timestamp |
| updatedAt | LocalDateTime | Auto-updated | Last update timestamp |

#### 5.1.2 Shipment Entity

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| shipmentId | Long | Primary Key, Auto-generated | Unique shipment identifier |
| trackingNumber | String | Unique, Not Null | Public tracking number |
| pickupAddress | String | Not Null | Package pickup location |
| deliveryAddress | DeliveryArea | Enum | Delivery destination area |
| customerName | String | - | Recipient name |
| customerPhone | String | - | Recipient phone |
| customerEmail | String | Email format | Recipient email |
| packageWeight | String | - | Package weight (e.g., "10kg") |
| packageDimension | String | - | Package dimensions |
| packageDescription | String | Max 1000 chars | Package description |
| merchant | User | Foreign Key | Merchant who created shipment |
| status | ShipmentStatus | Enum | Current shipment status |
| cost | Double | Not Null | Total shipping cost |
| isActive | Boolean | Default: true | Shipment active status |
| cancellationReason | String | - | Reason if cancelled |
| createdAt | LocalDateTime | Auto-generated | Creation timestamp |
| updatedAt | LocalDateTime | Auto-updated | Last update timestamp |

#### 5.1.3 Delivery Entity

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Long | Primary Key, Auto-generated | Unique delivery identifier |
| driver | Driver | Foreign Key | Assigned driver |
| shipment | Shipment | Foreign Key | Associated shipment |
| assignedAt | LocalDateTime | - | When driver was assigned |
| acceptedAt | LocalDateTime | - | When driver accepted |
| pickedUpAt | LocalDateTime | - | When package was picked up |
| deliveredAt | LocalDateTime | - | When package was delivered |
| recipientName | String | - | Actual recipient name |
| deliveryNotes | String | - | Delivery notes or failure reason |
| createdAt | LocalDateTime | Auto-generated | Creation timestamp |
| updatedAt | LocalDateTime | Auto-updated | Last update timestamp |

#### 5.1.4 Driver Entity

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Long | Primary Key, Auto-generated | Unique driver identifier |
| user | User | Foreign Key | Associated user account |
| vehicleType | VehicleType | Enum | Type of vehicle |
| vehicleNumber | String | - | Vehicle registration number |
| licenseNumber | String | - | Driving license number |
| serviceArea | DeliveryArea | Enum | Assigned delivery area |
| isAvailable | Boolean | Default: true | Availability status |
| createdAt | LocalDateTime | Auto-generated | Creation timestamp |
| updatedAt | LocalDateTime | Auto-updated | Last update timestamp |

#### 5.1.5 Payment Entity

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| paymentId | Long | Primary Key, Auto-generated | Unique payment identifier |
| shipment | Shipment | Foreign Key, Unique | Associated shipment |
| amount | Double | Not Null | Payment amount |
| status | PaymentStatus | Enum, Not Null | Payment status |
| transactionId | String | - | Generated transaction ID |
| cardLastFourDigits | String | - | Last 4 digits of card |
| paidAt | LocalDateTime | - | Payment completion time |
| createdAt | LocalDateTime | Auto-generated | Creation timestamp |
| updatedAt | LocalDateTime | Auto-updated | Last update timestamp |

#### 5.1.6 TrackingHistory Entity

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Long | Primary Key, Auto-generated | Unique history identifier |
| shipment | Shipment | Foreign Key, Not Null | Associated shipment |
| shipmentStatus | ShipmentStatus | Enum | Status at this point |
| timestamp | LocalDateTime | Default: now() | When status changed |

### 5.2 Enumerations

#### 5.2.1 UserRole

| Value | Description |
|-------|-------------|
| ADMIN | System administrator |
| MERCHANT | Business user creating shipments |
| DRIVER | Delivery personnel |

#### 5.2.2 ShipmentStatus

| Value | Description |
|-------|-------------|
| CREATED | Shipment created, awaiting payment/assignment |
| ASSIGNED | Driver has been assigned |
| PICKED_UP | Package picked up from merchant |
| IN_TRANSIT | Package in transit to destination |
| DELIVERED | Package successfully delivered |
| FAILED | Delivery attempt failed |
| CANCELLED | Shipment cancelled |

#### 5.2.3 PaymentStatus

| Value | Description |
|-------|-------------|
| PENDING | Payment awaiting processing |
| COMPLETED | Payment successfully processed |
| FAILED | Payment processing failed |
| REFUNDED | Payment has been refunded |

#### 5.2.4 DeliveryArea

| Value | Cost (EGP) |
|-------|------------|
| HELWAN | 30.0 |
| FISAL | 40.0 |
| HARAM | 50.0 |
| MAADI | 60.0 |
| DOKKI | 70.0 |
| ZAMALEK | 80.0 |
| ROD_ELFARAG | 90.0 |
| NASR_CITY | 100.0 |
| IMBABA | 120.0 |

#### 5.2.5 VehicleType

| Value | Description |
|-------|-------------|
| BIKE | Motorcycle |
| CAR | Standard car |
| VAN | Delivery van |
| TRUCK | Large truck |

---



## 7. Security Requirements

### 7.1 Authentication

- JWT (JSON Web Token) based authentication
- Token generation using HS256 algorithm
- Token expiration: 259200000 ms (3 days)
- Token must be included in Authorization header as Bearer token

### 7.2 Authorization

Role-based access control with three roles:

| Role | Accessible Endpoints |
|------|---------------------|
| ADMIN | All endpoints |
| MERCHANT | /api/shipments/*, /api/payments/*, /api/users/me |
| DRIVER | /api/deliveries/*, /api/drivers/me, /api/users/me |

### 7.3 Public Endpoints

The following endpoints are accessible without authentication:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/register/driver`
- `GET /api/shipments/*/tracking`
- `GET /api/shipments/track/*`
- `GET /api/health`
- `GET /h2-console/**` (development only)

### 7.4 Password Security

- Passwords encrypted using BCrypt encoder
- Minimum password length: 6 characters
- Password hash stored in database (never plain text)

### 7.5 Rate Limiting

IP-based rate limiting using AOP:
- Registration endpoints: 5 requests per 60 seconds
- Login endpoint: 10 requests per 60 seconds

### 7.6 CORS Configuration

Cross-Origin Resource Sharing enabled for:
- Gateway service communication
- Frontend application access

---

## 8. Appendices

### 8.1 Email Templates

The system uses Thymeleaf HTML templates for email notifications:

1. **shipment-created.html** - Sent when a new shipment is created
   - Variables: trackingNumber, customerName, status, packageWeight, packageDimension, deliveryArea, cost

2. **update-status.html** - Sent when shipment status changes
   - Variables: trackingNumber, customerName, status, currentLocation, updatedAt, driverName

### 8.2 Configuration Properties

| Property | Default Value | Description |
|----------|---------------|-------------|
| server.port | 8080 | Backend server port |
| spring.datasource.url | jdbc:postgresql://localhost:5432/ash7nly_db | Database URL |
| application.security.jwt.secret-key | (configured) | JWT signing key |
| application.security.jwt.expiration | 259200000 | JWT expiration in ms |
| app.email.from | noreply@ash7nly.com | Email sender address |
| app.email.from-name | Ash7nly Delivery Service | Email sender name |

### 8.3 Docker Services

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| postgres | postgres:15-alpine | 5432 | PostgreSQL database |
| backend | custom build | 8080 (internal) | Spring Boot backend |
| gateway | custom build | 80 | Spring Cloud Gateway |
| frontend | custom build | 80 (internal) | Nginx serving frontend |
| mail | mailhog (dev) | 1025 | SMTP server for development |

### 8.4 API Response Format

All API responses follow a standard format:

**Success Response:**
```json
{
  "success": true,
  "message": "string (optional)",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

### 8.5 Pricing Formula

Shipping cost is calculated as:
```
Total Cost = Base Cost + Area Cost
```

Where Area Cost is determined by the DeliveryArea enum (see Section 5.2.4).

Maximum allowed package weight: 60 kg

---

**Document End**

---
