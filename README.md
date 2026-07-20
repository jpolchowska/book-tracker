# Book Tracker

A full-stack web application for managing a personal book collection — add, edit, search, filter and rate books, and track reading status (Want to Read / Reading / Finished).

## Tech Stack

### Frontend
- React 19 + Vite + TypeScript
- Tailwind CSS v4 + shadcn/ui
- React Router
- Zustand (UI state)
- React Hook Form + Zod (forms & validation)
- Lucide React (icons)

### Backend
- Java 21 + Spring Boot 4
- Maven
- Spring Web, Spring Data JPA, Spring Validation
- PostgreSQL + Flyway (migrations)
- Lombok

## Project Structure

```
book-tracker/
├── frontend/   # React + Vite + TypeScript client
└── backend/    # Spring Boot REST API
```

## Status

Work in progress, built incrementally.

- **Frontend** — feature-complete on mock, in-memory data: dashboard with live stats, book library (card and table views), book details, add/edit form with validation, search/filter/sort. Not yet connected to a real backend.
- **Backend** — Spring Boot project scaffolded (Maven, Java 21). Database and API endpoints not implemented yet.

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` using local mock data — no backend or database required yet.

### Backend

```bash
cd backend
./mvnw compile
```

The backend currently only compiles — it isn't runnable yet (no database is configured). Instructions for running the full stack will be added once the API is connected.
