# Regla: Documentación operativa alineada con estructura real

## Alcance
Raíz del repositorio y carpeta .agents.

## Razón
Si la documentación describe una estructura que no existe, se vuelve difícil ejecutar fases de trabajo de forma reproducible.

## Criterios de cumplimiento

- Si README declara .agents/rules, esa ruta debe existir y contener reglas vigentes.
- Cada regla debe tener nombre, alcance, razón y criterios verificables.
- Cambios en reglas deben versionarse en commits trazables.

## Validación en este repositorio

- Evidencia actual al inicio de fase: README pedía .agents/rules y no existía.
- Acción aplicada: se creó .agents/rules con reglas orientadas al frontend real del repo.
- Resultado esperado: agentes y contribuidores pueden ejecutar fases con guía concreta.

## Refinamiento aplicado

- Regla orientada a trazabilidad y ejecución del flujo de este repositorio, no a burocracia documental.
