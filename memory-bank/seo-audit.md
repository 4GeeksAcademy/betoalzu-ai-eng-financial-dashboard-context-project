# SEO Audit en este proyecto

## Por que es util
- Detecta problemas tecnicos que afectan indexacion y descubrimiento del dashboard (meta tags, titulos, descripciones y estructura semantica).
- Ayuda a priorizar mejoras de performance web que impactan visibilidad organica, especialmente Core Web Vitals y peso de recursos.
- Permite revisar trazabilidad SEO de rutas y contenido para evitar paginas sin contexto o con señales inconsistentes.
- Ofrece una base objetiva para medir estado SEO antes y despues de cambios de frontend.

## Impacto esperado en el proyecto
- Mayor claridad para buscadores sobre el proposito del producto.
- Menor riesgo de perdida de trafico por errores tecnicos evitables.
- Mejor capacidad de iterar el frontend con criterios SEO verificables.

## Estado actual en el repositorio
- La skill `seo-audit` fue incorporada en la rama `feature/agent-skills`.
- El memory bank ya contiene una base conceptual SEO, pero todavia no hay implementacion tecnica visible en frontend para metadatos de indexacion.
- No se observan aun tags SEO enriquecidos (title/description/canonical/og/twitter) ni datos estructurados JSON-LD en la pagina principal.

Evidencia:
- `.agents/skills/seo-audit/SKILL.md`
- `skills-lock.json`
- `frontend/index.html`

## Cambios recientes relacionados
- Se adiciono skill externa desde `coreyhaines31/marketingskills` para estandarizar auditorias SEO.
- Se agregaron referencias de soporte para internacionalizacion SEO y deteccion de contenido IA.

Evidencia:
- `.agents/skills/seo-audit/references/international-seo.md`
- `.agents/skills/seo-audit/references/ai-writing-detection.md`

## Checklist SEO inicial recomendado para este dashboard
1. Definir `title` y `meta description` orientados al caso de uso del producto.
2. Agregar `canonical` y metadatos Open Graph/Twitter para compartir enlaces.
3. Verificar estructura semantica principal (`h1`, landmarks, jerarquia).
4. Evaluar Core Web Vitals de la home y peso de bundles iniciales.
5. Documentar baseline de auditoria (puntajes/lighthouse) en el memory bank.
