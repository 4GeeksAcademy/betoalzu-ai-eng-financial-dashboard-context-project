import { useMemo } from "react";
import useSWR from "swr";

import { fetchFinancialMovements, FinancialApiError } from "./financial-service";
import {
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
} from "./financial-types";
import { computeKPIs, computeMonthlyData } from "./financial-utils";

interface FinancialDashboardData {
  metrics: KPIMetrics | null;
  monthlyData: MonthlyDataPoint[];
  periodLabel: string;
  loading: boolean;
  error: string | null;
}

const DASHBOARD_DATA_KEY = "financial-metrics";
const DEFAULT_PERIOD_LABEL = "Periodo sin datos";

function buildPeriodLabel(movements: FinancialMovement[]): string {
  if (movements.length === 0) {
    return DEFAULT_PERIOD_LABEL;
  }

  let minDate = new Date(movements[0].create_date);
  let maxDate = minDate;

  for (const movement of movements) {
    const date = new Date(movement.create_date);
    if (date < minDate) {
      minDate = date;
    }
    if (date > maxDate) {
      maxDate = date;
    }
  }

  const dateFormat = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    year: "numeric",
  });

  return `${dateFormat.format(minDate)} - ${dateFormat.format(maxDate)}`;
}

function toUserError(error: unknown): string {
  if (error instanceof FinancialApiError) {
    if (error.causeCode === "HTTP") {
      return "No se pudo cargar la informacion financiera. La API respondio con error.";
    }

    if (error.causeCode === "CONTRACT") {
      return "No se pudo cargar la informacion financiera. El formato de datos no es valido.";
    }

    return "No se pudo cargar la informacion financiera. Verifica tu conexion con el backend.";
  }

  return "No se pudo cargar la informacion financiera. Revisa la API de backend.";
}

export function useFinancialDashboardData(): FinancialDashboardData {
  const { data, error, isLoading } = useSWR(
    DASHBOARD_DATA_KEY,
    fetchFinancialMovements,
    {
      dedupingInterval: 30000,
      revalidateOnFocus: false,
    },
  );

  const metrics = useMemo(() => {
    if (!data) {
      return null;
    }
    return computeKPIs(data);
  }, [data]);

  const monthlyData = useMemo(() => {
    if (!data) {
      return [];
    }
    return computeMonthlyData(data);
  }, [data]);

  const periodLabel = useMemo(() => {
    if (!data) {
      return DEFAULT_PERIOD_LABEL;
    }
    return buildPeriodLabel(data);
  }, [data]);

  return {
    metrics,
    monthlyData,
    periodLabel,
    loading: isLoading,
    error: error ? toUserError(error) : null,
  };
}