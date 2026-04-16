# Technical Test - Frontend

Frontend application developed in React with TypeScript to manage students, subjects, and grades. It consumes a REST API.

## Technologies Used
- React 18
- TypeScript
- Vite
- Axios
- React Router DOM
- Docker & Docker Compose

## Prerequisites
- Docker and Docker Compose installed.

## Environment Variables

The project supports configuration through environment variables (you can create a `.env` file in the root of the project):

- `VITE_API_URL`: Base URL for the backend API (Default: `http://localhost:8080`)
- `PORT`: Port where the frontend will be exposed (Default: `3000`)

## Running Instructions

To start the frontend application using Docker, run the following command in the repository root:

```bash
docker-compose up --build -d
```

Once finished, the application will be available at [http://localhost:3000](http://localhost:3000).

To stop the container:
```bash
docker-compose down
```