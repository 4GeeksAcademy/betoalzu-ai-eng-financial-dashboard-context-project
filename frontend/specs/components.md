# Desglose de componentes por funcionalidad

Este documento define el mapa de componentes del frontend por funcionalidad del dashboard financiero.
Incluye componentes existentes y componentes recomendados para completar las features expuestas por la API.

## 1) Shell del dashboard

Objetivo: estructurar la pagina, orquestar estados globales y componer secciones.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `App` | Contenedor | Layout principal, composicion de secciones, manejo de loading/error global | Existe |
| `DashboardHeader` | Presentacional | Titulo, subtitulo y periodo seleccionado | Existe |
| `DashboardContent` | Contenedor | Encapsular secciones de KPIs, graficos y tablas para simplificar `App` | Recomendado |

## 2) KPIs principales

Objetivo: mostrar resumen ejecutivo (ingresos, egresos, utilidad y margen).

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `KPIRow` | Presentacional compuesta | Distribuye cards KPI en grilla responsiva | Existe |
| `KPICard` | Presentacional | Render de etiqueta, valor, helper e icono por variante | Existe |
| `KPISection` | Contenedor | Recibe datos normalizados y decide loading/error/empty de la fila KPI | Recomendado |

## 3) Serie temporal de ingresos vs egresos

Objetivo: visualizar evolucion mensual de entradas y salidas.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `IncomeOutcomeChart` | Presentacional compuesta | Card + grafico de lineas + tooltip custom + empty state | Existe |
| `IncomeOutcomeTooltip` | Presentacional | Mostrar detalle de income/outcome por mes en hover | Existe (interno) |
| `ChartStateFrame` | Presentacional reusable | Unificar loading, error y empty para tarjetas de grafico | Recomendado |

## 4) Serie temporal de margen de utilidad

Objetivo: monitorear tendencia de rentabilidad mensual (%).

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `ProfitPercentChart` | Presentacional compuesta | Card + linea de margen + referencia en 0 + empty state | Existe |
| `ProfitPercentTooltip` | Presentacional | Tooltip dedicado para porcentaje de utilidad | Existe (interno) |
| `ChartStateFrame` | Presentacional reusable | Misma envoltura de estados para evitar duplicacion | Recomendado |

## 5) Filtros y facetas

Objetivo: controlar rango temporal y segmentacion de datos.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `FiltersBar` | Contenedor | Gestion central de filtros activos y callbacks `onChange` | Recomendado |
| `DateRangeFilter` | Presentacional controlado | Seleccion de `start_date` y `end_date` | Recomendado |
| `OperationTypeFilter` | Presentacional controlado | Selector de `income` o `outcome` | Recomendado |
| `BusinessTypeFilter` | Presentacional controlado | Selector de `B2B` o `B2C` | Recomendado |
| `CategoryFilter` | Presentacional controlado | Selector de categoria desde facetas | Recomendado |

Dependencia API: `GET /api/metrics/facets`.

## 6) Resumen por periodo (summary)

Objetivo: mostrar agregaciones por dia/semana/mes segun filtros.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `SummarySection` | Contenedor | Solicita, normaliza y entrega datos de resumen | Recomendado |
| `SummaryChart` | Presentacional | Visual de income/outcome/net por periodo | Recomendado |
| `GroupBySwitcher` | Presentacional controlado | Selector `day`, `week`, `month` | Recomendado |

Dependencia API: `GET /api/metrics/summary`.

## 7) Top categorias

Objetivo: destacar categorias con mayor impacto economico.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `TopCategoriesSection` | Contenedor | Gestiona query de top categorias segun filtros | Recomendado |
| `TopCategoriesList` | Presentacional | Lista/tabla ordenada con categoria y monto | Recomendado |
| `TopCategoriesItem` | Presentacional | Fila individual con ranking, etiqueta y valor | Recomendado |

Dependencia API: `GET /api/metrics/categories/top`.

## 8) Comparacion de periodos

Objetivo: comparar desempeno neto entre periodo actual y anterior.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `ComparisonSection` | Contenedor | Construye request con rango y consume respuesta comparativa | Recomendado |
| `ComparisonCard` | Presentacional | Muestra actual, anterior, delta absoluto y porcentual | Recomendado |
| `DeltaBadge` | Presentacional | Resaltar crecimiento/caida con estilo semantico | Recomendado |

Dependencia API: `GET /api/metrics/comparison`.

## 9) Alertas de variacion de egresos

Objetivo: detectar desviaciones sobre baseline historico.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `AlertsSection` | Contenedor | Consulta alertas por umbral y agrupacion | Recomendado |
| `AlertsList` | Presentacional | Listado de alertas activas por periodo | Recomendado |
| `AlertItem` | Presentacional | Fila de alerta con ratio de incremento y baseline | Recomendado |
| `ThresholdInput` | Presentacional controlado | Entrada de umbral para sensibilidad de alertas | Recomendado |

Dependencia API: `GET /api/metrics/alerts`.

## 10) Segmentacion B2B / B2C

Objetivo: analizar diferencias de comportamiento por tipo de negocio.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `BusinessSegmentTabs` | Presentacional controlado | Toggle/tab para `B2B` y `B2C` | Recomendado |
| `BusinessSegmentSection` | Contenedor | Orquesta carga de datos segmentados y sincroniza filtros | Recomendado |
| `SegmentKPIComparison` | Presentacional | Vista comparativa de KPIs entre segmentos | Recomendado |

Dependencia API: `GET /api/metrics/b2b` y `GET /api/metrics/b2c`.

## 11) Estados transversales de UI

Objetivo: estandarizar feedback visual en todo el dashboard.

### Componentes

| Componente | Tipo | Responsabilidad | Estado |
| --- | --- | --- | --- |
| `Skeleton` | Presentacional base | Placeholder de carga reutilizable | Existe |
| `SectionError` | Presentacional reusable | Mensaje de error por seccion con opcion de reintento | Recomendado |
| `SectionEmpty` | Presentacional reusable | Estado vacio con copy consistente | Recomendado |
| `RetryButton` | Presentacional | Disparar recarga en contenedores de datos | Recomendado |

## Convenciones de composicion recomendadas

- Separar componentes contenedores (datos/estado) de presentacionales (UI pura).
- Limitar `App` a composicion de alto nivel; mover fetch/transformacion a secciones o hooks.
- Compartir wrappers de estado (`loading`, `error`, `empty`) para reducir duplicacion.
- Mantener nombres de componentes orientados a feature (`<Feature>Section`, `<Feature>Card`, `<Feature>Chart`).