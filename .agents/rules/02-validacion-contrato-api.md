# Regla: Validación de contrato API en runtime

## Alcance
Todas las entradas de datos remotos en frontend.

## Razón
TypeScript no valida payloads de red en runtime. Si backend cambia forma o tipos, la UI puede romperse sin avisos claros.

## Criterios de cumplimiento

- Antes de usar datos remotos, validar estructura mínima esperada.
- Manejar payload inválido como error funcional con mensaje controlado.
- No pasar datos sin validar a cómputos de KPIs o gráficos.

## Validación en este repositorio

- Evidencia actual: fetchFinancialData retorna response.json() directo y luego computeKPIs/computeMonthlyData consumen el resultado.
- Tarea guiada por la regla: introducir parser/guard para FinancialMovement[] antes de setState.
- Resultado esperado: fallos de contrato se detectan temprano y se reportan con contexto.

## Refinamiento aplicado

- Regla acotada a validación de borde de red, sin imponer librería específica.
