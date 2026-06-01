# Validación de reglas contra el repositorio

Fecha: 2026-06-01
Objetivo: comprobar que cada regla puede guiar tareas reales en este proyecto.

## Matriz de validación

| Regla | Estado | Evidencia del repo | ¿Qué tarea concreta guía? |
|---|---|---|---|
| 01-separacion-capa-datos | Valida | App.tsx concentra fetch + estado + render | Extraer hook/servicio de datos financieros |
| 02-validacion-contrato-api | Valida | fetchFinancialData usa response.json() directo | Añadir parser/guard previo a computeKPIs |
| 03-typescript-estricto | Valida | tsconfig.app.json no tiene strict | Activar strict y resolver errores de nullabilidad |
| 04-errores-ciclo-request | Valida | catch sin causa técnica y sin cancelación | Implementar AbortController y normalización de errores |
| 05-reutilizacion-estados-ui | Valida | Charts repiten estados loading/empty | Crear wrapper reusable para estados de tarjeta |
| 06-minimos-testing | Valida | Solo hay test en financial-utils.test.ts | Agregar test de integración de App para success/error |
| 07-consistencia-copy-idioma-tema | Valida | Mezcla ES/EN y dark forzado en App | Unificar idioma y desacoplar decisión de tema |
| 08-documentacion-estructura-agentes | Valida | README esperaba .agents/rules y ahora existe | Mantener reglas versionadas por fase |

## Conclusión

- Ninguna regla quedó genérica: todas apuntan a un archivo o flujo existente del proyecto.
- Todas las reglas definen una acción técnica verificable.
- Las reglas se pueden usar tanto en implementación como en code review.
