# Regla: Mínimos de testing por feature frontend

## Alcance
Nuevas features o refactors en frontend.

## Razón
Con pruebas solo en utilidades, se escapan regresiones de render, estados de carga y manejo de errores.

## Criterios de cumplimiento

- Cada cambio de feature incluye pruebas unitarias de lógica de negocio si aplica.
- Cada feature con estado asíncrono incluye al menos una prueba de integración de UI.
- Deben cubrirse rutas de success y error al menos en el flujo principal.

## Validación en este repositorio

- Evidencia actual: existe financial-utils.test.ts pero no pruebas de App ni de componentes dashboard.
- Tarea guiada por la regla: agregar test de App para loading -> datos y loading -> error.
- Resultado esperado: menor riesgo de regresión en experiencia visible.

## Refinamiento aplicado

- Regla define mínimos pragmáticos, no porcentajes arbitrarios de cobertura.
