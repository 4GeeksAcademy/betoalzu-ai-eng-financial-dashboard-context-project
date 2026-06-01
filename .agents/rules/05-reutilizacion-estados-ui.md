# Regla: Reutilizar estados UI de loading, empty y error

## Alcance
Componentes del dashboard y visualizaciones en src/components/dashboard.

## Razón
Duplicar el mismo patrón de estados en varios componentes eleva costo de mantenimiento y riesgo de inconsistencias visuales.

## Criterios de cumplimiento

- Estados loading/empty/error se implementan mediante wrapper o componente reusable cuando hay patrón repetido.
- Textos y estilos base de esos estados se centralizan.
- Componentes de gráfico se enfocan en lógica específica del gráfico.

## Validación en este repositorio

- Evidencia actual: IncomeOutcomeChart y ProfitPercentChart repiten estructura muy similar para loading y empty.
- Tarea guiada por la regla: extraer ChartPanelState o DashboardCardState.
- Resultado esperado: cambios de UX en estados comunes se aplican una sola vez.

## Refinamiento aplicado

- Regla aplica solo cuando existe repetición real; no obliga abstracción prematura.
