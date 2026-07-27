# Frontend Specs: 3 funcionalidades documentadas

Este documento aterriza 3 funcionalidades del dashboard con contrato API verificado contra `/docs` (OpenAPI de FastAPI).

Verificacion realizada consultando:
- `GET http://localhost:8000/openapi.json`
- Paths: `/api/metrics/facets`, `/api/metrics/categories/top`, `/api/metrics/alerts`

---

## 1) Filtros y facetas

### Endpoint consumido
- `GET /api/metrics/facets`

### Tipos TypeScript usados
- Request:
  - No hay query params.
  - No existe un tipo de request dedicado en `frontend/specs/param-types.ts` (equivalente practico: request vacio).
- Response:
  - `FacetsResponse` en `frontend/specs/api-types.ts`
  - Tipos asociados:
    - `OperationType = 'income' | 'outcome'`
    - `BusinessType = 'B2B' | 'B2C'`
    - `Category = 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'`

### Valores validos y restricciones de parametros
- Este endpoint no recibe parametros de query.
- Restricciones de respuesta (segun OpenAPI):
  - `operation_types`: array de enum `income | outcome`.
  - `business_types`: array de enum `B2B | B2C`.
  - `categories`: array de enum `suppliers | sales | operational | administrative | others`.
  - `min_date`, `max_date`: `string` con formato `date` (`YYYY-MM-DD`).
  - Campos requeridos: todos los anteriores.

### Edge cases (UI esperada)
1. API responde arrays vacios (`operation_types`, `business_types` o `categories` vacios).
   - La UI debe deshabilitar/selectores dependientes y mostrar copy claro: "No hay opciones disponibles para este rango".
2. API responde fechas invalidas o invertidas (`min_date > max_date`, o formato no parseable).
   - La UI debe mostrar estado de error funcional en la barra de filtros y evitar aplicar rango automatico.
3. Error de red/5xx al cargar facetas.
   - La UI debe mostrar mensaje de error por seccion y accion de reintento, sin bloquear todo el dashboard si hay datos cacheados.

---

## 2) Top categorias

### Endpoint consumido
- `GET /api/metrics/categories/top`

### Tipos TypeScript usados
- Request:
  - `TopCategoriesParams` en `frontend/specs/param-types.ts`
    - `operation_type: OperationType`
    - `limit: number`
    - `start_date?: DateString`
    - `end_date?: DateString`
  - Tipo auxiliar: `DateString = `${number}-${number}-${number}``
- Response:
  - `TopCategoriesResponse` en `frontend/specs/api-types.ts` (array de `CategoryEntry`)
  - `CategoryEntry`:
    - `category: Category`
    - `operation_type: OperationType`
    - `total_amount: number`

### Valores validos y restricciones de parametros
- `operation_type`:
  - Valores validos: `income | outcome`
  - Default en API: `outcome`
- `limit`:
  - Tipo: entero
  - Restricciones OpenAPI: `minimum = 1`, `maximum = 20`
  - Default en API: `5`
- `start_date`, `end_date`:
  - Formato: fecha `YYYY-MM-DD`
  - Opcionales
- `business_type`:
  - Valores validos: `B2B | B2C`
  - Opcional
  - Nota: existe en OpenAPI, pero no esta incluido en `TopCategoriesParams` actualmente (gap de tipado frontend).

### Edge cases (UI esperada)
1. `limit` fuera de rango (`0` o `>20`) enviado por UI.
   - El backend devuelve `422`; la UI debe mostrar validacion local antes de enviar o mensaje de error de formulario si llega el 422.
2. Rango de fechas sin datos (respuesta `[]`).
   - La UI debe mostrar estado empty explicito: "No hay categorias para los filtros seleccionados".
3. `operation_type=income` puede devolver pocas categorias.
   - La UI no debe romper layout si hay menos de `limit`; debe renderizar solo filas disponibles.

---

## 3) Alertas de variacion de egresos

### Endpoint consumido
- `GET /api/metrics/alerts`

### Tipos TypeScript usados
- Request:
  - `AlertsParams` en `frontend/specs/param-types.ts`
    - `threshold: number`
    - `start_date?: DateString`
    - `end_date?: DateString`
- Response:
  - `AlertsResponse` en `frontend/specs/api-types.ts` (array de `AlertEntry`)
  - `AlertEntry`:
    - `period: string`
    - `outcome_total: number`
    - `baseline_average: number`
    - `increase_ratio: number`

### Valores validos y restricciones de parametros
- `threshold`:
  - Tipo: number
  - Restriccion OpenAPI: `minimum = 0`
  - Default en API: `0.3`
- `group_by`:
  - Valores validos: `day | week | month`
  - Default en API: `month`
  - Nota: existe en OpenAPI, pero no esta incluido en `AlertsParams` actualmente (gap de tipado frontend).
- `start_date`, `end_date`:
  - Formato: fecha `YYYY-MM-DD`
  - Opcionales
- `business_type`:
  - Valores validos: `B2B | B2C`
  - Opcional
  - Nota: existe en OpenAPI, pero no esta incluido en `AlertsParams` actualmente (gap de tipado frontend).

### Edge cases (UI esperada)
1. `threshold < 0` enviado por UI.
   - El backend devuelve `422`; la UI debe prevenir el envio con validacion local (`min=0`) y mostrar feedback inmediato.
2. Respuesta vacia (`[]`) cuando no se supera el umbral.
   - La UI debe mostrar estado vacio semantico: "No se detectaron alertas para este umbral".
3. `increase_ratio` muy alto (picos atipicos).
   - La UI debe formatear porcentaje sin overflow visual y destacar criticidad (badge/tono de severidad) sin truncar informacion.

---

## Resumen de gaps de tipado detectados (OpenAPI vs TS actual)

1. `TopCategoriesParams` no modela `business_type`.
2. `AlertsParams` no modela `group_by` ni `business_type`.
3. No existe un tipo de request dedicado para facets (aunque sea sin parametros).

Estos gaps no invalidan el consumo actual, pero limitan la cobertura de filtros disponibles en `/docs` desde el tipado de frontend.
