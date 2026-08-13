# 🚀 TripNest: Travel Planning & Trip Management Platform

**TripNest** is a full-stack, enterprise-grade travel planning and trip management platform built with **React.js**, **Spring Boot 3**, **Spring Security (JWT)**, **MySQL / PostgreSQL**, **Chart.js**, **Google Maps API**, and **OpenWeather API**.

---

## 🌟 Key Features

- 🔒 **Authentication & Authorization**: JWT token-based authentication, Google OAuth2 login endpoint integration, Role-Based Access Control (`TRAVELER`, `ADMIN`), Forgot/Reset Password flow, and 1-Click Demo Login options.
- 🗺️ **Interactive Destination Explorer**: Searchable destination catalog with popular filters, OpenWeather live/dynamic forecast widget, Google Maps interactive embeds, and top neighborhood highlights.
- 📅 **Day-Wise Itinerary Planning**: Timeline view categorized into Sightseeing, Accommodation, Transportation, Dining, Adventure, and Shopping activities with drag/drop, toggle completion, and customizable notes.
- 💰 **Budgeting & Expense Tracker**: Category-wise budget breakdown, live expense logging, remaining balance calculation, utilization visualizer, and equal split shared expense settlement algorithm ("Person A paid $X, Person B owes $Y").
- 👥 **Group Collaboration**: Invite friends/co-travelers via email with role permissions (`OWNER`, `GROUP_ADMIN`, `MEMBER`, `VIEWER`), accept/reject invitation workflow, and tokenized trip sharing links.
- 📄 **Document Vault**: Upload travel vouchers, booking confirmations, tickets, and photos (up to 5MB file validation) with direct download and deletion capabilities.
- 🔔 **Notifications Engine**: Live unread notification counter badge in top navigation, invite alerts, and category expense warnings.
- 📊 **Analytics Dashboards**:
  - **Traveler Analytics**: Chart.js Doughnut expense category breakdowns, Bar chart trip status distributions, total spend visualizers, and travel statistics.
  - **Platform Admin Dashboard**: Live total user counts, active trip volume, platform spend metrics, user management table, and real-time activity stream log.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (Vite build system, ES Modules)
- **Styling**: Tailwind CSS v4, Custom CSS Design System (Glassmorphic cards, gradients, micro-animations)
- **State & Router**: Context API (`AuthContext`), React Router v7
- **Data Visualization**: Chart.js, `react-chartjs-2`
- **Icons**: Lucide React
- **HTTP Client**: Axios with Bearer token request interceptor

### Backend
- **Framework**: Java 17, Spring Boot 3.2.3
- **Security**: Spring Security, JJWT (`io.jsonwebtoken`) 0.11.5, BCrypt Password Encoder
- **Persistence**: Spring Data JPA, Hibernate ORM
- **Database**:
  - Development: MySQL (`application-dev.yml`) & H2 Memory DB
  - Production: PostgreSQL (`application-prod.yml`)
- **APIs**: OpenWeather API & Google Maps API with automatic fallback mock generators

### DevOps & Infrastructure
- **Containerization**: Docker, Docker Compose (`docker-compose.yml`)
- **CI/CD**: GitHub Actions (`.github/workflows/ci-cd.yml`)
- **API Testing**: Postman Collection (`postman/TripNest_API_Collection.json`)
- **Unit Testing**: JUnit 5, Mockito

---

## 🗄️ Database Architecture

```
+--------------------+           +--------------------+           +--------------------+
|       USERS        |           |       TRIPS        |           |    ITINERARIES     |
+--------------------+           +--------------------+           +--------------------+
| id (PK)            | 1       * | id (PK)            | 1       * | id (PK)            |
| name               |<----------| owner_id (FK)      |<----------| trip_id (FK)       |
| email (UQ)         |           | title              |           | day_number         |
| password           |           | destination        |           | title              |
| role               |           | start_date         |           +--------------------+
| phone              |           | end_date           |                     | 1
+--------------------+           | budget             |                     |
          ^                      +--------------------+                     v *
          |                               | 1                     +--------------------+
          |                               |                       |     ACTIVITIES     |
          | 1                             v 1                     +--------------------+
          |                      +--------------------+           | id (PK)            |
          |                      |      BUDGETS       |           | trip_id (FK)       |
          |                      +--------------------+           | itinerary_id (FK)  |
          |                      | id (PK)            |           | activity_type      |
          |                      | trip_id (FK, UQ)   |           | cost               |
          |                      | total_budget       |           +--------------------+
          |                      | total_expenses     |
          |                      +--------------------+
          |                               | 1
          |                               |
          | 1                             v *
+--------------------+           +--------------------+
|    TRIP_MEMBERS    |           |      EXPENSES      |
+--------------------+           +--------------------+
| id (PK)            |           | id (PK)            |
| trip_id (FK)       |           | trip_id (FK)       |
| user_id (FK)       |           | amount             |
| user_email         |           | category           |
| role               |           | paid_by            |
| status             |           +--------------------+
+--------------------+
```

---

## 🔑 Demo Login Credentials

For quick testing, use the pre-configured credentials seeded automatically on startup:

| Role | Email | Password |
| :--- | :--- | :--- |
| **System Admin** | `admin@tripnest.com` | `admin123` |
| **Traveler** | `traveler@tripnest.com` | `traveler123` |

Alternatively, use the **1-Click Demo Login** buttons on the Login page!

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Java 17 JDK** or higher
- **Node.js v18+** & **npm**
- **Maven** (bundled or installed)
- **Docker & Docker Compose** (optional for containerized deployment)

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Compile & execute unit tests
mvn clean test

# Run Spring Boot server locally (Defaults to port 8080 with H2/MySQL dev profile)
mvn spring-boot:run
```
The backend API server starts at `http://localhost:8080`.

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install node dependencies
npm install

# Start Vite development server
npm run dev
```
The frontend web application opens at `http://localhost:3000`.

---

## 🧪 Testing

### Backend Unit Tests (JUnit 5 & Mockito)
Run the automated test suite covering all 8 core service layers (`AuthService`, `UserService`, `TripService`, `ItineraryService`, `BudgetService`, `ExpenseService`, `TripMemberService`, `NotificationService`):
```bash
cd backend
mvn test
```
*Expected Output*: `Tests run: 10, Failures: 0, Errors: 0, Skipped: 0` -> `BUILD SUCCESS`.

### Postman API Testing
Import `postman/TripNest_API_Collection.json` into Postman to test authentication, trips, itineraries, expenses, documents, notifications, and admin endpoints.

---

## 🐳 Docker Containerization

Run the entire full-stack application (PostgreSQL DB + Spring Boot Backend + Nginx Frontend) with a single command:

```bash
# Start all containers in detached mode
docker-compose up -d --build
```

- **Frontend App**: `http://localhost`
- **Backend REST API**: `http://localhost:8080/api`
- **PostgreSQL Database**: `localhost:5432` (`db: tripnest`, `user: tripnest_user`)

To stop all services:
```bash
docker-compose down -v
```

---

## 🚀 Deployment Guide

### Deployment Options:
- **Frontend**: Deploy `frontend/` to **Vercel**, **Netlify**, or **Render**.
  - Build command: `npm run build`
  - Output directory: `dist`
- **Backend**: Deploy `backend/` to **Render**, **Railway**, **AWS ECS/EC2**, or **Heroku**.
  - Environment variable setting: `SPRING_PROFILES_ACTIVE=prod`
  - Database URL: `jdbc:postgresql://<HOST>:<PORT>/<DB_NAME>`

---

## 📄 License
Licensed under the MIT License. Built for seamless travel planning!
