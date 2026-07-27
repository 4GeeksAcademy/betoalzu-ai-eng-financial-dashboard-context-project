# Tech Stack

## Frontend
- Lenguaje y framework:
  - TypeScript 6
  - React 19
- Build y desarrollo:
  - Vite 8
  - `@vitejs/plugin-react`
- Estilos y UI:
  - Tailwind CSS v4
  - `@tailwindcss/vite`
  - `class-variance-authority`, `clsx`, `tailwind-merge`
- Visualizacion:
  - Recharts
  - Lucide React (iconografia)
- Data fetching y cache:
  - SWR
- Calidad y testing:
  - ESLint 9 + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`
  - Vitest 4 + `@vitest/coverage-v8`

Evidencia:
- `frontend/package.json`
- `frontend/vite.config.ts`
- `frontend/eslint.config.js`
- `frontend/src/lib/use-financial-dashboard-data.ts`

## Backend
- Lenguaje y runtime:
  - Python 3.13
- Framework API:
  - FastAPI
  - Uvicorn (`uvicorn[standard]`)
- Modelado y validacion:
  - Pydantic (via modelos `BaseModel`)
- Debug y pruebas:
  - Debugpy
  - Pytest + pytest-cov
  - HTTPX (dependencia de testing/cliente)

Evidencia:
- `backend/requirements.txt`
- `backend/app/main.py`
- `backend/app/routes.py`
- `backend/tests/test_routes.py`
- `backend/Dockerfile`

## Infraestructura y Tooling
- Contenedores:
  - Docker
  - Docker Compose
- Servicios definidos:
  - `frontend` expuesto en `5173`
  - `backend` expuesto en `8000`
  - Puerto de debug backend `5678`
- Desarrollo local sin variables extra:
  - Proxy de Vite para `/api` hacia `http://backend:8000`

Evidencia:
- `docker-compose.yml`
- `frontend/vite.config.ts`
- `README.md`
- `README.es.md`
- `frontend/Dockerfile`
- `backend/Dockerfile`

## Skills de agente disponibles en el repo
- `accessibility`:
  - Auditoria y mejoras WCAG 2.2 para frontend.
- `vercel-react-best-practices`:
  - Reglas de performance y patrones React/Next.
- `seo-audit`:
  - Diagnostico tecnico SEO y priorizacion de hallazgos.
- `frontend-testing-api-contract` (local):
  - Prevencion de regresiones async y validacion de contrato API frontend-backend.

Evidencia:
- `.agents/skills/accessibility/SKILL.md`
- `.agents/skills/vercel-react-best-practices/SKILL.md`
- `.agents/skills/seo-audit/SKILL.md`
- `.agents/skills/frontend-testing-api-contract/SKILL.md`
- `skills-lock.json`

## Dependencias clave por responsabilidad
- Presentacion y componentes:
  - `react`, `react-dom`, `lucide-react`
- Graficos y series temporales:
  - `recharts`
- Utilidades de clases/estilos:
  - `class-variance-authority`, `clsx`, `tailwind-merge`
- Plataforma de build y toolchain frontend:
  - `vite`, `typescript`, `@vitejs/plugin-react`, `@tailwindcss/vite`
- Orquestacion de datos en cliente:
  - `swr`
- Calidad frontend:
  - `eslint`, `typescript-eslint`, `vitest`
- API y runtime backend:
  - `fastapi`, `uvicorn[standard]`, `pydantic`
- DX backend:
  - `debugpy`, `pytest`, `pytest-cov`, `httpx`

Evidencia:
- `frontend/package.json`
- `backend/requirements.txt`
