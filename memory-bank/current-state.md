# Estado Actual

Actualizado con base en la rama `feature/agent-skills` (HEAD `111c92d`).

## Features implementadas (verificadas)

### Frontend
- Capa de datos separada del layout principal:
  - Hook de orquestacion: `useFinancialDashboardData`.
  - Servicio HTTP dedicado con errores tipificados: `FinancialApiError`.
- Validacion runtime del contrato API antes de computar KPIs y series:
  - Parser defensivo para movimientos financieros y enums.
- Endurecimiento de tipado:
  - TypeScript con `strict: true` habilitado.
- Carga de visualizaciones en diferido:
  - Graficos cargados con `React.lazy` + `Suspense`.
- Mejoras de accesibilidad aplicadas en dashboard:
  - `skip-link`, `aria-busy`, `aria-live`, roles semanticos y descripciones SR.
- Estados UI visibles:
  - Loading con skeletons en KPIs y graficos.
  - Empty state en graficos cuando no hay datos.
  - Mensaje de error de carga API con `role="alert"`.

Evidencia:
- `frontend/src/App.tsx`
- `frontend/src/lib/use-financial-dashboard-data.ts`
- `frontend/src/lib/financial-service.ts`
- `frontend/src/lib/financial-parser.ts`
- `frontend/tsconfig.app.json`
- `frontend/src/components/dashboard/income-outcome-chart.tsx`
- `frontend/src/components/dashboard/profit-percent-chart.tsx`

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

### Skills operativas incorporadas al repositorio
- `accessibility`
- `vercel-react-best-practices`
- `seo-audit`
- `frontend-testing-api-contract` (skill local del proyecto)

Evidencia:
- `.agents/skills/accessibility/SKILL.md`
- `.agents/skills/vercel-react-best-practices/SKILL.md`
- `.agents/skills/seo-audit/SKILL.md`
- `.agents/skills/frontend-testing-api-contract/SKILL.md`
- `skills-lock.json`

## Gaps conocidos (evidencia en repo)
- Cobertura frontend aun concentrada en unit tests de utilidades/parser; faltan pruebas de integracion de UI async (`loading/error/empty/success`).
- Duplicacion parcial de patrones `loading/empty` entre componentes de graficos.
- No hay implementacion explicita de `AbortController` en el flujo de fetch actual (se usa SWR para deduplicacion/revalidacion).
- SEO tecnico aun no aplicado en frontend (title/description/canonical/OG y datos estructurados).

Evidencia:
- `frontend/src/lib/financial-utils.test.ts`
- `frontend/src/lib/financial-parser.test.ts`
- `frontend/src/components/dashboard/income-outcome-chart.tsx`
- `frontend/src/components/dashboard/profit-percent-chart.tsx`
- `frontend/src/lib/use-financial-dashboard-data.ts`
- `frontend/index.html`
- `memory-bank/seo-audit.md`

## Siguientes prioridades (orden sugerido)
1. Elevar cobertura de pruebas frontend:
   - Agregar tests de integracion de `App` para `loading -> success/error/empty`.
   - Mantener tests de utilidades y ampliar casos de borde.
2. Consolidar estados UI reutilizables:
   - Extraer wrapper comun para `loading/empty/error` en tarjetas/graficos.
3. Fortalecer resiliencia del request lifecycle:
   - Evaluar cancelacion explicita (`AbortController`) si se cambia el fetcher o estrategia de cache.
4. Ejecutar plan SEO tecnico inicial:
   - Metadatos base y estructura semantica verificable para indexacion.

Base de esta priorizacion:
- Reglas operativas en `.agents/rules/VALIDACION.md`.
- Cambios aplicados en commits `bef369f`, `f6c83a1`, `d620775`, `111c92d`.
