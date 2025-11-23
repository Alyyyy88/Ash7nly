# Notification Service

This service handles all notification operations including email, SMS, and push notifications.

## Features
- Email notifications
- SMS notifications
- Push notifications
- Notification templates
- Notification history

## Endpoints
- `GET /api/notifications/health` - Health check
- Additional endpoints to be implemented

## Port
8085

## Database
H2 (development): jdbc:h2:mem:notificationdb
PostgreSQL (production): Configure in application.yml

