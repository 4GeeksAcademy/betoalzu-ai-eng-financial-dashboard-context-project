# Estado Actual

## Features implementadas (verificadas)

### Frontend
- Carga de datos financieros desde API y render de dashboard principal.
- Calculo de KPIs en cliente:
  - Ingresos totales
  - Egresos totales
  - Utilidad
  - Margen de utilidad
- Agregacion mensual para graficos.
- Visualizacion con 2 graficos:
  - Ingresos vs egresos (lineas)
  - Margen de utilidad (%)
- Estados UI visibles:
  - Loading con skeletons en KPIs y graficos.
  - Empty state en graficos cuando no hay datos.
  - Mensaje de error de carga de API.

Evidencia:
- `frontend/src/App.tsx`
- `frontend/src/components/dashboard/kpi-card.tsx`
- `frontend/src/components/dashboard/income-outcome-chart.tsx`
- `frontend/src/components/dashboard/profit-percent-chart.tsx`
- `frontend/src/lib/financial-utils.ts`
- `frontend/src/lib/financial-utils.test.ts`

### Backend
- Endpoint de salud:
  - `GET /health`
- Endpoints de metricas y analitica:
  - `GET /api/metrics`
  - `GET /api/metrics/facets`
  - `GET /api/metrics/summary`
  - `GET /api/metrics/categories/top`
  - `GET /api/metrics/comparison`
  - `GET /api/metrics/alerts`
  - `GET /api/metrics/b2b`
  - `GET /api/metrics/b2c`
- Filtros soportados (segun endpoint):
  - Rango de fechas
  - Categoria
  - Tipo de operacion
  - Tipo de negocio
- Datos mock deterministas (seed fija) y respuestas ordenadas cronologicamente.
- Suite de pruebas de rutas y comportamiento principal de endpoints.

Evidencia:
- `backend/app/routes.py`
- `backend/tests/test_routes.py`

## Gaps conocidos (evidencia en repo)
- Demasiada responsabilidad en `App.tsx` (fetch + transformacion + estado + render).
- Sin validacion runtime del payload API antes de computar KPIs/series.
- Manejo de error frontend sin detalle tecnico y sin cancelacion de request en `useEffect`.
- TypeScript sin modo `strict` habilitado en `tsconfig.app.json`.
- Mezcla de idioma en copy de UI (espanol e ingles).
- Tema oscuro forzado desde el contenedor principal.
- Periodo del header hardcodeado.
- Cobertura frontend centrada en utilidades, sin pruebas de integracion de App/flujo async.
- Duplicacion de patrones loading/empty en componentes de grafico.

Evidencia:
- `frontend/src/App.tsx`
- `frontend/src/components/dashboard/dashboard-header.tsx`
- `frontend/src/components/dashboard/income-outcome-chart.tsx`
- `frontend/src/components/dashboard/profit-percent-chart.tsx`
- `frontend/tsconfig.app.json`
- `frontend/src/lib/financial-utils.test.ts`
- `.agents/rules/VALIDACION.md`
- `FASE-2.md`

## Siguientes prioridades (orden sugerido)
1. Extraer capa de datos del frontend:
   - Crear servicio/hook para fetch + transformacion.
   - Dejar `App.tsx` como orquestador de layout y estados.
2. Fortalecer confiabilidad de datos:
   - Agregar parser/guard runtime para respuesta de API.
   - Estandarizar manejo de errores con detalle tecnico interno y mensaje de usuario estable.
   - Implementar cancelacion con `AbortController` en efectos de carga.
3. Endurecer tipado:
   - Activar `strict` en TypeScript y resolver hallazgos.
4. Mejorar consistencia UX/UI:
   - Unificar idioma de la interfaz.
   - Quitar forzado global de tema oscuro.
   - Derivar periodo del header desde datos/configuracion.
5. Elevar cobertura de pruebas:
   - Agregar pruebas de integracion para `App` cubriendo success/error/loading/empty.
   - Mantener tests de utilidades y ampliar casos de borde.
6. Reducir duplicacion visual:
   - Extraer wrapper reusable para estados loading/empty/error de tarjetas/graficos.

Base de esta priorizacion:
- Riesgo tecnico y mantenibilidad descritos en `FASE-2.md`.
- Reglas operativas validadas en `.agents/rules/VALIDACION.md`.
- Estructura y comportamiento actual del codigo frontend/backend.
