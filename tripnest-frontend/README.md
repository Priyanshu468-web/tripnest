# TripNest - Smart Travel Planning & Trip Management Platform

TripNest is a professional, high-fidelity travel management frontend built with React, Vite, and Tailwind CSS. It is configured to interact with a Spring Boot REST API backed by JWT Security and PostgreSQL.

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite (configured to compile on Port 3000)
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios (with custom Bearer Token interceptor)
- **Styling**: Tailwind CSS (fully responsive, supports Dark Mode selector)

---

## 📂 Project Structure

```
tripnest-frontend/
├── src/
│   ├── assets/           # Media files & static assets
│   ├── components/       # Custom components (Navbar, ProtectedRoute)
│   ├── hooks/            # Helper hooks
│   ├── layouts/          # Main wrappers (DashboardLayout)
│   ├── pages/            # Page templates:
│   │   ├── Home.jsx           # Landing page with interactive mocks
│   │   ├── Login.jsx          # Validation & JWT submission form
│   │   ├── Register.jsx       # Account registration form
│   │   ├── Dashboard.jsx      # Home dashboard & quick actions
│   │   ├── Trips.jsx          # Trip catalog & cards list
│   │   ├── CreateTrip.jsx     # Form to schedule new itineraries
│   │   ├── Itinerary.jsx      # Hourly schedule timeline logs
│   │   ├── Destinations.jsx   # Travel spots overview & rating maps
│   │   ├── Budget.jsx         # Allocations & category warnings
│   │   ├── Expenses.jsx       # Tabular spent logs & cost adder
│   │   ├── Documents.jsx      # Safe for booking ticket PDFs
│   │   ├── Profile.jsx        # Account preferences editor
│   │   └── NotFound.jsx       # Custom animated 404 error
│   ├── services/
│   │   └── api.js             # Configurations & Axios Interceptors
│   ├── utils/            # Shared formatting helpers
│   ├── App.jsx           # Global route definitions & toaster providers
│   ├── index.css         # Tailwind base imports & variables
│   └── main.jsx          # Application entrypoint
├── package.json          # Dependency logs
├── tailwind.config.js    # Custom style tokens
└── postcss.config.js     # PostCSS configurations
```

---

## 🔒 Authentication Flow & Security

- **JWT Storage**: Logins submit fields to `POST /api/auth/login`. On success, the JWT token is persisted to the client's `localStorage` and a redirect is executed.
- **Request Interceptor**: The Axios interceptor inside [src/services/api.js](src/services/api.js) automatically appends `Authorization: Bearer <token>` to all outbound request headers.
- **Auto-Logout on Expiry**: If any endpoint returns a `401 Unauthorized` response, the interceptor automatically clears the saved credentials and triggers a redirect to the `/login` route.
- **Guarded Navigation**: Nested sub-pages under `/dashboard` are protected by a client wrapper. Attempts to bypass auth will automatically prompt a login redirect.

---

## 💡 Mock Presentation Mode

To ensure smooth presentation/demo sessions even if the Spring Boot API service is offline, the dashboard elements (Statistics, Destination ratings, logs) automatically load high-fidelity simulated travel cards and warning banners. 
*Note: Account login and registration validations remain active and continue targeting real backend APIs to avoid masking auth errors.*

---

## 🛠️ Quick Start

### Prerequisites
Make sure you have Node.js (version 18 or above) installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Development Server
```bash
npm run dev
```
The application will launch on your browser at `http://localhost:3000`.

### 3. Build Production Compilation
```bash
npm run build
```

---

## 🖥️ Screenshots Section

*Placeholders for system screenshots:*

- **Home Page**: (placeholder)
- **Login / Registration Forms**: (placeholder)
- **Interactive Travel Dashboard**: (placeholder)
- **Budget Tracking Indicators**: (placeholder)
