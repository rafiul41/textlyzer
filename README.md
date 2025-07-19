# Textlyzer - Monorepo Setup

## Overview

This project is a full-stack application with a React frontend and a Node.js/Express backend, using MongoDB, Redis, and Keycloak for authentication. All services are orchestrated using Docker Compose for easy local development and deployment.

## What does `docker-compose.yml` do?

The `docker-compose.yml` file defines and manages all the services required for the app:

- **mongo**: MongoDB database for storing app data.
- **postgres**: PostgreSQL database for Keycloak authentication service.
- **keycloak**: Identity and access management (IAM) service for authentication and authorization.
- **redis**: In-memory data store, used for caching, especially the user analysis.
- **backend**: Node.js/Express API server, connects to MongoDB, Redis, and Keycloak.
- **frontend**: React app, served via Nginx, proxies API requests to the backend.

All services are connected via a shared Docker network and have their ports mapped for local access.

## Prerequisites

- **Docker** must be installed and running on your machine. [Get Docker here](https://www.docker.com/get-started/)

## How to run the app locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/rafiul41/textlyzer
   cd textlyzer
   ```

2. **Start all services with Docker Compose:**
   ```sh
   docker compose up --build
   ```
   This command will build images (if needed) and start all services defined in `docker-compose.yml`.

3. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3001](http://localhost:3001)
   - Keycloak: [http://localhost:8080](http://localhost:8080)
   - MongoDB: localhost:27017
   - Redis: localhost:6379

4. **Stopping the app:**
   Press `Ctrl+C` in the terminal, then run:
   ```sh
   docker compose down
   ```

## Notes
- Make sure Docker Desktop (or Docker Engine) is running before starting the app.
- The first build may take a few minutes as images are downloaded and built.
- Data for MongoDB and PostgreSQL is persisted in Docker volumes.

---
