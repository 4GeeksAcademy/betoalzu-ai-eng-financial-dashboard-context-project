## Buenas prácticas detectadas

### Arquitectura
- Separación básica entre UI y lógica de negocio: cálculos en utilidades y render en componentes.
- Componentización clara del dashboard (header, KPIs, gráficos).
- Uso de componentes base reutilizables (Card, Skeleton) para consistencia visual.

### Tipado y contratos
- Tipos de dominio explícitos para movimientos y métricas financieras.
- Estados y funciones async tipadas, reduciendo ambigüedad en datos.

### Testing y DX
- Pruebas unitarias útiles en lógica financiera (KPIs, agregación mensual y formateo).
- Base de calidad instalada: ESLint, Vitest, coverage, alias de imports y proxy en Vite.

## Malas prácticas o riesgos

### Arquitectura y mantenibilidad
- Demasiada responsabilidad concentrada en App (fetch + transformación + estado + render).
- Duplicación de patrones de loading/empty state entre componentes de gráficos.

### Resiliencia y errores
- Manejo de error genérico sin detalle técnico (baja observabilidad).
- Falta cancelación de request en efectos (riesgo de condiciones de carrera en escenarios reales).

### Tipado y contratos
- TypeScript no está en modo strict.
- Falta validación runtime del payload de API antes de usarlo en cómputos.

### Testing
- Cobertura limitada: faltan pruebas de integración UI (loading/error/empty/success).

### UX, consistencia e i18n
- Mezcla de idioma en textos de interfaz (español/inglés).
- Tema oscuro forzado desde la raíz sin preferencia del usuario.
- Período hardcodeado en el header.

### Documentación
- README define estructura de reglas de agentes, pero esa estructura aún no está materializada.

## Reglas propuestas (resumen)

1. Separar capa de datos: servicio/hook para fetch y transformación; componentes solo presentacionales.
2. Validar contratos de API en runtime antes de mapear al dominio UI.
3. Activar TypeScript strict y mantener flags defensivas de compilación.
4. Estandarizar manejo de errores: mensaje usuario + detalle técnico para diagnóstico.
5. Implementar cancelación de requests en efectos.
6. Reducir duplicación con wrappers reutilizables para loading/error/empty.
7. Exigir tests por feature: unitarios de lógica + al menos una integración de UI.
8. Unificar idioma y externalizar textos de interfaz.
9. Evitar hardcodes de período; derivarlo de datos/config.
10. No forzar tema global; respetar preferencia del usuario.
11. Mantener la documentación operativa alineada con la estructura real del repo.
