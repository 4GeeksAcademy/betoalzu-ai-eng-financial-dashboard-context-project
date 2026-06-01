# Regla: TypeScript estricto en frontend

## Alcance
Configuración TypeScript y código en frontend/src.

## Razón
Sin strict, varios errores de nullabilidad y tipos débiles llegan tarde a runtime.

## Criterios de cumplimiento

- tsconfig.app.json debe tener strict activado.
- Nuevos módulos no deben usar any implícito.
- Tipos de dominio deben permanecer explícitos y reutilizables.

## Validación en este repositorio

- Evidencia actual: no existe bandera strict en tsconfig.app.json.
- Tarea guiada por la regla: activar strict y ajustar warnings reales de null/undefined.
- Resultado esperado: fallos detectados en build en vez de en ejecución.

## Refinamiento aplicado

- Regla enfocada en configuración y nuevos cambios; evita exigir refactor masivo inmediato.
