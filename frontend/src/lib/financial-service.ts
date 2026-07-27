import { parseFinancialMovements } from "./financial-parser";
import { type FinancialMovement } from "./financial-types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const METRICS_ENDPOINT = `${API_BASE_URL}/api/metrics`;

export class FinancialApiError extends Error {
  readonly causeCode: "HTTP" | "CONTRACT" | "NETWORK";

  constructor(
    message: string,
    causeCode: "HTTP" | "CONTRACT" | "NETWORK",
  ) {
    super(message);
    this.name = "FinancialApiError";
    this.causeCode = causeCode;
  }
}

export async function fetchFinancialMovements(): Promise<FinancialMovement[]> {
  let response: Response;

  try {
    response = await fetch(METRICS_ENDPOINT);
  } catch {
    throw new FinancialApiError(
      "No se pudo conectar con la API financiera.",
      "NETWORK",
    );
  }

  if (!response.ok) {
    throw new FinancialApiError(
      `La API financiera devolvio un estado no valido: ${response.status}`,
      "HTTP",
    );
  }

  const payload = (await response.json()) as unknown;

  try {
    return parseFinancialMovements(payload);
  } catch {
    throw new FinancialApiError(
      "La respuesta de la API financiera no cumple el contrato esperado.",
      "CONTRACT",
    );
  }
}