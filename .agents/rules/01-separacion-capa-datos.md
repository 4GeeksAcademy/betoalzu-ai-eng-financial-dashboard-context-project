# Regla: Separación de capa de datos y UI

## Alcance
Frontend, especialmente componentes en src/components y entrada en src/App.tsx.

## Razón
Cuando el componente de pantalla mezcla fetch, transformación, estado y render, se vuelve más difícil de testear, reusar y mantener.

## Criterios de cumplimiento

- Los fetch HTTP viven en servicios o hooks dedicados.
- Las transformaciones de dominio viven en src/lib o capa equivalente.
- Los componentes visuales reciben datos listos para render.

## Validación en este repositorio

- Evidencia actual: App.tsx concentra fetch + transformación + estado + render.
- Tarea guiada por la regla: extraer useFinancialMetrics o financial-service para desacoplar App.
- Resultado esperado: App orquesta layout y estados de pantalla, no detalles de red.

## Refinamiento aplicado

- Esta regla no exige arquitectura enterprise; solo separación mínima verificable por archivo y responsabilidad.
