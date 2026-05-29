# Contexto del Proyecto

## Resumen
Este repositorio implementa un dashboard de métricas financieras con arquitectura full stack:
- Frontend en React + TypeScript para visualización de KPIs y gráficos.
- Backend en FastAPI que expone endpoints de métricas financieras (mock data) con filtros.
- Orquestación local con Docker Compose.

## Stack Tecnológico

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Recharts (gráficos)
- Vitest + ESLint

### Backend
- Python 3.13
- FastAPI
- Uvicorn
- Pydantic
- Debugpy (debug remoto)
- Pytest

### Infraestructura local
- Docker y Docker Compose
- Dos servicios: `frontend` (5173) y `backend` (8000, 5678)

## Estructura Básica

```text
.
├── docker-compose.yml
├── README.md
├── README.es.md
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/
│   │   ├── main.py
│   │   └── routes.py
│   └── tests/
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── components/dashboard/
        └── lib/
```

## Cómo se Ejecuta en Local

## Opción recomendada: Docker Compose
Desde la raíz del repositorio:

```bash
docker compose up --build
```

Servicios disponibles:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Swagger/OpenAPI: http://localhost:8000/docs

Notas:
- El frontend usa proxy en Vite para `/api` hacia `http://backend:8000` dentro de la red de Docker.
- Si necesitas apuntar a otro backend, puedes configurar `VITE_API_BASE_URL` en `frontend/.env` (según README).

## Opción sin Docker (manual)

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

## Endpoints relevantes del Backend
- `GET /health`: estado del servicio.
- `GET /api/metrics`: métricas financieras con filtros opcionales:
  - `start_date`
  - `end_date`
  - `category`
  - `operation_type`

## Calidad y pruebas

### Frontend
```bash
cd frontend
npm run lint
npm run test
npm run test:coverage
```

### Backend
```bash
cd backend
pytest
```
