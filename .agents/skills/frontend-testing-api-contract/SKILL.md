---
name: frontend-testing-api-contract
description: Skill para prevenir regresiones en frontend asíncrono y detectar rupturas de contrato API. Úsala al crear/refactorizar flujos con fetch, hooks de datos, KPIs, gráficos, loading/error/empty states o integración frontend-backend.
license: MIT
metadata:
  author: project-local
  version: "1.0.0"
---

# Frontend Testing + API Contract

Guía práctica para validar comportamiento visible de UI y compatibilidad de datos con backend en este repositorio (React + TypeScript + Vitest + FastAPI).

## Cuándo aplicarla

Aplica esta skill si el cambio toca alguno de estos puntos:
- Carga de datos remotos en frontend (`fetch`, hooks, servicios).
- Transformaciones de negocio (KPIs, agregaciones mensuales, métricas).
- Estados de interfaz (`loading`, `error`, `empty`, `success`).
- Endpoints o payloads del backend consumidos por frontend.
- Refactors en `App.tsx` o módulos de capa de datos.

## Objetivo

Detectar regresiones antes de mergear, cubriendo:
- Flujo funcional principal (datos correctos se renderizan).
- Fallos esperados (error de red, payload inválido).
- Contrato mínimo API en runtime.

## Checklist mínimo por PR

1. Existe al menos 1 prueba de integración UI para el flujo asíncrono modificado.
2. Se prueba la ruta `success` y la ruta `error` del flujo principal.
3. Si hay transformación de datos, se prueban casos borde de esa lógica.
4. El payload remoto se valida antes de usarse en cómputos o gráficos.
5. El mensaje de usuario es estable y el detalle técnico no se pierde internamente.
6. Se evita estado inconsistente por respuestas tardías (`AbortController` o guard equivalente).

## Matriz mínima de pruebas

Para cada feature de datos, cubrir como mínimo:

- `loading -> success`
  - Muestra skeleton/loading.
  - Renderiza KPIs/gráficos al completar.
- `loading -> error`
  - Muestra mensaje de error de usuario.
  - No rompe render ni deja estado parcial.
- `loading -> empty`
  - Respuesta válida pero sin datos útiles.
  - Muestra empty state coherente.
- `payload inválido`
  - Falta campo clave o tipo incorrecto.
  - Se trata como error funcional controlado.

## Patrón recomendado (repo actual)

Archivos foco:
- `frontend/src/lib/financial-service.ts`
- `frontend/src/lib/financial-parser.ts`
- `frontend/src/lib/use-financial-dashboard-data.ts`
- `frontend/src/App.tsx`

Estrategia:
1. Validar payload en borde de red (parser/guard).
2. Normalizar error técnico (`status`, `message`, `code`) y separar copy para usuario.
3. Mantener transformación pura en utilidades testeables.
4. Probar UI por comportamiento visible, no por detalles internos.

## Plantillas rápidas

### 1) Prueba de contrato runtime (unit)

```ts
import { describe, expect, it } from "vitest";
import { parseFinancialMovements } from "./financial-parser";

describe("parseFinancialMovements", () => {
  it("acepta payload válido", () => {
    const input = [{
      date: "2026-01-01",
      business_type: "b2b",
      category: "ventas",
      type: "income",
      amount: 100,
      currency: "USD"
    }];

    const result = parseFinancialMovements(input);
    expect(result).toHaveLength(1);
  });

  it("rechaza payload inválido", () => {
    const input = [{ amount: "100" }];
    expect(() => parseFinancialMovements(input)).toThrow(/payload|contrato|invalid/i);
  });
});
```

### 2) Prueba de flujo async UI (integración)

Si falta infraestructura de testing de UI, instalar:
- `npm i -D @testing-library/react @testing-library/jest-dom jsdom`

Ejemplo base:

```ts
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

vi.mock("../lib/financial-service", () => ({
  fetchFinancialData: vi.fn()
}));

import { fetchFinancialData } from "../lib/financial-service";

describe("App async flow", () => {
  it("loading -> success", async () => {
    (fetchFinancialData as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      { date: "2026-01-01", business_type: "b2b", category: "ventas", type: "income", amount: 100, currency: "USD" }
    ]);

    render(<App />);
    expect(screen.getByText(/cargando|loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/ingresos/i)).toBeInTheDocument();
    });
  });

  it("loading -> error", async () => {
    (fetchFinancialData as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("boom"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});
```

## Comandos de validación

Desde `frontend/`:
- `npm run test`
- `npm run test:coverage`
- `npm run lint`

Desde `backend/` si cambió contrato/endpoint:
- `pytest -q`

## Criterios de salida

La tarea está lista cuando:
- El checklist mínimo por PR está cumplido.
- Las pruebas nuevas fallan si se rompe el comportamiento esperado.
- Los cambios quedan alineados con reglas del repo:
  - `02-validacion-contrato-api.md`
  - `04-errores-ciclo-request.md`
  - `06-minimos-testing.md`
