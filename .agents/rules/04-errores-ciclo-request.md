# Regla: Manejo de errores y ciclo de vida de requests

## Alcance
Llamadas HTTP desde componentes o hooks del frontend.

## Razón
Errores genéricos y requests sin cancelación reducen observabilidad y pueden producir estados inconsistentes.

## Criterios de cumplimiento

- Registrar o conservar causa técnica (status, mensaje original o código de error).
- Mostrar mensaje de usuario claro y estable.
- Cancelar request o ignorar respuesta tardía al desmontar.

## Validación en este repositorio

- Evidencia actual: catch en App.tsx descarta el error original y solo muestra mensaje fijo.
- Evidencia actual: no hay cancelación de fetch dentro de useEffect.
- Tarea guiada por la regla: usar AbortController y normalización de errores.

## Refinamiento aplicado

- Regla distingue entre mensaje para usuario y detalle técnico, evitando ambigüedad de "mejorar errores".
