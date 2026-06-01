# Regla: Consistencia de copy, idioma y tema

## Alcance
Textos de UI, labels de gráficos y configuración de tema en frontend.

## Razón
Mezclar idiomas y forzar tema global impacta claridad, accesibilidad y percepción de calidad.

## Criterios de cumplimiento

- Definir un idioma principal por superficie y usarlo de forma consistente.
- Evitar hardcodes de copy repetido; centralizar textos en constantes por feature.
- No forzar dark/light de forma global sin decisión explícita de producto.

## Validación en este repositorio

- Evidencia actual: hay mezcla de español e inglés en App.tsx y componentes dashboard.
- Evidencia actual: clase dark fija en el contenedor principal.
- Tarea guiada por la regla: unificar idioma y controlar tema por configuración o preferencia de usuario.

## Refinamiento aplicado

- Regla no impone i18n completa, solo consistencia operativa en el estado actual del proyecto.
