# TripNest - Floating Travel Planning & Expense Ledger 🌌✨

Welcome to **TripNest**, a travel planning platform that feels like floating through a digital heaven. The application features a weightless, premium dark-themed interface ("Anti-Gravity Heaven") designed with Tailwind CSS and React, backed by a robust and fully validated Spring Boot REST API.

---

## 🏗️ Architecture & Tech Stack

- **Backend**: Spring Boot 3.3.0 + Java 17/26 (REST Controllers, Spring Security, JWT, JPA Hibernates, Flyway migrations)
- **Database**: PostgreSQL (Production) / In-Memory H2 with PostgreSQL Compatibility Dialect (Local Dev)
- **Frontend**: React 18 + Vite + Tailwind CSS 3.4.4 + Framer Motion (Translucent glass panels, floating shadows, cubic-bezier hover glows)
- **Security**: Stateful authentication via JWT headers (`Bearer <Token>`) with automatic interceptors and 401 redirection.

---

## 🚀 Getting Started

### Prerequisites
- **Java SE Runtime Environment 17 or higher** (e.g. Java 17, 21, or 26)
- **Apache Maven 3.6+**
- **Node.js** (LTS version recommended)
- **PostgreSQL** (Optional, only for production deployment)

### Running Locally (Zero Database Configuration)

The development profile is configured to run an in-memory H2 database using PostgreSQL compatibility schemas. You can launch the system immediately without setting up databases:

#### 1. Start the Backend API Server
```bash
cd tripnest-backend
mvn clean package -DskipTests=true
mvn spring-boot:run
```
The server will boot up on [http://localhost:8080](http://localhost:8080). 
- To inspect H2 Database records: Open [http://localhost:8080/h2-console](http://localhost:8080/h2-console). 
  - JDBC URL: `jdbc:h2:mem:tripnestdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE`
  - Username: `sa`
  - Password: `password`

#### 2. Start the Frontend Server
```bash
cd tripnest-frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. The Vite server is configured to proxy all `/api` calls to the Spring Boot backend on `localhost:8080`.

---

## 💎 Design Tokens & Aesthetics

- **Void (Main Background)**: `#0D1117`
- **Surface (Floating Panels)**: `#1C2128` (with 80% opacity and backdrop blur)
- **Interactive State (Hover)**: `#262C33`
- **Primary CTA (Accent)**: `#6366F1` (Indigo glow)
- **Visual Highlight (Glow)**: `#A78BFA` (Purple glow)
- **Rounded Edges**: Standard `12px` (standard), Large `16px` (lg), Small `8px` (sm)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (200-300ms transitions)

---

## 🛰️ API Summary Table

### Auth Services
- `POST /api/auth/register` - Registers and logs in user (`{name, email, password}`)
- `POST /api/auth/login` - Authenticates credentials (`{email, password}`)
- `POST /api/auth/refresh` - Renews authorization tokens (`{token}`)
- `GET /api/auth/me` - Retrives current session user profile
- `POST /api/auth/logout` - Terminates session client-side

### Trip Services
- `POST /api/trips` - Creates a new trip (`{destination, startDate, endDate, budget, description, imageUrl}`)
- `GET /api/trips` - Lists all trips where the user is a member/collaborator
- `GET /api/trips/{id}` - Details of a single trip
- `PATCH /api/trips/{id}` - Modifies trip properties
- `DELETE /api/trips/{id}` - Deletes a trip (Creator/Owner only)
- `POST /api/trips/{id}/members` - Invites traveler collaborators (`{email}`)

### Itinerary Services
- `GET /api/trips/{tripId}/itineraries` - Seeds and lists day-by-day itineraries
- `POST /api/trips/{tripId}/itineraries/{day}/activities` - Adds an activity (`{name, category, startTime, location, notes, cost}`)
- `PATCH /api/activities/{id}` - Updates activity details
- `DELETE /api/activities/{id}` - Removes activity

### Expense & Split Ledger
- `POST /api/trips/{tripId}/expenses` - Logs an expense and splits equally (`{amount, category, description, date, splitUserIds}`)
- `GET /api/trips/{tripId}/expenses` - Logs list of transactions
- `DELETE /api/expenses/{id}` - Removes ledger expense
- `GET /api/trips/{tripId}/settlement` - Computes greedy debt transfer division ("who owes whom")

### Budget Tracker
- `GET /api/trips/{tripId}/budget` - Spent totals, remaining totals, and category breakdown
- `PATCH /api/trips/{tripId}/budget` - Updates allocated budget limit (`{allocated}`)

---

## 🧪 Production Deployment

To connect the system to a production PostgreSQL database, set active profile to `prod` and supply environment variables:

### Environment Variables
- `DATABASE_URL`: JDBC PostgreSQL string (`jdbc:postgresql://<host>:<port>/<db_name>`)
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password
- `JWT_SECRET`: HS256 Signing key (Minimum 256 bits)
- `JWT_EXPIRATION`: Token expiration time in milliseconds (e.g. `86400000` for 24 hours)

To run the package:
```bash
java -jar target/tripnest-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```
