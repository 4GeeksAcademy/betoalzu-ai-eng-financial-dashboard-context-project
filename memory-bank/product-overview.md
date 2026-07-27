# Product Overview

## Resumen
Este repositorio implementa un dashboard financiero full stack para visualizar indicadores de ingresos, egresos, utilidad y margen, con datos obtenidos desde una API en FastAPI y visualizados en React + TypeScript.

## Objetivo del producto (segun evidencia del repo)
- Mostrar una vista ejecutiva de rendimiento financiero con KPIs y graficos de tendencia.
- Permitir analisis por periodos y filtros en backend (fechas, categoria, tipo de operacion, tipo de negocio), aunque el frontend actual consume principalmente el endpoint base de metricas.
- Ejecutarse localmente con Docker Compose en un entorno reproducible para desarrollo.

## Alcance funcional actual
- Frontend principal con:
  - Header de dashboard.
  - Fila de 4 KPIs (ingresos, egresos, utilidad, margen).
  - 2 graficos de linea (ingresos vs egresos, margen de utilidad).
  - Estados de carga y mensaje de error de carga.
- Backend con endpoints para:
  - Salud del servicio.
  - Dataset base de metricas y filtros.
  - Facetas para filtros.
  - Resumen agregado por dia/semana/mes.
  - Top categorias.
  - Comparativa entre periodos.
  - Alertas por incremento de egresos.
  - Variantes por tipo de negocio B2B y B2C.

## Flujo de datos actual (alto nivel)
1. `App.tsx` delega carga y transformacion al hook `useFinancialDashboardData`.
2. El servicio `fetchFinancialMovements` llama a `/api/metrics` y normaliza errores de red/HTTP/contrato.
3. `parseFinancialMovements` valida el payload runtime antes de computar KPIs o series.
4. El hook calcula KPIs y agregacion mensual y expone estado `loading/error`.
5. La UI renderiza KPIs y graficos (lazy-loaded) con manejo de loading/empty/error.

## Evidencia verificable
- Definicion de producto y stack base:
  - `README.md`
  - `README.es.md`
  - `CONTEXT.md`
- Orquestacion local y puertos:
  - `docker-compose.yml`
- Flujo frontend (fetch, estado, render):
  - `frontend/src/App.tsx`
  - `frontend/src/lib/use-financial-dashboard-data.ts`
  - `frontend/src/lib/financial-service.ts`
  - `frontend/src/lib/financial-parser.ts`
- Componentes visuales del dashboard:
  - `frontend/src/components/dashboard/dashboard-header.tsx`
  - `frontend/src/components/dashboard/kpi-row.tsx`
  - `frontend/src/components/dashboard/income-outcome-chart.tsx`
  - `frontend/src/components/dashboard/profit-percent-chart.tsx`
- Tipos y transformaciones financieras en frontend:
  - `frontend/src/lib/financial-types.ts`
  - `frontend/src/lib/financial-utils.ts`
- Endpoints y modelos de backend:
  - `backend/app/main.py`
  - `backend/app/routes.py`
- Cobertura de comportamiento principal en tests backend:
  - `backend/tests/test_routes.py`
